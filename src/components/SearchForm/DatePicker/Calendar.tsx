import React, { useState } from "react";
import CalendarNavigation from "./CalendarNavigation";
import { DATE_NAME, daysInMonth, firstDayOfMonth } from "./utils";

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate);

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const days = daysInMonth(month, year);
  const firstDay = firstDayOfMonth(month, year);
  const prevDays = daysInMonth(month - 1, year);
  let afterDays = 1;
  let day = 1;
  const weeks = [];

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        week.push(
          <div
            key={`empty-${j}`}
            className="w-[20px] text-center text-[#E5E7EB]"
          >
            {prevDays - (firstDay - j) + 1}
          </div>
        );
      } else if (day > days) {
        week.push(
          <div
            key={`empty-${j}`}
            className="w-[20px] text-center text-[#E5E7EB]"
          >
            {afterDays++}
          </div>
        );
      } else {
        let curDay = day;
        week.push(
          <div
            key={`day-${day}`}
            className={`rounded-full w-[20px] text-center hover:bg-[#C7D1F4] cursor-pointer ${
              day === selectedDate.getDate() &&
              month === selectedDate.getMonth() &&
              year === selectedDate.getFullYear()
                ? "bg-[#C7D1F4]"
                : ""
            }`}
            onClick={() => onDateChange(new Date(year, month, curDay))}
          >
            {day}
          </div>
        );
        day++;
      }
    }

    weeks.push(
      <div
        key={`week-${i}`}
        className="w-[200px] flex justify-between items-center"
      >
        {week}
      </div>
    );
  }

  return (
    <div className="">
      <CalendarNavigation
        currentMonth={currentMonth}
        onCurrentMonthChange={(newMonth) => setCurrentMonth(newMonth)}
      />
      <div className="w-[200px] mx-2.5 my-1">
        <div className="w-[200px] flex justify-between items-center">
          {DATE_NAME.map((day) => (
            <div
              className="w-[18px] text-center font-bold text-sm"
              key={day}
            >
              {day}
            </div>
          ))}
        </div>
        {weeks}
      </div>
    </div>
  );
};

export default Calendar;
