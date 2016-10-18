# Author: Priyank Jain
# Email: jain206@purdue.edu
############################
import os
import sys
import traceback
import config
import zipfile
from time import strftime
import subprocess
import shutil
def fixBadZipfile(zipFile):  
	f = open(zipFile, 'r')  
	data = f.read()  
	pos = data.find('\x50\x4b\x05\x06') # End of central directory signature  
	if (pos > 0):  
		f.seek(pos + 22)   # size of 'ZIP end of central directory record' 
		f.truncate()  
		f.close()  
	else:  
		pass
def cleanCurrentDirectory():
	for dirFile in os.listdir(os.getcwd()):
		if dirFile.endswith('.zip'):
			subprocess.call(["unzip", dirFile])
			os.remove(dirFile)
	for content in os.listdir(os.getcwd()):
		# Skip if not a directory or a directory starting with .
	    if os.path.isdir(content) and not content.startswith('.'):
	    	newname = content.replace("-master", "")
	    	os.rename(content, newname)
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

logFile = open('get-code-{0}.log'.format(strftime('%Y-%m-%d-%H-%M-%S')), 'w')
sys.stdout = logFile
homedir = os.getcwd()
for phase in range(1, 4):
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
	except:
		print("Exception occurred while processing phase {0}: {1}".format(phase, sys.exc_info()[0]))
		print("Stack trace: ")
		traceback.print_exc()