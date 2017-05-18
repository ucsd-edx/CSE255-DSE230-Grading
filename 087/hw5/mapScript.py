import pandas as pd
import numpy as np
import os
import pylab as plt
from matplotlib.colors import rgb2hex


from ipyleaflet import (
    Map,
    Marker,
    TileLayer, ImageOverlay,
    Polyline, Polygon, Rectangle, Circle, CircleMarker,
    GeoJSON,
    DrawControl
)


#define a mapping from the range of the value to hex colors.

def get_color(val,_min,_max):
    cmap=plt.get_cmap('jet')

    x=(val-_min)/(_max-_min)
    return(rgb2hex(cmap(x)[:3]))


def getMap(zoom = 9):
    pdf = pd.read_pickle('Report_Figures/pdf.pkl')

    _avg = 'avg(coeff_1)'
    _min=pdf[_avg].min()
    _max=pdf[_avg].max()

    [min_lat, max_lat, min_long , max_long] = [33.3767, 34.2639, -111.3447, -108.5167]
    center = [(min_lat+max_lat)/2, (min_long+max_long)/2]

    m = Map(default_tiles=TileLayer(opacity=1.0), center=center, zoom=zoom)

    r = Rectangle(bounds=[[min_lat,min_long],[max_lat,max_long]], weight=5, fill_opacity=0.0)
    m += r

    lat_margin=(max_lat-min_lat)/4
    long_margin=(max_long-min_long)/4
    circles = []
    for index,row in pdf.iterrows():
        _lat=row['latitude']
        _long=row['longitude']
        _count=row['count(station)']
        _coef=row[_avg]
        # taking sqrt of count so that the  area of the circle corresponds to the count
        c = Circle(location=(_lat,_long), radius=int(300*np.sqrt(_count+0.0)), weight=1,
                color='#F00', opacity=0.8, fill_opacity=0.4,
                fill_color=get_color(_coef,_min,_max))
        circles.append(c)
        m.add_layer(c)
    return m    