#!/usr/local/bin/python2.7

'''Script to wrap some page content with our boilerplate skeleton. The
page content could be in MarkDown (extension of .md) or plain HTML
(extension of .part).

Scott D. Anderson
summer 2016

change log:

7/18 fixed a bug where content was just 'content' and not the variable value
'''

verbose = False

import os,sys,re,codecs,markdown,re
from jinja2 import Environment, FileSystemLoader

def file_contents(filename):
    '''Returns contents of file as a string.'''
    global verbose
    with codecs.open(filename,mode='rt',encoding='utf-8',errors='strict') as file:
        contents = file.read()
    return contents

if __name__ == '__main__':
    
    if len(sys.argv) == 1:
        print "Usage: {cmd} [-force] file{{.md,.part}} ...".format(cmd=sys.argv[0])
        sys.exit(0)

    verbose = '-verbose' in sys.argv
    force = '-force' in sys.argv
    if verbose:
        print 'force is ',force
    if force:
        sys.argv.remove('-force')

    try:
        os.stat('templates')
    except Exception as err:
        print "Couldn't see local directory 'templates'", err
        sys.exit(1)

    env = Environment(loader=FileSystemLoader(['/home/cs210/public_html/cs210pub/templates',
                                               'templates']))
    # print 'Available Templates:', env.list_templates()

    newest_template_time = 0
    for filename in env.list_templates():
        templ = env.get_template(filename)
        newest_template_time = max(newest_template_time, os.stat(templ.filename).st_mtime)
        
    if len(sys.argv) < 2:
        print 'Usage: ', sys.argv[0], 'source_files...'
        sys.exit()

    for src in sys.argv[1:] :
        if verbose:
            print 'processing ', src
        
        pathname_parts = src.split('/')
        filename_parts = pathname_parts[-1].split('.')
        ext = filename_parts[-1]

        # create output filename and write
        filename_parts[-1] = 'html'
        pathname_parts[-1] = '.'.join(filename_parts)
        outfile = '/'.join(pathname_parts)

        # eventually, analyze the src to determine what template to use
        if src == 'index.md':
            template = env.get_template('main.html')
        elif pathname_parts[0] in ['reading','assignments']:
            template = env.get_template('reading.html')
        elif pathname_parts[0] == 'lectures':
            template = env.get_template('lectures.html')
        else:
            print "Don't know what module to use for this: ",src
            continue

        # skip if up-to-date
        if (not force and
            os.path.isfile(outfile) and
            os.stat(outfile).st_mtime > os.stat(src).st_mtime and
            os.stat(outfile).st_mtime > newest_template_time):
            if verbose:
                print "{src} is up-to-date -- skipping".format(src=src)
            continue

        content_lines = []
        if ext == 'part':
            # legacy html .part files
            with codecs.open(src,mode='rt',encoding='utf=8',errors='strict') as fin:
                for line in fin:
                    # help canonicalize line endings and deal with files created on Macs
                    line = line.rstrip('\r\n')
                    # still need to recognize H2 elements and built the TOC
                    content_lines.append(line)
            # all done
            content = os.linesep.join(content_lines)
            render_args = {'TOC': 'TOC not yet implemented',
                           'article': content}
        elif ext == 'md':
            # new Markdown file like Susan uses
            with codecs.open(src,mode='rt',encoding='utf=8',errors='strict') as fin:
                text = fin.read()
                # still need to recognize H2 (##) elements and built the TOC
                html = markdown.markdown(text,
                                         extensions=[
                        'markdown.extensions.fenced_code',
                        'markdown.extensions.toc',
                        'markdown.extensions.sane_lists',
                        'markdown.extensions.codehilite'
                        ])
                content = html
                if src == 'index.md':
                    print 'special for index.md'
                    render_args = { 'article': content}
                else:
                    render_args = {'TOC': 'TOC not yet implemented',
                                   'article': content}
        else:
            print 'Unknown file type', ext
            raise Exception
        # write output file
        with codecs.open(outfile, mode='wt', encoding='utf-8', errors='xmlcharrefreplace') as fout:
            fout.write( template.render(**render_args))
        print 'rendered to ', outfile
        os.chmod(outfile,0664)
    if verbose:
        print 'all done'
