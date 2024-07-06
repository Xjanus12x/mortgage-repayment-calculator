import React from "react";
import MortgageType from "./MortgageType";

type MortgageType = {
  label: string;
  name: string;
  isRepayment: boolean;
  handleRadioChange: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mortgageType: string
  ) => void;
};

const Type: React.FC<MortgageType> = ({
  label,
  name,
  isRepayment,
  handleRadioChange,
}: MortgageType) => {
  return (
    <div
      className={`group bg-opacity-15 border  py-2 rounded-sm sm:rounded-md px-3 flex items-center gap-4 relative after:absolute after:inset-0 md:py-3 hover:border-primary-lime cursor-pointer md:border-2 ${
        isRepayment
          ? "bg-primary-lime border-primary-lime"
          : "border-neutral-slate900"
      }`}
      onClick={(e) => handleRadioChange(e, label)}
    >
      <div className="inline-flex items-center">
        <label className="relative flex items-center rounded-full cursor-pointer">
          <input
            name="mortgage-type"
            type="radio"
            className="before:content[''] peer relative size-4 cursor-pointer appearance-none rounded-full border border-neutral-slate700 text-primary-lime transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary-lime checked:border-2 hover:before:opacity-10 group-checked:bg-primary-lime"
            id={label.toLowerCase()}
            value={label.toLowerCase()}
            name={name}
            checked={isRepayment}
            onChange={() => {}}
          />
          <span className="absolute transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-primary-lime peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-2"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
        </label>
      </div>
      <label
        htmlFor={label.toLowerCase()}
        className="text-sm font-bold text-neutral-slate900 md:text-base"
      >
        {label}
      </label>
    </div>
  );
};

export default Type;
