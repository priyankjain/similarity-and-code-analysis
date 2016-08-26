#!/usr/bin/python3
##############################################################
#Author: Priyank Jain
#Description: Move all js/html/htm files to the root folder
##############################################################
import os
import config
from subprocess import call
#Construct URL repository for this phase
#Clone the current phase repository
call(["git", "clone", config.URL])
os.chdir(config.PHASE_DIRECTORY)
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
                    or "angular" in filename_lc):
                        print("Deleting {0} from {1}".format(filename, dirpath))
                        os.remove(os.path.join(dirpath, filename))
                        print("Deleted {0} from {1}".format(filename, dirpath))
                        continue
                    print("Moving {0} from {1} to {2}".format(filename, dirpath, content))
                    os.rename(os.path.join(dirpath, filename), os.path.join(content, filename))
                    print("Moved {0} from {1} to {2}".format(filename, dirpath, content))        
