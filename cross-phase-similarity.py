#!/usr/bin/python3
#############################################################################
# Author: Priyank Jain
# Email: jain206@purdue.edu
# Description: Compare cross-phase similarity between two different
# participants in subsequent phases using MOSS
#############################################################################
import os
import config
import subprocess
import shutil
import pprint
from unidiff import PatchSet
from time import strftime
import sys
import shutil
import traceback
import requests
import bs4
import collections


def initializeMetricDictionaries():
	crossPhaseSimilarityDict = collections.OrderedDict()
	prevPhaseProjects = list()
	for filename in os.listdir():
		if os.path.isdir(filename) and not filename.startswith("."):
			if filename.endswith("-cp"):
				projectName = filename.split("-")[-2] + '-cp'
				crossPhaseSimilarityDict.setdefault(projectName,collections.OrderedDict())
			else:
				projectName = filename.split("-")[-1]
				prevPhaseProjects.append(projectName)
	for innerKey in prevPhaseProjects:
		for outerKey in crossPhaseSimilarityDict:
			crossPhaseSimilarityDict[outerKey][innerKey] = 0
	return crossPhaseSimilarityDict

def interpretMOSSResults(soup, similarityDict):
	table = soup.select('table')[0]
	for tr in table.select('tr'):
		count = 0
		firstProjectName = None
		secondProjectName = None
		firstProjectPercentage = None
		secondProjectPercentage = None
		linesMatched = None
		for td in tr.select('td'):
			txt = td.get_text().strip()
			if count==0:			
				bits = txt.split(" ")
				firstProjectName  = bits[0].replace("/","").split("-")[-1].strip()
				firstProjectPercentage = int(bits[1].replace("(","").replace("%","").replace(")","").strip())
			elif count==1:
				bits = txt.split(" ")
				secondProjectName = bits[0].replace("/","").split("-")[-1].strip()
				secondProjectPercentage = int(bits[1].replace("(","").replace("%","").replace(")","").strip())
			elif count==2:
				linesMatched = int(txt)
				print(firstProjectName, firstProjectPercentage, secondProjectName, secondProjectPercentage, linesMatched)
				if (not firstProjectName.endswith("-cp") and secondProjectName.endswith("-cp")) \
					or (not secondProjectName.endswith("-cp") and firstProjectName.endswith("-cp")):
					similarity_score = None
					if firstProjectPercentage == 0 or secondProjectPercentage == 0:
						similarity_score = 0
					else: 
						similarity_score = 2 * firstProjectPercentage * secondProjectPercentage / 100 / (firstProjectPercentage + secondProjectPercentage)
					if firstProjectName.endswith("-cp"):
						similarityDict[firstProjectName][secondProjectName] = similarity_score
					else:
						similarityDict[secondProjectName][firstProjectName] = similarity_score
			count = (count + 1) % 3

homedir = os.getcwd()
logFile = open('cross-phase-similarity-{0}.log'.format(strftime('%Y-%m-%d-%H-%M-%S')), 'w')
sys.stdout = logFile
print("Cmd arguments are ", sys.argv)
if not(len(sys.argv)>1 and sys.argv[1]=='skipMoss'):
	if os.path.exists("cross-phase"):
		shutil.rmtree("cross-phase")
	os.mkdir("cross-phase")
for phase in range(2, 5):
	os.chdir(os.path.join(homedir, "cross-phase"))
	curPhase = phase
	prevPhase = phase - 1
	prevCrossPhaseDirectory = None
	prevCrossPhaseDirectory = "phase-{1}-{0}".format(prevPhase-1, curPhase-1)
	currentCrossPhaseDirectory = "phase-{1}-{0}".format(prevPhase, curPhase)
	if not os.path.exists(currentCrossPhaseDirectory):
		os.mkdir(currentCrossPhaseDirectory)
	try:
		print("Calculating cross-phase similarity for phases {0} and {1}".format(prevPhase, curPhase))
		config.updatePhase(prevPhase)
		prevPhaseDirectory = os.path.join(homedir, config.PHASE_DIRECTORY)
		config.updatePhase(curPhase)
		curPhaseDirectory = os.path.join(homedir, config.PHASE_DIRECTORY)
		if not (len(sys.argv)>1 and sys.argv[1]=='skipMoss'):	
			for curPhaseProject in os.listdir(curPhaseDirectory):			
				if os.path.isdir(os.path.join(homedir, curPhaseDirectory, curPhaseProject)) and not curPhaseProject.startswith(r'.'):
					os.chdir(os.path.join(homedir, "cross-phase", currentCrossPhaseDirectory))
					try:
						print("Performing git diff for {0} across phase {1} and {2}".format(curPhaseProject, prevPhase, curPhase))
						subprocess.check_output("git diff --no-index -w --ignore-space-at-eol -b \"{0}\" \"{1}\" >> git_diff_{2}.txt".format( \
							os.path.join(prevPhaseDirectory, curPhaseProject), os.path.join(curPhaseDirectory, curPhaseProject), curPhaseProject), shell=True)
					except subprocess.CalledProcessError:
						pass

					print("Creating directory {0} in {1}".format(curPhaseProject, os.getcwd()))
					if not os.path.exists(curPhaseProject):
						os.mkdir(curPhaseProject)		
					with open("git_diff_{0}.txt".format(curPhaseProject), 'r', encoding='utf8', errors='ignore') as diff_file:
						os.chdir(os.path.join(homedir, "cross-phase", currentCrossPhaseDirectory, curPhaseProject))
						print("Inside project {0}".format(curPhaseProject))
						patch = PatchSet(diff_file)
						for changedFile in patch:
							print("Processing file {0}".format(changedFile.path))
							if changedFile.is_removed_file:
								continue						
							fileBaseName = os.path.basename(changedFile.path)
							bits = changedFile.path.split(curPhaseProject)
							baseDir = bits[-1].replace(fileBaseName, '')[1:]
							if baseDir and not os.path.exists(baseDir):
								os.makedirs(baseDir)
							writer = open(os.path.join(baseDir, fileBaseName), 'w')
							count = 0;
							flag = 1;
							for line in str(changedFile).splitlines():
								if(count < 3):
									count = count + 1
									continue
								if(line.startswith('@@ ')):
									continue
								if line[0] == '+':
									flag = 1
									line = line[1:]
								elif line[0] == '-':
									flag = 0
									line = line[1:]
								if flag==1:
									writer.write(line + '\n')
							writer.close()
					print("Completed processing {0} across phase {1} and {2}".format(curPhaseProject, prevPhase, curPhase))
			# Now you have code for {newPhase - oldPhase}
			# Use get MOSS script data by comparing this difference to the prevPhase code
			os.chdir(os.path.join(homedir, "cross-phase", currentCrossPhaseDirectory))
			# Add -cp to names of all existing directories
			for cpDirectory in os.listdir(os.getcwd()):
				if os.path.isdir(cpDirectory) and not cpDirectory.startswith('.'):
					os.rename(cpDirectory, cpDirectory+'-cp')
			# Get directories from previous phase to this directory
			# This is for MOSS calculations
			# For phase 1-2, get code from phase 1
			# For phase 2-3, 3-4 get code from previous cross-phase
			if curPhase==2:
				for prevPhaseProject in os.listdir(os.path.join(homedir, prevPhaseDirectory)):
					if os.path.isdir(os.path.join(homedir, prevPhaseDirectory, prevPhaseProject)) \
						and not prevPhaseProject.startswith('.'):
						src = os.path.join(homedir, prevPhaseDirectory, prevPhaseProject)
						dest = os.path.join(os.getcwd(), prevPhaseProject)
						print("Copying directory {0} to {1}".format(src, dest))
						shutil.copytree(src, dest, ignore = shutil.ignore_patterns('.*'))
			else:
				prevPhaseDirectoryComplete = os.path.join(homedir, "cross-phase", prevCrossPhaseDirectory)
				print(prevPhaseDirectoryComplete)
				for prevPhaseProject in os.listdir(prevPhaseDirectoryComplete):
					if os.path.isdir(os.path.join(prevPhaseDirectoryComplete, prevPhaseProject))\
						and not prevPhaseProject.startswith('.') and prevPhaseProject.endswith('-cp'):
						src = os.path.join(prevPhaseDirectoryComplete,	prevPhaseProject)
						dest = os.path.join(os.getcwd(), prevPhaseProject[:-3])
						print("Copying directory {0} to {1}".format(src, dest))
						shutil.copytree(src, dest, ignore = shutil.ignore_patterns('.*'))
			
			output = subprocess.check_output("perl ../../moss.pl -d */*.js */*.html", shell = True) 
			output = output.decode("utf-8")
			print(output)
			output = output.splitlines()
			sys.stdout.flush()
			result_url = output[-1]
			# Get the MOSS result HTML file
			res = requests.get(result_url)
			res.raise_for_status()
			result_file = open("moss-result-cross-phase-{0}-{1}.html".format(curPhase, prevPhase), "wb")
			for chunk in res.iter_content(100000):
				result_file.write(chunk)
			result_file.close()		
		os.chdir(os.path.join(homedir, "cross-phase", currentCrossPhaseDirectory))
		result_file = open("moss-result-cross-phase-{0}-{1}.html".format(curPhase, prevPhase), "r")
		soup = bs4.BeautifulSoup(result_file)
		
		#Initialize data structures to store different metrics for a phase
		similarityDict = initializeMetricDictionaries()

		#Interpret MOSS results and populate required data structures
		interpretMOSSResults(soup, similarityDict)
		pprint.pprint(similarityDict)
		
	except Exception:
		print("Exception occurred while processing phase {0}: {1}".format(phase, sys.exc_info()[0]))
		print("Stack trace: ")
		traceback.print_exc()
		input()