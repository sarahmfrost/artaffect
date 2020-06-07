
import pandas as pd
import csv

import urllib.request
import requests
from urllib.request import Request
import shutil


import time
import os #for creating a directory
from random import randint
import re


posts = []
urls = []
comments = []
subs = []
counter = 0

with open('wikiArt_images_info.csv', 'r', newline='', encoding = 'unicode_escape') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        urls = row['Image URL']
        filename = urls.split('/')[-1]
        #print(filename)
        urls_new = re.sub('https', 'http', urls.rstrip())
        #print(urls_new)

        r = requests.get(urls_new, stream=True)
        if r.status_code == 200:
            with open(filename, 'wb') as f:
                r.raw.decode_content = True
                shutil.copyfileobj(r.raw, f)
        counter+=1
        print("counter is", counter)



        # value = randint(0, 8)
        # time.sleep(value) # make random
        # counter+=1
        # print("counter is", counter)

csvfile.close()






