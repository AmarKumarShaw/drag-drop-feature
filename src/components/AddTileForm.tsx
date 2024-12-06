import React, { useState } from "react";

type AddTileFormProps = {
  addTile: (date: string, message: string) => void;
  isOpen:boolean;
  isClose:()=> void;

  
};

const AddTileForm = ({ addTile,isOpen,isClose }: AddTileFormProps) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 


  //Modal changes functions


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && message) {
      addTile(date, message);
      isClose()
      setDate("");
      setMessage("");
    }
  };

  return (

     
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg xl:w-1/2 lg:w-2/3 sm:w-5/6  ">
            <h2 className="text-xl font-semibold mb-4">Add New Tile</h2>
            <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-4 bg-gray-100 rounded shadow-md"
      // className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-xl max-w-lg mx-auto border border-gray-200"
    >
      <div className="">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Select Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          // className="mb-2 p-2 border"
          className="mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-500 focus:outline-none transition duration-200"
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        placeholder="Type your Message..."
        // className="mb-2 p-2 border w-full"
        className="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-500 focus:outline-none transition duration-200"
      />
      <button
        onClick={isClose}
        className="bg-gray-500 text-white px-4 py-2 mr-5 rounded hover:bg-white hover:border hover:border-gray-500 hover:text-gray-500"
      >
        Close 
      </button>
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-white hover:border hover:border-pink-500 hover:text-pink-500"
      >
        Add Tile
      </button>
      
    </form>
          </div>
        </div>
 
        </div>

    
  );
};

export default AddTileForm;
