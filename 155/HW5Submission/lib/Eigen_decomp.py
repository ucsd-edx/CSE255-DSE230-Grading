import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interact, interactive, fixed, interact_manual
import ipywidgets as widgets

def compute_var(vector):
    v=np.array(np.nan_to_num(vector),dtype=np.float64)
    return np.dot(v,v)
 
class Eigen_decomp:
    """A class for approximating a function with an orthonormal set of
    function    """
    
    def __init__(self,x,f,mean,v):
        """ Initialize the widget

        :param x: defines the x locations
        :param f: the function to be approximated
        :param mean: The initial approximation (the mean)
        :param v: a list of numpy.arrays that are the eigenvectors
        :returns: None
        """
        # Todo: test parameters for type and orthonormality.
        #if type(v) != list:
        #    err+='recon_plot: type of parameter v is'+)

        self.v=[np.array(vec,dtype=np.float64) for vec in v]
        self.x=x
        self.mean=mean
        self.U=np.vstack(v)
        self.f=f
        self.startup_flag=True
        self.C=np.dot(self.U,np.nan_to_num(f)-mean)  # computer the eigen-vectors coefficients.
        self.n,self.m=np.shape(self.U)
        self.coeff={'c'+str(i):self.C[i] for i in range(len(self.C))} # Put the coefficient in the dictionary format that is used by "interactive".
        return None

    def compute_var_explained(self):
        """Compute a summary of the decomposition

        :returns: (('total_var',total_variance),
                ('residual var after mean, eig1,eig2,...',residual_var/total_variance),
                ('reduction in var for mean,eig1,eig2,...',percent_explained/total_variance),
                ('eigen-vector coefficients',self.C)

        :rtype: tuple of pairs. The first element in each pair is a
        description, the second is a number or a list of numbers or an
        array.

        """
        residual_var=np.zeros(self.n+1)
        residual=self.f
        total_variance=compute_var(residual)
        residual=residual-self.mean
        residual_var[0]=compute_var(residual)
        for i in range(self.n):
            g=self.v[i]*self.coeff['c'+str(i)]
            residual=residual-g
            residual_var[i+1]=compute_var(residual)
        percent_explained=np.zeros(self.n+1)
        percent_explained[0]=total_variance-residual_var[0]  # percent explained by mean
        for i in range(self.n):
            percent_explained[i+1]=residual_var[i]-residual_var[i+1]
        return (('total_var',total_variance),
                ('residual var after mean, eig1,eig2,...',residual_var/total_variance),
                ('reduction in var for mean,eig1,eig2,...',percent_explained/total_variance),
                ('eigen-vector coefficients',self.C)
        )
