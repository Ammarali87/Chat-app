import Message from "../models/Message"
import {uploader} from "../middleware/upload"
import {io , userSocketMap} from "../server"

//  ما تلخبط بين  مكان  USER._ID userId
//    { بدون  { userId}  it's one not many data to {}
export const getUsersForSidebar= async (req,res) => {
    try {
        const userId = req.user._id
        const filteredUsers = await find({_id:{$nq:userId}}).select("-password")      
           
        const unseenMessages = {};
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId:user._id,
        receverId:userId ,seen:false})
        if(messages.length > 0 ){
            unseenMessages[user._id ] = messages.length
        }
        })
      await Promise.all(promises)
      res.json({message:"success" , users:filteredUsers,unseenMessages})
    } catch (error) {
        console.error(error.message);
      res.json({message:"faild" , error: error.message})
    }
}

    // get all messages for selected user
export const getMessages = async (req,res) => {
    try {

      const {id:selectedUserId} = req.params; 
      const myId = req.user._id 
    //   $or:[]  contain {},{}
  const messages = await Message.find({
    $or :[ 
   {senderId: myId, receiverId:selectedUserId },
   {senderId:selectedUserId , receiverId:myId }
      ] 
    })

      res.json({message:"success" ,messages})
    } catch (error) {
        console.error(error.message);
      res.json({message:"faild" , error: error.message})
    }
}


  // get all messages for selected user
export const markMessageAsSeen  = async (req,res) => {
    try {
          const {id} = req.params;
          await Message.findByIdAndUpdate(id,{seen:true})
            res.json({success:"true"})

    } catch (error) {
        console.error(error.message);
      res.json({message:"faild" , error: error.message})
    }
}


export const sendMessage  = async (req,res) => {
    try {
      const {text , image} = req.body ; 
     const receiverId = req.params.id;  
      const senderId = req.user._id 
     
      let imageUrl ;
      if(image){
        const uploadRes = await uploader.upload(image)
      imageUrl = uploadRes.secure_url
    }
    const newMessage = await Message.create({
      senderId,receiverId,text,image:imageUrl
    })

    const receiverSocketId = userSocketMap[receiverId];
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }
            res.json({success:"true",newMessage})

    } catch (error) {
        console.error(error.message);
      res.json({message:"faild" , error: error.message})
    }
}

