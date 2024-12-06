import React, { useState } from "react";
import Tile from "./components/Tile";
import AddTileForm from "./components/AddTileForm";
import Header from "./components/Header"

type Message = Record<"date" | "message", string>;

const input: Message[] = [
  { date: "2021-06-21", message: "message D" },
  { date: "2020-06-18", message: "message A" },
  { date: "2021-06-20", message: "message C" },
  { date: "2020-06-19", message: "message B" },
];

const App = () => {
  const [tiles, setTiles] = useState<Message[]>(input);
  const [isSorted, setIsSorted] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false)

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)
 

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const newTiles = [...tiles];
    const draggedTile = newTiles.splice(draggedIndex, 1)[0];
    newTiles.splice(targetIndex, 0, draggedTile);
    setTiles(newTiles);
  };

  const sortTiles = () => {
    const sortedTiles = [...tiles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() 
    );
    setTiles(sortedTiles);
    setIsSorted(true);
  };


  //Initial Order Button
  const resetOrder = () => {
    setTiles(input);
    setIsSorted(false);
  };

  const addTile = (date: string, message: string) => {
    const newTile = { date, message };
    setTiles([...tiles, newTile]);
  };



  return (
   <div>
    <div>
      <Header/>
    </div>
    <div className="container mx-auto px-8 py-2">
      <header className="flex justify-end gap-4 p-4">
        <button
          onClick={resetOrder}
          className="bg-pink-500 px-4 py-2 text-white rounded hover:bg-pink-600"
        >
          Initial Order
        </button>
        <button
          onClick={sortTiles}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Sorted Order
        </button>
        <button
          onClick={handleModalOpen}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Add New Tile
        </button>
      </header>

      <div>
       <AddTileForm addTile={addTile} isOpen={isModalOpen} isClose={handleModalClose}/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {tiles.map((tile, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("draggedIndex", index.toString())}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
            className="cursor-move  rounded-lg p-4 bg-white 
                 transition-transform duration-300 ease-in-out 
                 hover:scale-105 
                 active:scale-95 "
          >
            <Tile date={tile.date} message={tile.message} />
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default App;
