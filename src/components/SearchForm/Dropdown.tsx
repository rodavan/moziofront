import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../../hooks/useDebounce";
import CloseIcon from "./CloseIcon";

interface DropdownProps {
  fetchData: (current: string) => Promise<Array<string>>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  fetchData,
  label,
  onChange,
  value = "",
  className,
}) => {
  const [data, setData] = useState<Array<string>>([]);
  const [filter, setFilter] = useState<string>(value);
  const debouncedFilter = useDebounce(filter, 200);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFilter(value);
  }, [value]);

  useEffect(() => {
    if (!debouncedFilter) return;
    setIsLoading(true);
    fetchData(debouncedFilter)
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
    setIsError(false);
  }, [fetchData, debouncedFilter]);

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

  let errLabel: string = "";
  if (isError) {
    errLabel = "Oops! Failed to search with this keyword.";
  }
  if (!filter) {
    errLabel = "You must choose the " + label.toLocaleLowerCase();
  }
  return (
    <div
      className={className}
      ref={wrapperRef}
    >
      <label
        htmlFor="date"
        className="block text-xs font-medium text-[#374151]"
      >
        {label}
      </label>
      <div className="relative">
        <div>
          <input
            type="text"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              onChange(e.target.value);
            }}
            onClick={() => setIsOpen(true)}
            className={`font block appearance-none w-full bg-white border border-[#E5E7EB] text-[#374151] py-2 pl-2.5 pr-[46px] rounded-md leading-4 focus:outline-none ${
              (!filter || isError) && "border-[#FF0000]"
            } ${isError && "text-[#FF0000]"}`}
          />
          {filter && isOpen && (
            <div
              className="absolute bottom-1 top-1 right-3"
              onClick={() => setFilter("")}
            >
              <CloseIcon />
            </div>
          )}
        </div>
        {isOpen && filter && !isError && (
          <div className="absolute z-10 w-full top-[41px] rounded-lg border border-[#C7D1F4] bg-white p-1.5 shadow-lg">
            <ul>
              {!isLoading &&
                data.map((txt, index) => (
                  <li
                    key={index}
                    className="p-1.5 text-[#374151] rounded-md hover:bg-[#C7D1F4]"
                    onClick={() => {
                      setFilter(txt);
                      onChange(txt);
                      setIsOpen(false);
                    }}
                  >
                    {txt}
                  </li>
                ))}
              {isLoading &&
                new Array(7).fill(0).map((_, index) => (
                  <li
                    key={index}
                    className="p-1.5 bg-[#E5E7EB] rounded w-52 h-5 mb-1.5"
                  ></li>
                ))}
              <div className="absolute top-[-6px] left-[14px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#C7D1F4]"></div>
            </ul>
          </div>
        )}
      </div>
      <label
        htmlFor="date"
        className="block text-xs font-medium text-[#FF0000] mb-1"
      >
        &nbsp;{errLabel}
      </label>
    </div>
  );
};

export default Dropdown;
