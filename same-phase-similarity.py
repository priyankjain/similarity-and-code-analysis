#!/usr/bin/python3
##############################################################
#Author: Priyank Jain
#Description: Move all js/html/htm files to the root folder
##############################################################
import os
import config	
import subprocess
import requests
import bs4
import pprint
import copy
import csv
import collections
import math
import shutil
import traceback
import datetime
import sys
from time import strftime

def updateProjectDict(projectDict, projectName, percentage, linesMatched):
	if projectName in projectDict:
		projectDict[projectName].append((percentage, linesMatched))
		#if projectDict[projectName][0] < percentage:
		#	projectDict[projectName][0] = percentage
		#	projectDict[projectName][1] = linesMatched
	else:
		projectDict[projectName] = list()
		projectDict[projectName].append((percentage, linesMatched))
	return

def cleanCurrentDirectory():
	for content in os.listdir(os.getcwd()):
    # Skip if not a directory or a directory starting with .
	    if os.path.isdir(content) and not content.startswith('.'):
	        # Empty dictionary incase it's required to update the references 
	        mapping = {}
	        for dirpath, dirnames, filenames in os.walk(content):
	            for filename in filenames:
	                # Skip if file are already in the project root folder
	                if dirpath == content and (filename.endswith(".html") or filename.endswith(".htm")\
	                	or filename.endswith(".js")):
	                    print("Skipping {0} since it is already in the project root folder".format(filename))
	                    continue
	                if filename.endswith(".html") or filename.endswith(".htm") \
	                or filename.endswith(".js"):
	                    # If js file containing angular, jquery or bootstrap, delete
	                    filename_lc = filename.lower()
	                    if filename_lc.endswith(".js") and ("jquery" in filename_lc or "bootstrap" in filename_lc \
	                    or "angular" in filename_lc or "map.js" in filename_lc or "tutorial.js" in filename_lc
	                    or "node_modules" in dirpath):
	                        print("Deleting {0} from {1}".format(filename, dirpath))
	                        os.remove(os.path.join(dirpath, filename))
	                        print("Deleted {0} from {1}".format(filename, dirpath))
	                        continue
	                    print("Moving {0} from {1} to {2}".format(filename, dirpath, content))
	                    if(os.path.exists(os.path.join(content, filename))):
	                    	dirPart = dirpath.split('\\')[-1].split('/')[-1].replace(os.pathsep,'-')
	                    	print(dirPart)
	                    	newFilename = dirPart.replace(' ','-').replace('_','-') + '-' + filename
	                    	os.rename(os.path.join(dirpath, filename), os.path.join(dirpath, newFilename))
	                    else:
	                    	newFilename = filename
	                    os.rename(os.path.join(dirpath, newFilename), os.path.join(content, newFilename))
	                    print("Moved {0} from {1} to {2}".format(newFilename, dirpath, content))
	return

def initializeMetricDictionaries():
	projectDict = collections.OrderedDict()
	similarityDict = collections.OrderedDict()
	for filename in os.listdir():
		if os.path.isdir(filename) and not filename.startswith("."):
			projectName = filename.split("-")[-1]
			updateProjectDict(projectDict, projectName, 0, 0)
			similarityDict.setdefault(projectName,collections.OrderedDict())
	similarityDictCopy = copy.copy(similarityDict)
	for outerkey in similarityDictCopy:
		for innerkey in similarityDict:
			similarityDict[outerkey][innerkey] = 0
		similarityDict[outerkey][outerkey] = 1		
	return projectDict, similarityDict

def interpretMOSSResults(soup, projectDict, similarityDict):
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
				updateProjectDict(projectDict, firstProjectName, firstProjectPercentage, linesMatched)
				updateProjectDict(projectDict, secondProjectName, secondProjectPercentage, linesMatched)
				similarity_score = None
				if firstProjectPercentage == 0 or secondProjectPercentage == 0:
					similarity_score = 0
				else: 
					similarity_score = 2 * firstProjectPercentage * secondProjectPercentage / 100 / (firstProjectPercentage + secondProjectPercentage)
				similarityDict[firstProjectName][secondProjectName] = similarity_score
				similarityDict[secondProjectName][firstProjectName] = similarity_score
			count = (count + 1) % 3

def dumpSimilarityMetric(similarityDict, fileName):
	similarity_matrix_file = open(fileName, 'w')
	csvwriter = csv.writer(similarity_matrix_file, delimiter=",", quotechar='"')
	count = 0
	for firstName, internalDict in similarityDict.items():
		if count == 0:
			csvwriter.writerow([""] + list(internalDict.keys()))
		csvwriter.writerow([firstName] + [round(x, 3) for x in list(internalDict.values())])
		count = 1
	similarity_matrix_file.close()

def dumpNumberOfLines(projectDict, fileName):
	number_of_lines_file = open(fileName, 'w')
	csvwriter = csv.writer(number_of_lines_file, delimiter=',', quotechar='"')
	csvwriter.writerow(["Project Name", "Approximate number of lines of code"])
	for projectName, stats in projectDict.items():	
		stats = [(0.5 if (x==0 and y!=0) else x, y) for x, y in stats]
		numOfLines = [math.ceil(y*100/x) if x!=0 else 0 for x, y in stats]
		avgNumOfLines = sum(numOfLines)/len(numOfLines) if len(numOfLines)!=0 else 0
		csvwriter.writerow([projectName, avgNumOfLines])	
	number_of_lines_file.close()

logFile = open('same-phase-similarity-{0}.log'.format(strftime('%Y-%m-%d-%H-%M-%S')), 'w')
sys.stdout = logFile
homedir = os.getcwd()
for phase in range(1, 5):
	try:
		os.chdir(homedir)
		print("Processing phase {0}".format(phase))
		config.updatePhase(phase)
		print(config.URL)
		
		if os.path.exists(config.PHASE_DIRECTORY):
			print("Removing directory {0}".format(config.PHASE_DIRECTORY))
			shutil.rmtree(config.PHASE_DIRECTORY)
			print("Removed directory {0}".format(config.PHASE_DIRECTORY))
		#Download all projects of current phase to local workstation
		subprocess.call(["git", "clone", config.URL])
		
		#Change current directory to the directory of the current phase
		os.chdir(config.PHASE_DIRECTORY)
		
		#Cleanup and change directory structure as pre-processing for MOSS
		cleanCurrentDirectory()
		output = subprocess.check_output("perl ../moss.pl -d */*.js */*.html", shell = True) 
		output = output.decode("utf-8")
		print(output)
		output = output.splitlines()
		sys.stdout.flush()
		result_url = output[-1]

		# Get the MOSS result HTML file
		res = requests.get(result_url)
		res.raise_for_status()
		result_file = open("moss-result-phase-{0}.html".format(config.PHASE), "wb")
		for chunk in res.iter_content(100000):
			result_file.write(chunk)
		result_file.close()
		
		result_file = open("moss-result-phase-{0}.html".format(config.PHASE), "r")
		soup = bs4.BeautifulSoup(result_file)

		#Initialize data structures to store different metrics for a phase
		projectDict, similarityDict = initializeMetricDictionaries()

		#Interpret MOSS results and populate required data structures
		interpretMOSSResults(soup, projectDict, similarityDict)

		#Dump similarity metric results to CSV
		dumpSimilarityMetric(similarityDict, 'similarity-metric-phase-{0}.csv'.format(config.PHASE))
		
		#Dump number of lines to CSV
		dumpNumberOfLines(projectDict, 'number-of-lines-{0}.csv'.format(config.PHASE))

		#Go back to the original directory so that next few iterations work fine	
		os.chdir("..")
		print("Completed processing phase {0}".format(phase))
	except:
		print("Exception occurred while processing phase {0}: {1}".format(phase, sys.exc_info()[0]))
		print("Stack trace: ")
		traceback.print_exc()