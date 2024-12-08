// import React, { useState,useRef,useEffect } from "react";

// type AddTileFormProps = {
//   addTile: (date: string, message: string) => void;
//   isOpen:boolean;
//   isClose:()=> void;
// };

// const AddTileForm = ({ addTile,isOpen,isClose }: AddTileFormProps) => {
//   const [date, setDate] = useState("");
//   const [message, setMessage] = useState("");
//   const [error,setError] = useState("");


//   const validateMessage = (text:string):boolean =>{
//     if(!text.trim()){
//       setError("Message cannot be empty");
//       return false;
//     }else if(text.length > 100){
//       setError("Message cannot exceed 100 characters")
//       return false;
//     }
//     setError("")
//     return true;
//   }

//   const handleMessageChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
//     const text = e.target.value;
//     setMessage(text)
//     validateMessage(text)

//   }
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (date && validateMessage(message)) {
//       addTile(date, message);
//       isClose()
//       setDate("");
//       setMessage("");
//     }
//   };

//   const handleClose = (e:React.FormEvent) =>{
//     e.preventDefault();
//     isClose()
//       setDate("");
//       setMessage("");
//   }

//   const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

//    useEffect(() => {
//     if (isOpen && messageInputRef.current) {
//       messageInputRef.current.focus();
//     }
//   }, [isOpen]);

//   return (

     
//         isOpen && (<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg xl:w-1/2 lg:w-2/3 sm:w-5/6  ">
//           <h2 className="text-xl font-semibold mb-4">Add New Tile</h2>
//           <form
//     onSubmit={handleSubmit}
//     className="w-full mx-auto p-4 bg-gray-100 rounded shadow-md"
    
//   >
//     <div className="">
//       <label
//         htmlFor="date"
//         className="block text-sm font-medium text-gray-600 mb-1"
//       >
//         Select Date
//       </label>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         required
//         className="mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition duration-200"
//       />
//     </div>
//     <textarea
//       value={message}
//       onChange={handleMessageChange}
//       rows={4}
//       placeholder="Type your Message..."
//       ref={messageInputRef}
//       className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 focus:outline-none transition duration-200"
      
//     />

//     {error && <p className="text-red-500 text-md font-medium my-2">{error}</p>}
//     <button
//       onClick={handleClose}
//       // className="bg-gray-500 text-white px-4 py-2 mr-5 rounded hover:bg-white hover:border hover:border-gray-500 hover:text-gray-500"
//        className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white px-4 py-2 mr-5 text-white rounded transition duration-200 hover:scale-105"
//     >
//       Close 
//     </button>
//     <button
//       type="submit"
//       // className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-white hover:border hover:border-pink-500 hover:text-pink-500"
//        className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
//     >
//       Add Tile
//     </button>
    
//   </form>
//         </div>
//       </div>

//       </div>)

    
//   );
// };

// export default AddTileForm;


import React, { useState, useRef, useEffect } from "react";

type AddTileFormProps = {
  addTile: (date: string, message: string) => void;
  isOpen: boolean;
  isClose: () => void;
};

const AddTileForm = ({ addTile, isOpen, isClose }: AddTileFormProps) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateMessage = (text: string): boolean => {
    if (!text.trim()) {
      setError("Message cannot be empty");
      return false;
    } else if (text.length > 100) {
      setError("Message cannot exceed 100 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);
    validateMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && validateMessage(message)) {
      addTile(date, message);
      isClose();
      setDate("");
      setMessage("");
    }
  };

  const handleClose = () => {
    isClose();
    setDate("");
    setMessage("");
  };

  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gradient-to-r to-[#6d41e2] from-[#ce7887] sm:m-2 m-4 p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Tile</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition duration-200"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  rows={4}
                  placeholder="Type your message..."
                  ref={messageInputRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition duration-200"
                />
                {error && <p className="text-red-500 text-sm font-medium mt-2">{error}</p>}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
                >
                  Add Tile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTileForm;

