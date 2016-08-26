#!/usr/bin/python3
#############################################
#Author: Priyank Jain
#Description: Global configuration settings
#Just a declaration of static site variables
#############################################
GITHUB = "https://github.com"
REPOSITORY = 'RCODI'
HACK = '2016greenironhack'
PHASE = 1
PHASE_SEPERATOR = '-phase'
EXTENSION = '.git'
URL_SEPERATOR = '/'
PHASE_DIRECTORY = HACK + PHASE_SEPERATOR + str(PHASE)
PHASE_FRAGMENT = PHASE_DIRECTORY + EXTENSION
URL = URL_SEPERATOR.join([GITHUB, REPOSITORY, PHASE_FRAGMENT])
