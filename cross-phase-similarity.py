#!/usr/bin/python3
#############################################################################
# Author: Priyank Jain
# Email: jain206@purdue.edu
# Description: Compare cross-phase similarity between two different
# participants in subsequent phases
#############################################################################
import os
import config
import subprocess
import shutil
import git
from unidiff import PatchSet
from time import strftime
import sys
import shutil
import traceback
homedir = os.getcwd()
'''
for content in os.listdir(homedir):
	if os.path.isdir(content) and not content.startswith('.'):
		if(os.path.exists(os.path.join(homedir, content, ".git"))):
			shutil.rmtree(os.path.join(homedir, content, ".git"))
		if(os.path.exists(os.path.join(homedir, content, ".gitignore"))):
			shutil.rmtree(os.path.join(homedir, content, ".gitignore"))
'''
#logFile = open('cross-phase-similarity-{0}.log'.format(strftime('%Y-%m-%d-%H-%M-%S')), 'w')
#sys.stdout = logFile
if os.path.exists("cross-phase"):
	shutil.rmtree("cross-phase")
os.mkdir("cross-phase")
for phase in range(2, 5):
	os.chdir(os.path.join(homedir, "cross-phase"))
	curPhase = phase
	prevPhase = phase - 1
	currentCrossPhaseDirectory = "phase-{1}-{0}".format(prevPhase, curPhase)
	if not os.path.exists(currentCrossPhaseDirectory):
		os.mkdir(currentCrossPhaseDirectory)
	try:
		print("Calculating cross-phase similarity for phases {0} and {1}".format(prevPhase, curPhase))
		config.updatePhase(prevPhase)
		prevPhaseDirectory = os.path.join(homedir, config.PHASE_DIRECTORY)
		config.updatePhase(curPhase)
		curPhaseDirectory = os.path.join(homedir, config.PHASE_DIRECTORY)	
		for curPhaseProject in os.listdir(curPhaseDirectory):
			if os.path.isdir(os.path.join(homedir, curPhaseDirectory, curPhaseProject)) and not curPhaseProject.startswith(r'.'):
				print("I am in")
				os.chdir(os.path.join(homedir, "cross-phase", currentCrossPhaseDirectory))
				try:
					print(subprocess.check_output("git diff --no-index -w --ignore-space-at-eol -b \"{0}\" \"{1}\" >> git_diff_{2}.txt".format( \
						os.path.join(curPhaseDirectory, curPhaseProject), os.path.join(prevPhaseDirectory, curPhaseProject), curPhaseProject), shell=True))
				except subprocess.CalledProcessError:
					pass
				if not os.path.exists(curPhaseProject):
					os.mkdir(curPhaseProject)		
				with open("git_diff_{0}.txt".format(curPhaseProject), 'r', encoding='utf8') as diff_file:
					patch = PatchSet(diff_file)
					for changedFile in patch:
						if changedFile.is_removed_file:
							continue
						print(changedFile.path.split(curPhaseProject))
						'''
						writer = open(changedFile.path, 'w')
						count = 0;
						flag = 1;
						print(changedFile.path)
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
						'''
	except Exception:
		print("Exception occurred while processing phase {0}: {1}".format(phase, sys.exc_info()[0]))
		print("Stack trace: ")
		traceback.print_exc()
'''
try:
	subprocess.check_output("git diff --no-index -w --ignore-space-at-eol -b {0} {1} >> git_diff_{0}_{1}.txt".format("2016greenironhack-lostkuma-1", "2016greenironhack-lostkuma-2"), shell=True)
except subprocess.CalledProcessError:
	pass	
with open("git_diff_{0}_{1}.txt".format("2016greenironhack-lostkuma-1", "2016greenironhack-lostkuma-2"), 'r') as diff_file:
	patch = PatchSet(diff_file)
	for changedFile in patch:
		if changedFile.is_removed_file:
			continue
		else:
			if not os.path.exists(changedFile.path):
				if not os.path.exists(os.path.dirname(changedFile.path)):
					os.mkdir(os.path.dirname(changedFile.path))
		writer = open(changedFile.path, 'w')
		count = 0;
		flag = 1;
		print(changedFile.path)
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
'''