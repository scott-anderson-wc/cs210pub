#!/usr/local/bin/python2.7
import os,sys,re,codecs,markdown,re
from jinja2 import Environment, FileSystemLoader

def file_contents(filename):
    '''Returns contents of file as a string.'''
    with codecs.open(filename,mode='rt',encoding='utf-8',errors='strict') as file:
        contents = file.read()
    return contents

if __name__ == '__main__':
    
    force = '-force' in sys.argv
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
        elif pathname_parts[0] == 'reading':
            template = env.get_template('reading.html')
        else:
            print "Don't know what module to use for this: ",src
            continue

        # skip if up-to-date
        if (not force and
            os.stat(outfile).st_mtime > os.stat(src).st_mtime and
            os.stat(outfile).st_mtime > newest_template_time):
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
            render_args = {'TOC': 'Not yet implemented',
                           'title': 'Unknown',
                           'article': 'content'}
        elif ext == 'md':
            # new Markdown file like Susan uses
            with codecs.open(src,mode='rt',encoding='utf=8',errors='strict') as fin:
                text = fin.read()
                # still need to recognize H2 (##) elements and built the TOC
                html = markdown.markdown(text)
                content = html
                if src == 'index.md':
                    render_args = {'content': content}
                else:
                    render_args = {'TOC': 'Not yet implemented',
                                   'title': 'Unknown',
                                   'article': 'content'}
        else:
            print 'Unknown file type', ext
            raise Exception
        # write output file
        with codecs.open(outfile, mode='wt', encoding='utf-8', errors='xmlcharrefreplace') as fout:
            fout.write( template.render(**render_args))
        print 'rendered to ', outfile
    print 'all done'
