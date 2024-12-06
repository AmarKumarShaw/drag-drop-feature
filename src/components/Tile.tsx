type TileProps = {
    date: string;
    message: string;
  };
  
  const Tile = ({ date, message }: TileProps) => (
    <div 
    // className="bg-white p-4 m-2 rounded shadow-lg"
    className="bg-white p-6 m-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
      <div className="font-semibold text-lg text-gray-800 break-words">{message}</div>
      <div className="text-sm text-gray-500 mt-2">{date}</div>
    </div>
  );
  
  export default Tile;
  