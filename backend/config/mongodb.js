const { default: mongoose, mongo } = require("mongoose")

const  connnectmongodb=async() =>{
    mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("Mongodb connected"))
    .catch((errr)=>console.error('mongodb error : ',errr))
}

module.exports= connnectmongodb;