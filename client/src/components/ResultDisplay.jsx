import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div>
      <h3>Result:</h3>
      <p>Vehicle Type: {result.vehicleType}</p>
      <p>Confidence: {result.confidence}</p>
      <p>Premium Estimate: {result.premiumEstimate}</p>
    </div>
  );
};

export default ResultDisplay;
