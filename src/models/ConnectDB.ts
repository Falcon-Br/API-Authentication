import 'dotenv/config';
import mongoose from "mongoose"

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const url_db = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.mwodoum.mongodb.net/`

function connectDB(){
    mongoose.connect(url_db).then(()=>{
        console.log("Bando de dados conectado!")
    }).catch((error)=>{
        console.log(error)
    })    
}

export default connectDB
