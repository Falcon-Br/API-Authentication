import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/types";

//Define o esquema do usuário no Banco de Dados
const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String
  }
});

const User = mongoose.model<User>("User", UserSchema);

export default User;
