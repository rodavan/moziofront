import React, { useEffect, useState } from "react";
import FormButton from "./SearchForm/FormButton";
import DatePicker from "./SearchForm/DatePicker";
import Locations from "./Locations";
import Passengers from "./SearchForm/Passengers";
import PositionIcon from "./PositionIcon";
import { calc } from "../utils/fetch";

interface SearchCardProps {}

const SearchForm: React.FC<SearchCardProps> = ({}) => {
  const [destinations, setDestinations] = useState<Array<string>>([""]);
  const [origin, setOrigin] = useState<string>("");
  const [passenger, setPassenger] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date(2023, 0, 1));
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [distances, setDistances] = useState<Array<number>>([]);

  useEffect(() => {
    setSubmitEnabled(
      destinations.every((dest) => !!dest) &&
        !!origin &&
        passenger > 0 &&
        !origin.toLowerCase().includes("fail") &&
        !destinations.some((dest) => dest.toLocaleLowerCase().includes("fail"))
    );
  }, [destinations, origin, passenger]);

  useEffect(() => {
    // Read URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    setPassenger(parseInt(urlParams.get("passenger") || "0"));
    setDate(new Date(urlParams.get("date") || new Date(2023, 0, 1).toString()));
    setOrigin(urlParams.get("origin") || "");
    setDestinations(JSON.parse(urlParams.get("destinations") || `[""]`));
  }, []);

  const onSubmit = async () => {
    // Serialize form data as query parameters
    const queryParams = new URLSearchParams({
      passenger: passenger.toString(),
      date: date.toString(),
      destinations: JSON.stringify(destinations),
      origin: origin.toString(),
    });
    // Update the URL with the query parameters
    window.history.pushState(null, "", `?${queryParams.toString()}`);
    setIsSubmitted(true);

    setIsLoading(true);
    setIsError(false);
    calc([origin, ...destinations])
      .then((res) => {
        setDistances(res.map((d: string) => Number(d)));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <div className="p-5 bg-white rounded-2xl w-full md:w-[734px] flex-1 md:flex-none drop-shadow-xl py-9">
      {!isSubmitted && (
        <div>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="w-full md:w-[372px]">
              <Locations
                destinations={destinations}
                origin={origin}
                onChangeDestinations={(dest) => setDestinations(dest)}
                onChangeOrigin={(org) => setOrigin(org)}
              />
            </div>
            <div className="flex justify-center md:flex-col">
              <div className="mr-8 mb-5">
                <Passengers
                  value={passenger}
                  onChange={setPassenger}
                />
              </div>
              <DatePicker
                date={date}
                onChange={setDate}
              />
              <div className="mt-auto" />
            </div>
          </div>
          <div className="flex justify-center mt-9">
            <FormButton
              buttonType="submit"
              disabled={!submitEnabled}
              onClick={onSubmit}
            >
              Submit
            </FormButton>
          </div>
        </div>
      )}
      {isSubmitted && (
        <div>
          <div className="flex flex-col justify-center items-center">
            {isError && (
              <div className="text-[#7786D2] my-28">
                Oops! Something went wrong!
              </div>
            )}
            {isLoading && (
              <div className="my-28 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            )}
            {!isLoading && !isError && (
              <div className="flex items-center flex-col">
                {[origin, ...destinations].map((city, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center relative h-16"
                  >
                    <div>{city}</div>
                    {index < destinations.length && (
                      <div className="text-[#7786D2] mt-2 z-20 ml-[-200px] border-[#7786D2] border rounded p-1 px-2">
                        <div>{distances[index]} km</div>
                      </div>
                    )}
                    {index < destinations.length && (
                      <div className="absolute ml-[-70px] top-4 mx-6 w-1 h-11 dotted-spaced"></div>
                    )}
                    {index !== destinations.length ? (
                      <div className="absolute ml-[-71px] top-1 mx-6 w-3 h-3 border rounded-xl border-[#374151]"></div>
                    ) : (
                      <div className="absolute ml-[-71px] top-1 mx-6">
                        <PositionIcon />
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <span className="text-[#7786D2]">
                    {distances.reduce((prev, cur) => prev + cur, 0).toFixed(2)}
                    km
                  </span>{" "}
                  is total distance
                </div>
                <div className="mb-2">
                  <span className="text-[#7786D2]"> {passenger}</span>
                  &nbsp; passengers
                </div>
                <div className="text-[#7786D2]">
                  {date
                    .toLocaleString("default", { month: "long" })
                    .slice(0, 3)}
                  &nbsp;
                  {date.getDate()}
                  &nbsp;
                  {date.getFullYear()}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-9">
            <FormButton
              buttonType="submit"
              onClick={() => setIsSubmitted(false)}
            >
              Back
            </FormButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
