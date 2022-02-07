import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Books: [{ type: mongoose.Schema.ObjectId, ref: "Book" }],
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
