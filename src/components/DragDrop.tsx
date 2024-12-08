import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import AddTileForm from "./AddTileForm";
import Header from "./Header";

type Message = Record<"date" | "message", string>;

type YearGroup = {
  year: string;
  entries: Message[];
};

const input: Message[] = [
  { date: "2021-06-21", message: "message D" },
  { date: "2020-06-18", message: "message A" },
  { date: "2021-06-20", message: "message C" },
  { date: "2020-06-19", message: "message B" },
];

const DragDrop = () => {
  const [tiles, setTiles] = useState<Message[]>(input);
  const [newTile, setNewTile] = useState<YearGroup[]>([]);
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [draggedTile, setDraggedTile] = useState<{
    year: string;
    index: number;
  } | null>(null);

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const handleDragStart = (
    e: React.DragEvent,
    year: string,
    tileIndex: number
  ) => {
    e.dataTransfer.setData("draggedIndex", tileIndex.toString());
    e.dataTransfer.setData("draggedYear", year);
    setDraggedTile({ year, index: tileIndex });
  };

  

  const handleDragEnd = () => {
    // Reset draggedTile to make the card visible if not dropped
    
    setDraggedTile(null);
  };  
const handleDrop = (e: React.DragEvent, targetIndex: number, year: string) => {
    e.preventDefault();  // Prevent the default behavior to allow drop
    
    // Get the dragged tile index and year from dataTransfer
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const draggedYear = e.dataTransfer.getData("draggedYear");
  
    // Ensure both the dragged tile and target tile are in the same year
    if (draggedYear !== year) return;
  
    const updatedNewTile = [...newTile];
  
    // Find the year group
    const yearGroup = updatedNewTile.find((group) => group.year === year);
    
    if (yearGroup) {
      // Get the dragged and target tiles
      const draggedTile = yearGroup.entries[draggedIndex];
      const targetTile = yearGroup.entries[targetIndex];
  
      // Swap the dragged tile with the target tile
      yearGroup.entries[draggedIndex] = targetTile;
      yearGroup.entries[targetIndex] = draggedTile;
  
      // Update the state with the new order
      setNewTile(updatedNewTile);
    }
  
    // Reset draggedTile state after drop
    setDraggedTile(null);
  };
  
   //Sort Functionality
   const sortTiles = () => {
    const sortedTiles = [...tiles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() 
    );
    setTiles(sortedTiles);
    // setIsSorted(true);
  };

  //Initial Order Button
  const resetOrder = () => {
    // setTiles(input);

    const originalTiles = [...input]
    // Identify newly added tiles by filtering out those in `input`
    const newTiles = tiles.filter(
        (tile) => !input.some((item) => item.date === tile.date && item.message === tile.message)
    );

    // Combine the reordered original tiles and the new tiles
    setTiles([...originalTiles, ...newTiles]);
    // setIsSorted(false);
  };

  const addTile = (date: string, message: string) => {
    const newEntry = { date, message };
    setTiles([...tiles, newEntry]);
  };

  useEffect(() => {
    const result = tiles.reduce<YearGroup[]>((acc, item) => {
      const year = item.date.split("-")[0]; // Extract the year
      const yearIndex = acc.findIndex((group) => group.year === year); // Check if the year exists in acc

      if (yearIndex !== -1) {
        // If the year exists, add the item (date and message) to the group's entries
        acc[yearIndex].entries.push({ date: item.date, message: item.message });
      } else {
        // If the year doesn't exist, add a new group
        acc.push({
          year,
          entries: [{ date: item.date, message: item.message }],
        });
      }
      return acc;
    }, []);
    setNewTile(result);
  }, [tiles]);

  return (
    <div>
    <div>
        <Header resetOrder={resetOrder} sortTiles={sortTiles} />
      </div>
   
    <div className="">
      
      
      <div className="container mx-auto px-6 md:px-4 py-2">
      <div className="flex justify-end gap-4 p-4">
      
      <button
        onClick={handleModalOpen}
        // className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        // className="bg-gradient-to-r from-[#ce7887] text-base to-[#6d41e2] text-white px-4 py-2 rounded hover:bg-pink-600"
        // className="bg-gradient-to-r from-[#ce7887] text-base to-[#6d41e2] text-white px-4 py-2 rounded hover:bg-pink-600"
         className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white  px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
      >
        Add New Tile
      </button>

      </div>
        <div>
        <AddTileForm addTile={addTile} isOpen={isModalOpen} isClose={handleModalClose}/>
        </div>

        <div className="mt-6">
          {newTile.sort((a,b)=> new Date(b.year).getFullYear() - new Date(a.year).getFullYear()).map((group, yearIndex) => (
            <div key={yearIndex} className="mb-8">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#be4b5e] to-[#1f0c51] text-2xl font-medium ml-6 ">{`Year ${group.year}`}</h2>
             
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                {group.entries.map((tile, tileIndex) => {
                  const isDragged =
                  draggedTile?.year === group.year &&
                  draggedTile?.index === tileIndex;
                  return (
                  <div
                    key={tileIndex}
                    draggable={true}
                    onDragStart={(e) => {
                    handleDragStart(e,group.year,tileIndex)
                    }}

                    // onDragEnter={(e) => handleDragEnter(e, tileIndex, group.year)} 
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, tileIndex, group.year)}
                    onDragOver={(e) => e.preventDefault()}
                    className={`rounded-lg p-2
                      ${isDragged ? "opacity-20" : "opacity-100"}
                      transition-opacity duration-200 ease-in-out cursor-move 
                      hover:scale-105 active:scale-95 
                      
                      `}
                      // onTouchStart={(e) => handleTouchStart(e, group.year, tileIndex)}
                      // onTouchMove={handleTouchMove}
                      // onTouchEnd={(e) => handleTouchEnd(e, tileIndex, group.year)}
    
  //                     onTouchStart={(e) => handleDragStart(e, group.year, tileIndex)} // Touch Drag Start
  // onTouchEnd={handleDragEnd} // Touch Drag End
  // onTouchMove={handleTouchMove} // Prevent scrolling during drag
                  >
                    <Tile date={tile.date} message={tile.message} />
                  </div>
                )})}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default DragDrop;
