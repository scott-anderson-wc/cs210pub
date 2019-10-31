verbose = False

import os,sys,re,codecs,markdown,re
from jinja2 import Environment, FileSystemLoader


env = Environment(loader=FileSystemLoader(['/home/cs204/public_html/cs210pub/templates',
                                               'templates']))
print 'Available Templates:', env.list_templates()

newest_template_time = 0
for filename in env.list_templates():
    print 'Loading {}'.format(filename)
    templ = env.get_template(filename)
    newest_template_time = max(newest_template_time, os.stat(templ.filename).st_mtime)

        
