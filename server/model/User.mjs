import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  imageurl: String

});

 const User = mongoose.model('Users', UserSchema);

export default User;