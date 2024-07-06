import { Action, ACTIONS, Output } from "../../App";

type FormHeaderProps = {
  dispatcher: React.Dispatch<Action>;
  setResult: (newState: Output) => void;
};

const FormHeader: React.FC<FormHeaderProps> = ({ dispatcher, setResult }) => {
  return (
    <header className="sm:flex sm:justify-between sm:col-span-2 sm:mb-4">
      <h1 className="font-sans text-xl font-bold text-neutral-slate900">
        Mortgage Calculator
      </h1>
      <button
        type="button"
        onClick={() => {
          dispatcher({
            type: ACTIONS.RESET_FIELDS,
            payload: { field: "", value: "", invalid: undefined },
          });
          setResult({
            monthlyPayment: "",
            totalRepayments: "",
            isDoneComputing: false,
          });
        }}
        className="underline header underline-offset-2"
      >
        Clear All
      </button>
    </header>
  );
};

export default FormHeader;
