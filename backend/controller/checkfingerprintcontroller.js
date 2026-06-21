
const userfingerprint = require('../model/Teacher');

const checkfingerprintcontroller = async (req, res) => {
  try {
    const { fingerprint } = req.body;
    console.log('=== CHECKING FINGERPRINT ===');
    console.log('Probe fingerprint length:', fingerprint ? fingerprint.length : 'NULL');
    console.log('Probe fingerprint first 50 chars:', fingerprint ? fingerprint.substring(0, 50) : 'NULL');

    // Find teacher
    const teachers = await userfingerprint.findOne({name:"Sumit"});
    
    if(!teachers){
      console.log('Teacher not found');
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    console.log('Teacher found:', teachers.name);
    console.log('Candidate fingerprint length:', teachers.fingerprint_data ? teachers.fingerprint_data.length : 'NULL');
    console.log('Candidate fingerprint first 50 chars:', teachers.fingerprint_data ? teachers.fingerprint_data.substring(0, 50) : 'NULL');

    // IMPORTANT: Check if fingerprint_data is a Buffer or String
    let candidateBase64 = teachers.fingerprint_data;
    if (Buffer.isBuffer(candidateBase64)) {
      candidateBase64 = candidateBase64.toString('base64');
      console.log('Converted Buffer to Base64 string, new length:', candidateBase64.length);
    }

    // Ensure probe is also a string
    let probeBase64 = fingerprint;
    if (Buffer.isBuffer(probeBase64)) {
      probeBase64 = probeBase64.toString('base64');
    }

    console.log('Sending to match server...');
    console.log('Final probe length:', probeBase64.length);
    console.log('Final candidate length:', candidateBase64.length);

    try {
      const matchResponse = await fetch("http://localhost:8080/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidateBase64: candidateBase64,
          probeBase64: probeBase64
        })
      });

      console.log('Match server status:', matchResponse.status);

      if (!matchResponse.ok) {
        const errorText = await matchResponse.text();
        console.error('Match server error body:', errorText);
        return res.status(500).json({
          success: false,
          message: 'Match server error: ' + matchResponse.status,
          details: errorText
        });
      }

      const matchData = await matchResponse.json();
      console.log('Match data:', matchData);

      if(matchData.isMatch) {
        return res.json({
          success: true,
          message: 'Fingerprint matched successfully',
          teacher: {
            name: teachers.name,
            id: teachers._id
          },
          score: matchData.score
        });
      } else {
        return res.json({
          success: false,
          message: 'Fingerprint not matched',
          score: matchData.score
        });
      }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError.message);
      return res.status(500).json({
        success: false,
        message: 'Match server connection failed: ' + fetchError.message
      });
    }

  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal Server Error: ' + error.message 
    });
  }
}

module.exports = { checkfingerprintcontroller };