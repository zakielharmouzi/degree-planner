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
    file = open("output.txt", "w")
    for page in pdfReader.pages:
        print(page.extract_text())
        text = page.extract_text()
        matches = re.findall(pattern, text)
        courses = []
        for match in matches:
            match = match[:3] + " " + match[3:]
            courses.append(match)
            # print(match)
        for course in courses:
            response = supabase.table(
                'courses').select("course_id").eq('course_code', course).execute()
            # write the response to the file
            file.write(str(response))
            file.write("\n")
    file.close()
    # read the file and get the course ids:
    file = open("output.txt", "r")
    course_ids = []
    pattern = r'\d+'
    for line in file:
        matches = re.findall(pattern, line)
        for match in matches:
            course_ids.append(match)
    # remove duplicates
    course_ids = list(dict.fromkeys(course_ids))
    print(course_ids)
    # insert the course ids into the database
    for course_id in course_ids:
        supabase.table('user_courses').insert(
            {'id': user_id, 'course_id': course_id}).execute()
    file.close()
    pdfFileObj.close()
    # delete the file from the local filesystem
    import os
    os.remove(destination)
    os.remove("output.txt")
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
