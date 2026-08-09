import re

def preprocess(text):
    """
    Preprocess text for ATS scoring.
    - Lowercase everything
    - Remove punctuation
    - Return unique words
    """
    text = text.lower()
    words = re.findall(r'\w+', text)
    return set(words)
