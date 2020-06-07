import pandas as pd
import csv

import urllib.request
import requests
from urllib.request import Request

import re #regex for excluding .gif files


import time
import os #for creating a directory
from random import randint


posts = []
urls = []
comments = []
subs = []
counter = 0


#this code reads in names of paintings that have been downloaded
# arr = os.listdir()
# with open('update.csv', 'w') as outFile:
#     for item in arr:
#         outFile.write(item)
#         outFile.write('\n')

smallerCSV = 'big_images_file.csv'
targetCSV = 'update.csv'


with open(targetCSV, 'r', encoding = 'unicode_escape') as t1, open(smallerCSV, 'r', encoding = 'unicode_escape') as t2:
    fileone = t1.readlines()
    filetwo = t2.readlines()

with open('notDownloaded.csv', 'w') as outFile:
    for line in filetwo:
        if line not in fileone:
            outFile.write(line)




