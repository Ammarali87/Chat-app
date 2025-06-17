import Message from "../models/Message.js"
import upload from "../middleware/upload.js"
import {io , userSocketMap} from "../server.js"
import User from "../models/User.js"; 

//  ما تلخبط بين  مكان  USER._ID userId
//    { بدون  { userId}  it's one not many data to {}
// export const getUsersForSidebar= async (req,res) => {
//     try {
//         const userId = req.user._id
//         const filteredUsers = await find({_id:{$nq:userId}}).select("-password")      
           
//         const unseenMessages = {};
//         const promises = filteredUsers.map(async (user) => {
//             const messages = await Message.find({senderId:user._id,
//         receverId:userId ,seen:false})
//         if(messages.length > 0 ){
//             unseenMessages[user._id ] = messages.length
//         }
//         })
//       await Promise.all(promises)
//       res.json({message:"success" , users:filteredUsers,unseenMessages})
//     } catch (error) {
//         console.error(error.message);
//       res.json({message:"faild" , error: error.message})
//     }
// }



export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        // Changed from find() to User.find()
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");
        
        const unseenMessages = {};
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({
                senderId: user._id,
                receiverId: userId,  // Fixed typo from receverId to receiverId
                seen: false
            });
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        });

        await Promise.all(promises);
        res.json({
            message: "success",
            users: filteredUsers,
            unseenMessages
        });
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error);
        res.status(500).json({ 
            message: "failed",
            error: error.message 
        });
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

// export const markMessageAsSeen = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const userId = req.user._id;  // optionall

//         const message = await Message.findById(id);
        
//         // Validate message exists
//         if (!message) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Message not found" 
//             });
//         }

//         // Validate user is the receiver
//         if (message.receiverId.toString() !== userId.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "Not authorized to mark this message" 
//             });
//         }

//         const updatedMessage = await Message.findByIdAndUpdate(
//             id, 
//             {seen: true}, 
//             {new: true}
//         );

//         res.status(200).json({
//             success: true,
//             message: "Message marked as seen",
//             data: updatedMessage
//         });

//     } catch (error) {
//         console.error("Error in markMessageAsSeen:", error);
//         res.status(500).json({
//             success: false, 
//             message: "Failed to mark message as seen",
//             error: error.message
//         });
//     }
// }

export const sendMessage  = async (req,res) => {
    try {
      const {text , image} = req.body ; 
     const receiverId = req.params.id;  
      const senderId = req.user._id 
     
      let imageUrl ;
      if(image){
        const uploadRes = await upload.uploader.upload(image)
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

