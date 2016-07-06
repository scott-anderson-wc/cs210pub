#!/usr/local/bin/python2.7
import os,sys,re,codecs,markdown
from jinja2 import Environment, FileSystemLoader

def file_contents(filename):
    '''Returns contents of file as a string.'''
    with codecs.open(filename,mode='rt',encoding='utf-8',errors='strict') as file:
        contents = file.read()
    return contents

if __name__ == '__main__':
    
    env = Environment(loader=FileSystemLoader(['/home/cs210/web/templates',
                                               '../templates']))
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
        
        filename_parts = src.split('.')
        ext = filename_parts[-1]

        # create output filename and write
        filename_parts[-1] = 'html'
        outfile = '.'.join(filename_parts)

        # eventually, analyze the src to determine what template to use
        template = env.get_template('reading.html')

        # skip if up-to-date
        if (os.stat(outfile).st_mtime > os.stat(src).st_mtime and
            os.stat(outfile).st_mtime > newest_template_time):
            print "{src} is up-to-date -- skipping".format(src=src)
            continue

        content_lines = []
        if ext == 'part':
            # legacy html .part file
            with codecs.open(src,mode='rt',encoding='utf=8',errors='strict') as fin:
                for line in fin:
                    # help canonicalize line endings and deal with files created on Macs
                    line = line.rstrip('\r\n')
                    # still need to recognize H2 elements and built the TOC
                    content_lines.append(line)
            # all done
            content = os.linesep.join(content_lines)
        elif ext == 'md':
            # new Markdown file like Susan uses
            with codecs.open(src,mode='rt',encoding='utf=8',errors='strict') as fin:
                text = fin.read()
                # still need to recognize H2 (##) elements and built the TOC
                html = markdown.markdown(text)
                content = html
        else:
            print 'Unknown file type', ext
            raise Exception
        # write output file
        with codecs.open(outfile, mode='wt', encoding='utf-8', errors='xmlcharrefreplace') as fout:
            fout.write( template.render(TOC='Not yet implemented',
                                        title='Unknown',
                                        article=content) )
        print 'rendered to ', outfile
    print 'all done'
