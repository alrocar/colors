# pip install instaloader
# installoader --login=alrocar profile alrocar
# brew install imagemagick ghostscript
# magick mogrify -resize 200 *.jpg
# python http.server
# sudo ifconfig lo0 alias 169.254.254.254
# colorsummarize -> json

# npm -g install phantomjs
# phantomjs ~/dev/twittersentimentanalysis/tinybird-demos/colors/save.js https://css.glass > page.html
# dataviz
#   - json
#   - full size img
#   - pixi or blur css



import os
import requests
import json
 
path = './alrocar/fullsize'
url = 'http://localhost:4567/json'
results = []
import ipdb; ipdb.set_trace(context=30)
for x in os.listdir(path):
    print(x)
    if x.endswith(".jpg"):
        result = requests.get(url, params={
            'url': f'http://169.254.254.254:8000/{x}',
            'clusters': 5,
            'size': 200,
        })
        colors = []
        cluster = result.json()['imgdata'][1]['clusters']['cluster']
        for elem in cluster:
            colors.append({
                'f': elem[0]['f'],
                'hex': elem[2]['hex'][0]['hex']
            })

        results.append({
            'name': x,
            'colors': colors
        })
    print('done')
        
with open("imgdata.json", "w") as f:
    f.write(json.dumps(results))
