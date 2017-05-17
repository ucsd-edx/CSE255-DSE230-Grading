from datetime import date
from numpy import shape
from matplotlib.dates import MonthLocator, DateFormatter
class YearPlotter:
    def __init__(self):
        start=365*1+1
        self.dates=[date.fromordinal(i) for i in range(start,start+365)]
        self.monthsFmt = DateFormatter("%b")
        self.months = MonthLocator(range(1, 13), bymonthday=1, interval=3)
        #self.i=0

    def plot(self,T,fig,ax,label='',labels=None,title=None):
        #print self.i,'fig=',fig,'ax=',ax
        #self.i+=1
        shp=shape(T)
        if shp[0] != 365:
            raise ValueError("First dimension of T should be 365. Shape(T)="+str(shape(T)))
        if len(shp)==1:
            #print 'one'
            ax.plot(self.dates,T,label=label);
        else:
            #print 'more than 1'
            if labels is None:
                labels=[str(i) for i in range(shp[1])]
            for i in range(shp[1]):
                ax.plot(self.dates,T[:,i],label=labels[i])
        ax.xaxis.set_major_locator(self.months)
        ax.xaxis.set_major_formatter(self.monthsFmt)
        if not title is None:
            ax.set_title(title)
        #rotate and align the tick labels so they look better
        fig.autofmt_xdate()
        ax.grid()
        ax.legend()
        
        
    def plot_ax2(self,T,fig,ax,label='',labels=None,title=None,T1=None,ax2=None,labels2=None):
        #print self.i,'fig=',fig,'ax=',ax
        #self.i+=1
        shp=shape(T)
        if shp[0] != 365:
            raise ValueError("First dimension of T should be 365. Shape(T)="+str(shape(T)))
        if len(shp)==1:
            #print 'one'
            ax.plot(self.dates,T,label=label);
        else:
            #print 'more than 1'
            if labels is None:
                labels=[str(i) for i in range(shp[1])]
            for i in range(shp[1]):
                ax.plot(self.dates,T[:,i],label=labels[i])
        if ax2:
            shp=shape(T1)
            for i in range(shp[1]):
                ax2.plot(self.dates,T1[:,i],'--m',label=labels2[i])
        ax.xaxis.set_major_locator(self.months)
        ax.xaxis.set_major_formatter(self.monthsFmt)
        if not title is None:
            ax.set_title(title)
        #rotate and align the tick labels so they look better
        fig.autofmt_xdate()
        ax.grid()
        ax.legend(loc=2)
        ax2.set_ylim([-5,15])
        ax2.legend(loc=1)
        
