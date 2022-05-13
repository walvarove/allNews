import { next } from "inversify-express-utils";
import { Schema, model } from "mongoose";
import { UserRef, NoveltyRef } from "../schemas.references";
import { User } from "../users/dao";
import { INovelty, NoveltyStatus } from "./model";

// Create the schema
const NoveltySchema = new Schema<INovelty>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: new Date()
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: UserRef,
      required: true,
    },
    archiveDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(NoveltyStatus),
      default: NoveltyStatus.PUBLISHED,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Hooks

NoveltySchema.post("save", async (novelty: INovelty) => {
  const authorId = novelty.author;
  await User.findByIdAndUpdate({ _id: authorId }, {
      $addToSet: {
        novelties: novelty.id
      }
  });
});


export const Novelty = model<INovelty>(NoveltyRef, NoveltySchema);





