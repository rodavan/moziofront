import React from "react";
// import Dropdown from "./SearchForm/Dropdown";
import DropdownCloseIcon from "./DropdownCloseIcon";
import Dropdown from "./SearchForm/Dropdown";
import PositionIcon from "./PositionIcon";
import AddIcon from "./AddIcon";
import { find } from "../utils/fetch";

interface LocationsProps {
  origin: string;
  destinations: Array<string>;
  onChangeDestinations: (changed: Array<string>) => void;
  onChangeOrigin: (changed: string) => void;
}

const Locations: React.FC<LocationsProps> = ({
  origin = "",
  destinations = [""],
  onChangeDestinations = (_) => _,
  onChangeOrigin = (_) => _,
}) => {
  return (
    <>
      <div className="flex items-center pl-[60px] mr-[46px] relative">
        <div className="flex-1">
          <Dropdown
            label="City of origin"
            fetchData={find}
            value={origin}
            onChange={onChangeOrigin}
          />
        </div>
        <div className="absolute left-0 top-7 mx-6 w-3 h-3 border rounded-xl border-[#374151]"></div>
        <div className="absolute left-[5px] top-10 mx-6 w-1 h-14 dotted-spaced"></div>
      </div>
      {destinations.map((dest, index) => (
        <div
          key={index}
          className="flex items-center pl-[60px] relative"
        >
          {index !== destinations.length - 1 ? (
            <div className="absolute left-0 top-7 mx-6 w-3 h-3 border rounded-xl border-[#374151]"></div>
          ) : (
            <div className="absolute left-0 top-7 mx-6">
              <PositionIcon />
            </div>
          )}

          {index !== destinations.length - 1 && (
            <div className="absolute left-[5px] top-10 mx-6 w-1 h-14 dotted-spaced"></div>
          )}
          <Dropdown
            className="flex-1"
            label="City of destination"
            fetchData={find}
            value={dest}
            onChange={(org) => {
              const newDest = [...destinations];
              newDest[index] = org;
              onChangeDestinations(newDest);
            }}
          />
          <div
            className={"mx-4"}
            onClick={() => {
              if (index === 0) {
                return;
              }
              const newDest = [...destinations];
              newDest.splice(index, 1);
              onChangeDestinations(newDest);
            }}
          >
            <DropdownCloseIcon />
          </div>
        </div>
      ))}
      <div
        className="text-[#7786D2] mt-1.5 cursor-pointer pl-[60px] relative"
        onClick={() => onChangeDestinations([...destinations, ""])}
      >
        <div className="absolute left-0 top-1 mx-6">
          <AddIcon />
        </div>
        Add destination
      </div>
    </>
  );
};

export default Locations;
