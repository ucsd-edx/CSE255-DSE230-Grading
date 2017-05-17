import pickle
import numpy as np
import math
from numpy import linalg as LA


def exercise(fstudent, sc):
    f = open("Tester/hw3.pkl",'r')
    thePickle = pickle.load(f)
    datasets = thePickle["pca"]
    answers  = thePickle["pca_correct"]
    f.close()

    for i in range(len(datasets)):
        data   = datasets[i]
        corAns = answers[i] 
        for j in corAns: 
            print "\n"+corAns[j]

