import { Document } from 'mongoose';

interface User extends Document {
  name: string
  password: string
  email: String
  role: 'user' | 'admin'
}

interface Photo extends Document {
  name: string
  src: string
}

interface AuthPayload {
  userId: string;
  role: 'user' | 'admin';
}

export {User, Photo, AuthPayload}