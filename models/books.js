var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: String,
    price: Number,
    author: String,
    comments:[{
      type:Schema.Types.ObjectId,
      ref:"Comment"
    }]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Article", articleSchema);
