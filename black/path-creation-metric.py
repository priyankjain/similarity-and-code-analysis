#!/usr/bin/python3
#############################################################################################
# Author: Priyank Jain
# Email: jain206@purdue.edu
# Description: Calculates the path-creation metric between subsequent phases,
# for each project
# The same-phase-similarity.py and cross-phase-similarity scripts should have ran 
# successfully before calling this script
#############################################################################################
import os
import sys
import config
import traceback
from time import strftime
import shutil
import collections 
import csv
import pprint
homedir = os.getcwd()
logFile = open('path-creation-metric-{0}.log'.format(strftime('%Y-%m-%d-%H-%M-%S')), 'w')
sys.stdout = logFile
if os.path.exists("reports"):
	shutil.rmtree("reports")
os.mkdir("reports")
prevPhase = None
phaseCreationDict = collections.OrderedDict()
for phase in range(1, 4):
	try:
		print("Processing phase {0}".format(phase))
		config.updatePhase(phase)
		# Get files from same-phase-similarity metric similarity-metric-phase-
		for fileName in ["moss-result-phase-{0}.html", "number-of-lines-{0}.csv", "similarity-metric-phase-{0}.csv"]:
			fileName = fileName.format(phase)
			src = os.path.join(config.PHASE_DIRECTORY, fileName)
			dest = os.path.join("reports", fileName)
			shutil.copyfile(src, dest)

		if phase > 1:
			for fileName in ["cross-phase-similarity-metric-phase-{0}-{1}.csv", "moss-result-cross-phase-{0}-{1}.html"]:
				fileName = fileName.format(phase, prevPhase)
				crossPhaseDirectory = "phase-{0}-{1}".format(phase, prevPhase)
				src = os.path.join("cross-phase", crossPhaseDirectory, fileName)
				dest = os.path.join("reports", fileName)
				shutil.copyfile(src, dest)
		
		with open("reports/number-of-lines-{0}.csv".format(phase), 'r') as curFile:
			csvreader = csv.reader(curFile)
			count = 0
			for row in csvreader:
				if count == 0:
					count = 1
					continue
				# If project is not there
				if not row[0] in phaseCreationDict:
					phaseCreationDict.setdefault(row[0],list())
					for eachPrevPhase in range(1, phase):
						phaseCreationDict[row[0]].append(0)

				phaseCreationDict[row[0]].append(float(row[1]))
		print("Completed processing phase {0}".format(phase))
		prevPhase = phase
	except:
		print("Exception occurred while processing phase {0}: {1}".format(phase, sys.exc_info()[0]))
		print("Stack trace: ")
		traceback.print_exc()

for row in phaseCreationDict.values():
	row.extend([row[1]-row[0], row[2]-row[1]])
pprint.pprint(phaseCreationDict)

with open("reports/path-creation-metric.csv", "w") as pathMetricFile:
	csvwriter = csv.writer(pathMetricFile)
	count = 0
	csvwriter.writerow(["Phase creation metric"])
	csvwriter.writerow(["Participant", "Phase 2-1", "Phase 3-2", "Phase 4-3", "Lines in Phase 1", \
		"Lines in Phase 2", "Lines in Phase 3", "Lines in Phase 4"])
	for participant, stats in phaseCreationDict.items():
		csvwriter.writerow([participant, stats[3], stats[4], stats[0], stats[1], stats[2]])