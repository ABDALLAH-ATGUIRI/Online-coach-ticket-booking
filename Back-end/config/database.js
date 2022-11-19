import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const pool = () =>{
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.on("connected",()=>{
    console.log("DB Connected...")
  })
}
export default { pool };
