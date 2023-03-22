import React, { useState, useEffect } from "react";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";
import FormButton from "./FormButton";

interface PassengersProps {
  value: number;
  onChange?: (passenger: number) => void;
}

const Passengers: React.FC<PassengersProps> = ({
  value,
  onChange = (passenger) => passenger,
}) => {
  const [passenger, setPassenger] = useState(value);

  useEffect(() => {
    setPassenger(value);
  }, [value]);

  const onIncrease = () => {
    setPassenger((prev) => prev + 1);
    onChange(passenger + 1);
  };
  const onDecrease = () => {
    setPassenger((prev) => prev - 1);
    onChange(passenger - 1);
  };

  return (
    <div>
      <label
        htmlFor="passengers"
        className="block text-xs font-medium text-[#374151]"
      >
        Passengers
      </label>
      <div
        data-testid="passengers-container"
        className={`${"w-[90px] h-[38px] rounded-md border border-[#E5E7EB] flex justify-around items-center"} ${
          !passenger && "border-[#FF0000]"
        }`}
      >
        <FormButton
          data-testid="increase-passengers"
          buttonType="normal"
          onClick={onIncrease}
        >
          <PlusIcon />
        </FormButton>
        <span data-testid="passenger-count">{passenger}</span>
        <FormButton
          data-testid="decrease-passengers"
          buttonType="normal"
          onClick={onDecrease}
          disabled={!passenger}
        >
          <MinusIcon />
        </FormButton>
      </div>
    </div>
  );
};

export default Passengers;
