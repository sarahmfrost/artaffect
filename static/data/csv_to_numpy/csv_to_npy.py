import pandas as pd
import csv
import numpy as np
from numpy import genfromtxt


#sample = pd.read_csv('affect.csv', sep=',', header=None)

#have to remember to save csv with just the six columns

result = np.genfromtxt('before_csv_2_numpy.csv', skip_header=1, delimiter=',') # \n

#result = sample.values
#print(result)
np.save('outfile_name', result)

#sample2 = sample.to_numpy()

#rint(sample2)
#pixelData = np.asarray

# with open('affect_before.csv', 'r', newline='') as csv_reader:
#     for row in csv_reader:
#                     red = np.asarray(int(row)).astype(np.float)
#                     print(red)

# # with open('?', 'w', newline='') as csv_file_writer:
# #             writer = csv.writer(csv_file_writer, delimiter=',')
# #             for row in csv_reader:
# #                     red = np.asarray(row).astype(np.float)
