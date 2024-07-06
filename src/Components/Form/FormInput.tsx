import { createContext, PropsWithChildren, useContext } from "react";
import {
  Action,
  ACTIONS,
  formatWithCommas,
  InputState,
  State,
} from "../../App";

type InputDataContext = {
  inputData: InputData;
};

const InputDataContext = createContext<InputDataContext | undefined>(undefined);

function useInputDataContext() {
  const context = useContext(InputDataContext);
  if (!context)
    throw new Error("useTestContext must be used within a FormInput");
  return context;
}

type InputData = {
  label: string;
  id: string;
  textIcon?: string;
  wrapperClass?: string;
  inputClass?: string;
  dispatcher: (action: Action) => void;
  state: InputState;
};

type FormInputProps = PropsWithChildren & {
  inputData: InputData;
};

function FormInput({ children, inputData }: FormInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    if (!isNaN(Number(inputValue))) {
      const formattedValue = formatWithCommas(inputValue);
      const { name, value } = e.target;
      inputData.dispatcher({
        type: ACTIONS.UPDATE_FIELD,
        payload: {
          field: name as keyof State,
          value: formattedValue,
          invalid: value === "",
        },
      });
    }
  };

  return (
    <InputDataContext.Provider value={{ inputData }}>
      <div className={`space-y-2 md:space-y-3 group ${inputData.wrapperClass}`}>
        <label className="header" htmlFor={inputData.id}>
          {inputData.label}
        </label>
        <div className="relative isolate">
          {children}
          <input
            className={`w-full form-input ${inputData.inputClass} ${
              inputData.state.invalid
                ? "border-primary-red focus-visible:outline-primary-red hover:border-primary-red"
                : "border-neutral-slate700 focus-visible:outline-neutral-slate900  hover:border-primary-lime"
            }`}
            id={inputData.id}
            name={inputData.id}
            type="text"
            value={inputData.state.value}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </div>
        {inputData.state.invalid === true && (
          <p className="text-xs font-semibold text-primary-red">
            This field is required
          </p>
        )}
      </div>
    </InputDataContext.Provider>
  );
}

FormInput.SvgIcon = () => {
  const { inputData } = useInputDataContext();
  return (
    <div
      className={`rounded-l form-input-icon w-9 md:w-12 ${
        inputData.state.invalid
          ? "bg-primary-red group-hover:bg-primary-red"
          : "bg-neutral-slate100 group-hover:bg-primary-lime"
      }`}
      aria-hidden
    >
      <svg
        className={`${
          inputData.state.invalid ? "text-white" : "text-neutral-slate700"
        }`}
        fill="currentColor"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 8.585h1.969c.115.465.186.939.186 1.43 0 1.385-.736 2.496-2.075 2.771V14H12v-1.24H6.492v-.129c.825-.525 1.135-1.446 1.135-2.694 0-.465-.07-.913-.168-1.352h3.29v-.972H7.22c-.186-.723-.372-1.455-.372-2.247 0-1.274 1.047-2.066 2.58-2.066a5.32 5.32 0 0 1 2.103.465V2.456A5.629 5.629 0 0 0 9.348 2C6.865 2 5.322 3.291 5.322 5.366c0 .775.195 1.515.399 2.247H4v.972z" />
      </svg>
    </div>
  );
};

FormInput.TextIcon = () => {
  const { inputData } = useInputDataContext();
  return (
    <span
      className={`right-0 px-3 font-bold rounded-r form-input-icon md:px-5 ${
        inputData.state.invalid
          ? "bg-primary-red group-hover:bg-primary-red text-white"
          : "text-neutral-slate700 bg-neutral-slate100 group-hover:bg-primary-lime"
      }`}
      aria-hidden
    >
      {inputData.textIcon}
    </span>
  );
};

export default FormInput;
