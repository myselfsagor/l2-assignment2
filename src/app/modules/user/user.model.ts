import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// create user schema

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, 'user id is required'] },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'password is required'] },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      maxlength: [20, 'first name max length 20'],
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
      maxlength: [20, 'last name max length 20'],
    },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: [String],
  address: {
    street: { type: String, required: [true, 'street is required'] },
    city: { type: String, required: [true, 'city is required'] },
    country: { type: String, required: [true, 'country is required'] },
  },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'product name is required'],
      },
      price: { type: Number, required: [true, 'price is required'] },
      quantity: { type: Number, required: [true, 'quantity is required'] },
    },
  ],
});

// hashing password field

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// create user model
const UserModel = model<TUser>('User', userSchema);

export default UserModel;
