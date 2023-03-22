import React, { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar";

interface DatePickerProps {
  date: Date;
  onChange: (newDate: Date) => void;
  invalid?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onChange,
  invalid = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    onChange(date);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-[96px]"
    >
      <label
        htmlFor="date"
        className="block text-xs font-medium text-[#374151]"
      >
        Date
      </label>
      <input
        type="text"
        id="date"
        name="date"
        value={`${selectedDate.getFullYear()}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getDate()}`}
        onClick={() => setShowDatePicker(true)}
        readOnly
        className={`w-full py-2 px-[8.5px] border border-gray-300 bg-white rounded-md focus:outline-none ${
          invalid ? "!border-[#FF0000]" : ""
        }`}
      />
      {showDatePicker && (
        <div className="absolute top-[62px] rounded-lg border border-[#C7D1F4] p-1.5 shadow-lg bg-white">
          <Calendar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <div className="absolute top-[-6px] left-[14px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#C7D1F4]"></div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
