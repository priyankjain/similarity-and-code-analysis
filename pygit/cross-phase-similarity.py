#!/usr/bin/python3
#############################################################################
# Author: Priyank Jain
# Email: jain206@purdue.edu
# Description: Compare cross-phase similarity between two different
# participants in subsequent phases
#############################################################################
import os
import subprocess
import shutil
import git
from unidiff import PatchSet

homedir = os.getcwd()
for content in os.listdir(homedir):
	if os.path.isdir(content) and not content.startswith('.'):
		if(os.path.exists(os.path.join(homedir, content, ".git"))):
			shutil.rmtree(os.path.join(homedir, content, ".git"))
		if(os.path.exists(os.path.join(homedir, content, ".gitignore"))):
			shutil.rmtree(os.path.join(homedir, content, ".gitignore"))
try:
	subprocess.check_output("git diff --no-index -w --ignore-space-at-eol -b {0} {1} >> git_diff_{0}_{1}.txt".format("2016greenironhack-lostkuma-1", "2016greenironhack-lostkuma-2"), shell=True)
except subprocess.CalledProcessError:
	pass	
with open("git_diff_{0}_{1}.txt".format("2016greenironhack-lostkuma-1", "2016greenironhack-lostkuma-2"), 'r') as diff_file:
	patch = PatchSet(diff_file)
	if not os.path.exists("cross-phase"):
		os.mkdir("cross-phase")
	os.chdir("cross-phase")
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