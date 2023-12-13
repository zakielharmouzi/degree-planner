import sys
import PyPDF2
import re

pattern = r'\b[A-Z]{3}\d+\b'


pdfFileObj = open('zakaria.pdf', 'rb')


pdfReader = PyPDF2.PdfReader(pdfFileObj)

for page in pdfReader.pages:

    text = page.extract_text()

    matches = re.findall(pattern, text)

    for match in matches:
        print(match)

pdfFileObj.close()
