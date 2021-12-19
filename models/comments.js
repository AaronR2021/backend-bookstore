var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var articleSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    bookId:{
        type:Schema.Types.ObjectId,
        ref:'Article'
    }
}, { timestamps: true })

module.exports=mongoose.model("Comment",articleSchema);
