type TileProps = {
    date: string;
    message: string;
  };
  
  const Tile = ({ date, message }: TileProps) => (
    <div 
    
    // className="bg-white p-6 m-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
    className="bg-gradient-to-r from-[#6d41e2] to-[#ce7887] text-white p-6 m-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
      {/* <div className="font-semibold text-lg text-gray-800 break-words">{message}</div> */}
      <div className="font-semibold text-lg break-words">{message}</div>
      {/* <div className="text-sm text-gray-500 mt-2">{date}</div> */}
      <div className="text-sm mt-2">{date}</div>
    </div>
  );
  
  export default Tile;
  