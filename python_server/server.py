from flask import Flask, request
from flask_cors import CORS
from supabase import create_client, Client
import PyPDF2
import re


import PyPDF2

app = Flask(__name__)
CORS(app)

supabase = create_client(
    "https://jgikuxzyfsenajscnvau.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaWt1eHp5ZnNlbmFqc2NudmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NjY3OTAsImV4cCI6MjAxMTI0Mjc5MH0.ljjM1THnw1MbaxvU0OZq_Fhx-cVwn-X8MoV8tXiyAxU"
)


@app.route("/", methods=["GET"])
def download_random_pdf():
    user_id = request.args.get('user_id')

    # Construct the file URL based on the user_id
    # Adjust the path and filename accordingly
    file_url = f'{user_id}/file'

    # Download the file from Supabase Storage
    destination = f'{user_id}_file.pdf'  # Destination file name
    res = supabase.storage.from_('public/pdfs').download(file_url)

    # Write the file to the local filesystem
    with open(destination, 'wb') as f:
        f.write(res)

    pattern = r'\b[A-Z]{3}\d+\b'
    pdfFileObj = open(destination, 'rb')
    pdfReader = PyPDF2.PdfReader(pdfFileObj)
    for page in pdfReader.pages:
        print(page.extract_text())
        text = page.extract_text()
        matches = re.findall(pattern, text)
        for match in matches:
            print(match)
    pdfFileObj.close()
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
