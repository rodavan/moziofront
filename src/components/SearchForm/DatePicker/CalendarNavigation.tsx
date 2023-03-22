import React from "react";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";
import OptionType from "./types";
import Dropdown from "./Dropdown";

interface CalendarProps {
  currentMonth: Date;
  onCurrentMonthChange: (date: Date) => void;
}

const MONTH_OPTION: Array<OptionType> = [
  { data: "Jan", value: 0 },
  { data: "Feb", value: 1 },
  { data: "Mar", value: 2 },
  { data: "Apr", value: 3 },
  { data: "May", value: 4 },
  { data: "Jun", value: 5 },
  { data: "Jul", value: 6 },
  { data: "Aug", value: 7 },
  { data: "Sep", value: 8 },
  { data: "Oct", value: 9 },
  { data: "Nov", value: 10 },
  { data: "Dec", value: 11 },
];

const YEAR_OPTION: Array<OptionType> = [];
for (let i = 0, curYear = new Date().getFullYear(); i < 10; i++) {
  YEAR_OPTION.push({ data: (curYear + i).toString(), value: curYear + i });
}

const CalendarNavigation: React.FC<CalendarProps> = ({
  currentMonth,
  onCurrentMonthChange,
}) => {
  const handleMonthNavigation = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);

    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else if (direction === "next") {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }

    onCurrentMonthChange(newMonth);
  };

  return (
    <div className="mt-[17px] mx-[20.5px] flex justify-between">
      <button onClick={() => handleMonthNavigation("prev")}>
        <LeftIcon />
      </button>
      <div>
        <Dropdown
          options={MONTH_OPTION}
          cur={currentMonth
            .toLocaleString("default", { month: "long" })
            .slice(0, 3)}
          onChange={(val) => {
            const newMonth = new Date(currentMonth);
            newMonth.setMonth(val);
            onCurrentMonthChange(newMonth);
          }}
        />
        <Dropdown
          options={YEAR_OPTION}
          cur={currentMonth.getFullYear().toString()}
          onChange={(val) => {
            const newMonth = new Date(currentMonth);
            newMonth.setFullYear(val);
            onCurrentMonthChange(newMonth);
          }}
        />
      </div>
      <button onClick={() => handleMonthNavigation("next")}>
        <RightIcon />
      </button>
    </div>
  );
};

export default CalendarNavigation;
