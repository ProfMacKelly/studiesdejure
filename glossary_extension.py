from markdown.inlinepatterns import Pattern
from markdown.extensions import Extension
import xml.etree.ElementTree as etree

GLOSSARY_RE = r'\[!(?P<term>[^\]]+)\]\((?P<term_id>[^\)]+)\)'

class GlossaryPattern(Pattern):
    def handleMatch(self, m):
        term = m.group('term')
        term_id = m.group('term_id')
        el = etree.Element('span')
        el.set('class', 'glossary-term')
        el.set('data-term', term_id)
        el.text = term
        return el

class GlossaryExtension(Extension):
    def extendMarkdown(self, md):
        md.inlinePatterns.register(GlossaryPattern(GLOSSARY_RE, md), 'glossary', 175)

def makeExtension(**kwargs):
    return GlossaryExtension(**kwargs)