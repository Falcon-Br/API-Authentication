import { Document } from 'mongoose';

interface User extends Document {
  name: string
  password: string
  email: String
  role: 'user' | 'admin'
}

interface AuthPayload {
  userId: string;
  role: 'user' | 'admin';
}

export {User, AuthPayload}