import { Schema, model } from "mongoose";
import validator from "validator";
import { encrypt } from "../../helpers/auth.helper";
import { NoveltyRef, UserRef } from "../schemas.references";
import { IUser } from "./model";

// Create the schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      dropDups: true,
      index: true,
      sparse: true,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimum password length is 6 characters"],
    },
    novelties: [
      {
        type: Schema.Types.ObjectId,
        ref: NoveltyRef,
        required: false,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
  
  UserSchema.pre('save', async function(next) {
      this.password  = await encrypt(this.password)
      next();
  });

  UserSchema.pre('updateOne', async function(next) {
      this.password  = await encrypt(this.password)
      next();
  });

  
export const User = model<IUser>(UserRef, UserSchema);