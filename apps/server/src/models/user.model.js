import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    refreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if(!this.isModified("password")) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export const User = mongoose.model("User", userSchema);
