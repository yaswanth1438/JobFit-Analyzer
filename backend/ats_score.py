from utils import preprocess

def calculate_ats_score(resume_text, job_desc):
    """Calculate ATS score based on keyword overlap."""
    resume_words = preprocess(resume_text)
    jd_words = preprocess(job_desc)
    matched = resume_words.intersection(jd_words)
    score = (len(matched) / len(jd_words)) * 100 if jd_words else 0
    return round(score, 2), matched

def detect_sections(resume_text):
    """Detect common resume sections."""
    sections = ["education", "experience", "skills", "projects"]
    found = [sec for sec in sections if sec in resume_text.lower()]
    return found

def generate_feedback(resume_text, job_desc):
    """Suggest missing keywords from job description."""
    resume_words = preprocess(resume_text)
    jd_words = preprocess(job_desc)
    missing = jd_words - resume_words
    return f"Missing keywords: {', '.join(list(missing)[:10])}"
