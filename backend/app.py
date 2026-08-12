from flask_cors import CORS
from flask import Flask, request, jsonify
from parser import extract_text_docx, extract_text_pdf
from ats_score import calculate_ats_score, detect_sections, generate_feedback

app = Flask(__name__)

# Explicitly allow your Netlify domain
CORS(app, resources={r"/*": {"origins": "https://resume-analyzeer.netlify.app"}})

@app.route('/')
def home():
    return "JobFit Analyzer backend is running!"

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    resume_file = request.files["resume"]
    job_desc = request.form["job_desc"]

    if resume_file.filename.endswith(".docx"):
        resume_text = extract_text_docx(resume_file)
    elif resume_file.filename.endswith(".pdf"):
        resume_text = extract_text_pdf(resume_file)
    else:
        return jsonify({"error": "Unsupported file format"}), 400

    score, matched = calculate_ats_score(resume_text, job_desc)
    sections = detect_sections(resume_text)
    feedback = generate_feedback(resume_text, job_desc)

    return jsonify({
        "ATS Score": score,
        "Matched Keywords": list(matched),
        "Sections Found": sections,
        "Feedback": feedback
    })

if __name__ == "__main__":
    app.run(debug=True)
