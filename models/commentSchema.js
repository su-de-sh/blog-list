const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  blog_id: String,
});

commentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// commentSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
