// components/FingerprintScanner.jsx
'use client'
import { useState } from 'react';

export default function FingerprintScanner() {
  const [status, setStatus] = useState('');
  const [quality, setQuality] = useState(0);

  const captureFingerprint = async () => {
    setStatus('Scanning... Apni finger scanner par rakhein.');
    
    // ⚠️ IMPORTANT: Use YOUR machine's IP where RDService is running
    // 127.0.0.1 works only if RDService is on same machine
    const rdServiceUrl = "http://100.84.198.43:11100/rd/capture";

    // ✅ FIXED PidOptions - env="PP" for no encryption, proper format
 const pidOptionsXML = `<?xml version="1.0"?>
<PidOptions ver="1.0">
  <Opts fCount="1" fType="0" format="0" pidVer="2.0" timeout="30000" posh="UNKNOWN" env="P" />
</PidOptions>`;

    try {
      const response = await fetch(rdServiceUrl, {
        method: 'CAPTURE',
        headers: {
          'Content-Type': 'text/xml',
          'Accept': 'text/xml'
        },
        body: pidOptionsXML
      });
      console.log("Response:", response);

      const responseText = await response.text();
      console.log("Raw RDService Response:", responseText);
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "text/xml");
      
      const respInfo = xmlDoc.getElementsByTagName("Resp")[0];
      const errCode = respInfo.getAttribute("errCode");
      const errInfo = respInfo.getAttribute("errInfo");

      if (errCode === "0") {
        // ✅ Get the actual biometric data from <Data> tag
        const pidDataNode = xmlDoc.getElementsByTagName("Data")[0];
        const base64Data = pidDataNode.textContent;
        const qScore = respInfo.getAttribute("qScore") || "N/A";

        setQuality(qScore);
        setStatus('Scan Successful! Quality: ' + qScore);

        console.log("Captured data length:", base64Data.length);
        console.log("First 50 chars:", base64Data.substring(0, 50));

        // ⚠️ CRITICAL: Check if data is encrypted or not
        // If env="PP", data should be plain XML (decrypted)
        // If env="P", data is encrypted and needs AUA decryption
        
        sendToBackend(base64Data);
       
      } else {
        setStatus(`Error (${errCode}): ${errInfo}`);
      }

    } catch (error) {
      console.error("RD Service connection failed:", error);
      setStatus('Mantra RD Service nahi chal rahi hai. Please install or start it.');
    }
  };

  const sendToBackend = async (biometricData) => {
    try {
      const res = await fetch('http://localhost:5000/api/students/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Sumit",  
          fingerprint: biometricData 
        })
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error("Backend error:", err);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Mantra Biometric Attendance</h2>
      <button onClick={captureFingerprint} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Scan Fingerprint
      </button>
      <p><strong>Status:</strong> {status}</p>
      {quality > 0 && <p><strong>Fingerprint Quality:</strong> {quality}%</p>}
    </div>
  );
}