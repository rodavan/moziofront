import React from "react";
import SearchCard from "./components/SearchCard";
import "./App.css";

function App() {
  return (
    <div className="w-full h-full">
      <div className="!font-inter !font-medium !text-sm w-full h-full">
        <div className="flex justify-center items-center w-full h-full">
          <SearchCard />
        </div>
      </div>
      <div className="back-gradient w-full h-full flex justify-center items-center">
        <div className="w-[60%] h-[57%]"></div>
      </div>
    </div>
  );
}

export default App;
