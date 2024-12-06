import React, { useState } from "react";

type AddTileFormProps = {
  addTile: (date: string, message: string) => void;
};

const AddTileForm = ({ addTile }: AddTileFormProps) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && message) {
      addTile(date, message);
      setDate("");
      setMessage("");
    }
  };

  return (
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
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-white hover:border hover:border-pink-500 hover:text-pink-500"
      >
        Add Tile
      </button>
    </form>
  );
};

export default AddTileForm;
