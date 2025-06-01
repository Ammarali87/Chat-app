import assets, { imagesDummyData } from '../../public/assets';

export default function LeftSidebar({ selectedUser, setSlectedUser }) {
  return (
    selectedUser && (
      <div
        className={`w-full relative overflow-y-scroll bg-[#8185B2]/10 text-white ${
          selectedUser ? 'max-md:hidden' : ''
        }`}
      >
        {/* Top User Info */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="rounded-full aspect-[1/1] w-20"
          />
          <h1 className="text-xl font-medium mx-auto flex items-center px-10 gap-2">
            <p className="w-2 h-2 rounded-full bg-green-400"></p>
            {selectedUser?.name}
          </h1>
          <p className="px-10 mx-auto">{selectedUser?.bio}</p>
        </div>

        <hr className="my-4 border-[#ffffff50]" />

        {/* Media Section */}
        <div className="text-xs px-4">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-2 opacity-80">
            {imagesDummyData.map((image, index) => (
              <div
                key={index}
                onClick={() => window.open(image)}
                className="cursor-pointer rounded"
              >
                <img src={image} className="rounded" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="absolute left-1/2 bottom-5 -translate-x-1/2 px-4 py-2 rounded text-sm text-white bg-gradient-to-r from-purple-400 to-violet-600 hover:opacity-80"
        >
          Logout
        </button>
      </div>
    )
  );
}






// import assets, { imagesDummyData } from '../../public/assets'
// //  text-xs
//   //  ${selectedUser?"max-md:hidden":""}` }>


//   export default function LeftSidebar({selectedUser,setSlectedUser}) {
//   return (  selectedUser && (

//     <div className={`w-full relative overflow-y-scroll bg-[#8185B2]/10  text white
//      ${selectedUser?"max-md:hidden":""}` }>
//       <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
//         <img src={selectedUser?.profilePic  || assets.avatar_icon} alt=""
//         className=' rounded-full aspect-[1/1] w-20' />
//         <h1 className='text-xl font-medium mx-auto flex items-center px-10 
//         gap-2'>
//           <p className='w-2 h-2 rounded-full bg-green-400'></p>
//           {selectedUser?.name}
//         </h1>
//           <p className='px-10 mx-auto '>{selectedUser?.bio}</p>
      
//       </div>
//          <hr className="my-4 border-[#ffffffff50] " />

//         <div className="text-xs px-4">
//           <p> Media</p>    
//           <div className="mt-2  max-h-[200px]  overflow-y-scroll
//            grid grid-cols-2 gap-2 opacity-80">
//            {imagesDummyData.map((image,index)=>
//               <div key={index} onClick={()=> window.open(url)} 
//               className="cursor-pointer rounded ">
//                <img src={url} className='rounded' alt="" />
//               </div>            
//           )}
//           </div>
//         </div>
  
//       <button className='absolute left-1/2 bottom-5 transform 
//       bg-gradient-to-r  form-purple-400 to-violet-600 '>
      
//         Logout
//       </button>
//     </div>
    
//        ))
// }
