import React, { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);   // resume file
    formData.append("job_desc", jobDesc); // job description text

    const response = await fetch("https://jobfit-analyzer-n8hn.onrender.com/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>JobFit Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume:</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        </div>
        <div>
          <label>Paste Job Description:</label>
          <textarea
            rows="6"
            cols="50"
            placeholder="Paste job description here"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>
        <button type="submit">Analyze</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>ATS Score: {result["ATS Score"]}</h3>
          <p><strong>Matched Keywords:</strong> {result["Matched Keywords"].join(", ")}</p>
          <p><strong>Feedback:</strong> {result["Feedback"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
