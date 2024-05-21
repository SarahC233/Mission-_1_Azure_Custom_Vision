import React, { useState } from "react";
import styles from "./FileUpload.module.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null); //declares a state variable selectedFile and a function setSelectedFile to update the state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    //function called when the user selects a file, updates the selectedFile state with the selected file
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]); // Log the selected file
  };

  const handleSubmit = async (e) => {
    //function called when the user submits the form. Sends a POST request to the server at the /predict endpoint with the selected file
    //It sets the loading state to true while request is in progress, then sets it to false when request is complete. If request is successful, updates result with response data.
    e.preventDefault(); //prevents the default form submission behavior, which would cause a page reload
    if (!selectedFile) {
      alert("Please select a file."); //if no file is selected, displays an alert to the user
      return; //'return' exits the function early if no file is selected
    }

    const formData = new FormData();
    formData.append("image", selectedFile); //creates new FormData object and appends the selected file to it with the field name "image".
    //FormData is a web API used to prepare data for HTTP requests or fetch operations

    // try-catch-finally block
    try {
      setLoading(true); //sets loading state to true when request in progress
      //below sends a POST request to the server at the /predict endpoint with the selected file.
      //The await keyword is used to wait for the request to complete before moving on to the next line of code.
      const response = await fetch("http://localhost:3000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json(); //reads the response body as JSON, await waits for the operation to complete
      setResult(data); //updates the result state with the response data
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); //indicates that the request is complete, regardless of whether it was successful or not
    }
  };

  return (
    <div className={styles.fileUploadArea}>
      <h2>Upload a Car Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button
          type="submit"
          disabled={loading}
          className={styles.uploadButton}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {result && (
        <div className={styles.resultDisplay}>
          <h3 className={styles.resultText}>Result:</h3>
          <p>Vehicle Type: {result.vehicleType}</p>
          <p>Confidence: {result.confidence}</p>
          <p>Premium Estimate: {result.premiumEstimate}</p>
          {result.image && (
            <img
              src={result.image}
              alt="Result"
              className={styles.resultImage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;