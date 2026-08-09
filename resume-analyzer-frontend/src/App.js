import React, { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_desc", jobDesc);

    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ATS Resume Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit">Analyze</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Results</h3>
          <p><strong>ATS Score:</strong> {result["ATS Score"]}</p>
          <p><strong>Matched Keywords:</strong> {result["Matched Keywords"].join(", ")}</p>
          <p><strong>Sections Found:</strong> {result["Sections Found"].join(", ")}</p>
          <p><strong>Feedback:</strong> {result["Feedback"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
