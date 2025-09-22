import { model, Schema } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    description: { type: String, maxlength: 200 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

TagSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
});

export const TagModel = model("Tag", TagSchema);
