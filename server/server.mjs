import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import User from './model/User.mjs'
import bcrypt from "bcrypt";
import Message from './model/Message.mjs';



import { Server } from "socket.io";


const app = express()


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DBURL).then((res)=>{console.log('connected to DB')}).catch(Err=>console.log('Not connected to DB'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})


const server = app.listen(process.env.PORT , () => {
  console.log('server is running')
})



//registration
app.post('/api/register',async(req,res)=>{
  try {
  const{name,email,password,imageurl}= req.body;

  const emailexists = await User.findOne({email});
 

  if(emailexists){
   return  res.status(299).json({message:'Email Already Exists'});
    
  }

  const hashedpass = bcrypt.hashSync(password, 12);

  const user =  new User({
    name,email,password:hashedpass,imageurl
  })

  await user.save();


  res.json(user);


  } catch (error) {
    res.status(299).json({message:'UNEXPECTED ERROR'});
  }
  

})

//login
app.post('/api/login',async(req,res)=>{
  try {
    const {email,password}= req.body;

  const user =await User.findOne({email})
    
  if(!user){
   return  res.status(299).json({message:'Email not found'});
    
  }

  const passwordchecking = bcrypt.compareSync(password, user.password); 

  if(!passwordchecking){
   return res.status(299).json({message:'Incorrect Password'});

  }

  res.json(user);




  } catch (error) {
    res.status(299).json({message:'UNEXPECTED ERROR'});
    
  }
  
})

//get Users


app.get('/api/getusers/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const data = await User.find();
    const filteredData = data.filter(user => user._id.toString() !== userid);
    console.log(userid + ' is id');
    res.json(filteredData);
  } catch (error) {
    res.status(299).json({ message: 'Error in Getting Users' });
  }
});


//get User Info

app.post('/api/getuserinfo',async(req,res)=>{
  
  try {
    const {userid} = req.body;
    const user = await User.findById(userid)
    res.json(user);
  } catch (error) {
    res.status(299).json({message: 'Error in Getting user Info'})
  }
})


//Add message

app.post('/api/addmessage', async(req,res)=>{
  try {
    const {from,to,message} = req.body;
    const response = new Message({
        message : {
          text: message
        },
        users: [from,to],
        sender: from
    })

    await response.save();

    res.json({msg : 'sent successfully'})

  } catch (error) {
    res.status(299).json({msg: 'not send'})
  }
})

//get message


app.post('/api/getmessages',async(req,res)=>{
try {
  const {from,to} = req.body;
  const messages = await Message.find({
    users: {
      $all : [from,to]
    }
  })
  res.status(200).json(messages)
} catch (error) {
  res.status(299).json({msg: 'cannot get messages'})
  
}

})

//socket

const io = new Server(server, { 
 
  cors: true

});

const OnlineUsers = new Map();

io.on("connection",(socket)=>{
  console.log('connected user');


  socket.on('adduser',(userID)=>{
    OnlineUsers.set(userID,socket.id);
    console.log('User added '+userID );
  })

  socket.on('sendmessage',({from,to,message})=>{
    const usersocket = OnlineUsers.get(to);
    if(usersocket){
      socket.to(usersocket).emit('recievemessage',{from,message});
      
    }
  })

  socket.on('disconnect', () => {
    const userID = Array.from(OnlineUsers.entries()).find(([key, value]) => value === socket.id);
    if (userID) {
      OnlineUsers.delete(userID[0]);

    }})

  


})








