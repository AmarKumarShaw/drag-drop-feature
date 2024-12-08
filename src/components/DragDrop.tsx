import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import AddTileForm from "./AddTileForm";
import Header from "./Header";

type Message = Record<"date" | "message", string>;

type YearGroup = {
  year: string;
  entries: Message[];
};

type DraggedTile = {
  year: string;
  index: number;
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [draggedTile, setDraggedTile] = useState<DraggedTile | null>(null);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

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
    setDraggedTile(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    targetIndex: number,
    year: string
  ) => {
    e.preventDefault();

    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const draggedYear = e.dataTransfer.getData("draggedYear");

    if (draggedYear !== year) return;

    const updatedNewTile = [...newTile];
    const yearGroup = updatedNewTile.find((group) => group.year === year);

    if (yearGroup) {
      const draggedTile = yearGroup.entries[draggedIndex];
      const targetTile = yearGroup.entries[targetIndex];

      yearGroup.entries[draggedIndex] = targetTile;
      yearGroup.entries[targetIndex] = draggedTile;

      setNewTile(updatedNewTile);
    }
    setDraggedTile(null);
  };

  const sortTiles = () => {
    const sortedTiles = [...tiles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setTiles(sortedTiles);
  };

  const resetOrder = () => {
    const originalTiles = [...input];
    const newTiles = tiles.filter(
      (tile) =>
        !input.some(
          (item) => item.date === tile.date && item.message === tile.message
        )
    );
    setTiles([...originalTiles, ...newTiles]);
  };

  const addTile = (date: string, message: string) => {
    const newEntry = { date, message };
    setTiles([...tiles, newEntry]);
  };

  const groupTilesByYear = (tiles: Message[]): YearGroup[] => {
    return tiles.reduce<YearGroup[]>((acc, item) => {
      const year = item.date.split("-")[0];
      const yearGroup = acc.find((group) => group.year === year);

      if (yearGroup) {
        yearGroup.entries.push({ date: item.date, message: item.message });
      } else {
        acc.push({
          year,
          entries: [{ date: item.date, message: item.message }],
        });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    if (tiles.length) {
      const groupedTiles = groupTilesByYear(tiles);
      setNewTile(groupedTiles);
    }
  }, [tiles]);

  return (
    <div>
      <Header resetOrder={resetOrder} sortTiles={sortTiles} />
      <div className="container mx-auto px-6 md:px-4 py-2">
        <div className="flex justify-end gap-4 p-4">
          <button
            onClick={handleModalOpen}
            className="bg-gradient-to-r from-[#ce7887] to-[#6d41e2] border border-white px-4 py-2 text-white rounded transition duration-200 hover:scale-105"
          >
            Add New Tile
          </button>
        </div>
        <AddTileForm
          addTile={addTile}
          isOpen={isModalOpen}
          isClose={handleModalClose}
        />

        <div className="mt-6">
          {newTile
            .sort(
              (a, b) =>
                new Date(b.year).getFullYear() - new Date(a.year).getFullYear()
            )
            .map((group, yearIndex) => (
              <div key={yearIndex} className="mb-8">
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#be4b5e] to-[#1f0c51] text-2xl font-medium ml-6 ">{`Year ${group.year}`}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.entries.map((tile, tileIndex) => {
                    const isDragged =
                      draggedTile?.year === group.year &&
                      draggedTile?.index === tileIndex;
                    return (
                      <div
                        key={tileIndex}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, group.year, tileIndex)
                        }
                        onDragEnd={handleDragEnd}
                        onDrop={(e) => handleDrop(e, tileIndex, group.year)}
                        onDragOver={(e) => e.preventDefault()}
                        className={`rounded-lg p-2 transition-opacity duration-200 ease-in-out cursor-move hover:scale-105 active:scale-95 ${
                          isDragged ? "opacity-20" : "opacity-100"
                        }`}
                      >
                        <Tile date={tile.date} message={tile.message} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
