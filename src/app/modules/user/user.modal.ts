import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['seller', 'manager'],
      default: 'seller',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

userSchema.post('save', function (doc, next) {
  doc.set('password', undefined);
  next();
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isUserPasswordMatch = async function (
  userPassword: string,
  hashedpassword: string,
) {
  return await bcrypt.compare(userPassword, hashedpassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
