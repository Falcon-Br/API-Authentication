import mongoose, { Schema } from "mongoose";
import { Photo } from "../interfaces/types";

const PhotoSchema = new Schema<Photo>({

    name:{
        type: String,
        required: true
    }, 
    src:{
        type: String,
        required: true
    }
})

const Photo = mongoose.model<Photo>("Photo", PhotoSchema)

export default Photo