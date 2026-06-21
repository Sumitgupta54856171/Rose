'use client'
import { useState } from 'react';

export default function CheckFingerprint() {
  const [status, setStatus] = useState('');
  const [quality, setQuality] = useState(0);
  const [matchResult, setMatchResult] = useState<any>(null);

  const captureFingerprint = async () => {
    setStatus('Scanning... Apni finger scanner par rakhein.');
    setMatchResult(null);
    
    // Mantra RD Service Default Port 11100 hota hai
    const rdServiceUrl = "http://100.84.198.43:11100/rd/capture";

    // Mantra standard PidOptions XML payload
    const pidOptionsXML = `
      <PidOptions ver="1.0">
        <Opts fCount="1" fType="0" iCount="0" iType="0" pCount="0" pType="0" format="0" pidVer="2.0" timeout="10000" env="P" />
      </PidOptions>
    `.trim();

    try {
      const response = await fetch(rdServiceUrl, {
        method: 'CAPTURE',
        headers: {
          'Content-Type': 'text/xml',
          'Accept': 'text/xml'
        },
        body: pidOptionsXML
      });

      const responseText = await response.text();
      
      // XML Response ko parse karein
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "text/xml");
      
      // Check if capture was successful
      const respInfo = xmlDoc.getElementsByTagName("Resp")[0];
      const errCode = respInfo.getAttribute("errCode");
      const errInfo = respInfo.getAttribute("errInfo");

      if (errCode === "0") {
        // Biometric data extracted
        const pidDataNode = xmlDoc.getElementsByTagName("Data")[0];
        const base64Data = pidDataNode.textContent;
        const qScore = respInfo.getAttribute("qScore");

        setQuality(qScore ? parseInt(qScore) : 0);
        setStatus('Scan Successful! Quality: ' + qScore);

        console.log(base64Data);
        // Ab is data ko Express Backend par bhein for checking
        checkFingerprint(base64Data);
       
      } else {
        setStatus(`Error (${errCode}): ${errInfo}`);
      }

    } catch (error) {
      console.error("RD Service connection failed:", error);
      setStatus('Mantra RD Service nahi chal rahi hai. Please install or start it.');
    }
  };

  const checkFingerprint = async (biometricData: string) => {
    try {
      setStatus('Checking fingerprint in database...');
      const res = await fetch('http://localhost:5000/api/students/checkfingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fingerprint: biometricData 
        })
      });
      const result = await res.json();
      setMatchResult(result);
      setStatus(result.success ? 'Fingerprint matched!' : 'Fingerprint not found');
    } catch (err) {
      console.error("Backend error:", err);
      setStatus('Error connecting to backend');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Check Fingerprint</h2>
      <button onClick={captureFingerprint} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Scan Fingerprint to Check
      </button>
      <p><strong>Status:</strong> {status}</p>
      {quality > 0 && <p><strong>Fingerprint Quality:</strong> {quality}%</p>}
      
      {matchResult && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          {matchResult.success ? (
            <div style={{ color: 'green' }}>
              <h3>✓ Match Found!</h3>
              <p><strong>Teacher Name:</strong> {matchResult.teacher?.name}</p>
              <p><strong>Teacher ID:</strong> {matchResult.teacher?.id}</p>
            </div>
          ) : (
            <div style={{ color: 'red' }}>
              <h3>✗ No Match Found</h3>
              <p>{matchResult.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
