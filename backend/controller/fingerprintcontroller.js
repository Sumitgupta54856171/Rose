
const  userfingerprint = require('../model/Teacher');

const fingerprintsavedcontroller = async(req,res)=>{
  try{
    const { fingerprint,name } = req.body;
    console.log(fingerprint);
    const savedfingerprint = new userfingerprint({ fingerprint_data: fingerprint,name:name });
    await savedfingerprint.save();
    console.log("fingerprint data saved")
    res.send('Fingerprint received');

  }catch(error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { fingerprintsavedcontroller };