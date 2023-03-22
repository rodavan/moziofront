import React, { useState, useEffect, useRef } from "react";
import OptionType from "./types";

interface DropdownProps {
  options: Array<OptionType>;
  cur: string;
  onChange: (newValue: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, cur, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-[54px] inline-block"
    >
      <div
        className="bg-[#C7D1F4] text-[#374151] py-[1px] flex justify-start px-1 border border-[#E5E7EB] rounded m-0.5 relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {cur}
        <div className="absolute bottom-[4px] right-[4px] w-0 h-0 border-l-[6px] border-l-transparent border-r-transparent border-b-[6px] border-b-[#374151]"></div>
      </div>
      {isOpen && (
        <div className="absolute top-[36px] rounded-lg border border-[#C7D1F4] bg-white p-1.5 shadow-lg">
          <ul>
            {options
              .filter((opt) => opt.data !== cur)
              .map((opt, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    onChange(opt.value);
                  }}
                  className="px-3 py-1 rounded-md hover:bg-[#C7D1F4] cursor-pointer"
                >
                  {opt.data}
                </li>
              ))}
            <div className="absolute top-[-7px] left-[7px] w-0 h-0 border-l-[6px] border-l-transparent border-r-8 border-r-transparent border-b-[6px] border-b-[#C7D1F4]"></div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
