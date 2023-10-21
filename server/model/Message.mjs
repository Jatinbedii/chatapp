import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  message : {
    text: String,
  },
  users: Array,
 
  sender : {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
  }},
  {timestamps : true}
  );

 const Message = mongoose.model('Messages', MessageSchema);

export default Message;