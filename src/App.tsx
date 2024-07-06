import "./App.css";
import calculatorIcon from "../public/assets/images/icon-calculator.svg";
import MortgageType from "./Components/MortgageType/MortgageType";
import FormHeader from "./Components/Form/FormHeader";
import FormInput from "./Components/Form/FormInput";
import { useReducer, useState } from "react";
import Result from "./Components/Result/Result";

export const ACTIONS = {
  UPDATE_FIELD: "UPDATE_FIELD",
  RESET_FIELDS: "RESET_FIELDS",
};

export type InputState = {
  value: string;
  invalid: boolean | undefined;
};

export type State = {
  mortgageAmount: InputState;
  mortgageTerm: InputState;
  interestRate: InputState;
  mortgageType: InputState;
};

export type Action = {
  type: typeof ACTIONS.UPDATE_FIELD | typeof ACTIONS.RESET_FIELDS;
  payload:
    | {
        field: keyof State;
        value: string;
        invalid: boolean | undefined;
      }
    | { field: string; value: string; invalid: boolean | undefined };
};

export type Output = {
  monthlyPayment: string;
  totalRepayments: string;
  isDoneComputing: boolean;
};

const initialInputState: InputState = {
  value: "",
  invalid: undefined,
};

const initialState: State = {
  mortgageAmount: initialInputState,
  mortgageTerm: initialInputState,
  interestRate: initialInputState,
  mortgageType: initialInputState,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.payload.field]: {
          value: action.payload.value,
          invalid: action.payload.invalid,
        },
      };
    case ACTIONS.RESET_FIELDS:
      return initialState;
    default:
      return state;
  }
}

export function formatWithCommas(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateRepaymentMortgage(
  principal: number,
  annualInterestRate: number,
  years: number
) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  const totalRepayments = monthlyPayment * numberOfPayments;
  return {
    monthlyPayment: formatWithCommas(monthlyPayment.toFixed(2)),
    totalRepayments: formatWithCommas(totalRepayments.toFixed(2)),
  };
}

function calculateInterestOnlyMortgage(
  principal: number,
  annualInterestRate: number,
  years: number
) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  const monthlyPayment = principal * monthlyInterestRate;
  const totalRepayments = monthlyPayment * 12 * years + principal;

  return {
    monthlyPayment: formatWithCommas(monthlyPayment.toFixed(2)),
    totalRepayments: formatWithCommas(totalRepayments.toFixed(2)),
  };
}

function App() {
  const [state, dispatcher] = useReducer(reducer, initialState);
  const [result, setResult] = useState<Output>({
    monthlyPayment: "",
    totalRepayments: "",
    isDoneComputing: false,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isAllValid = true;
    for (let [key, value] of Object.entries(state)) {
      if (value.value === "") {
        isAllValid = false;
        dispatcher({
          type: ACTIONS.UPDATE_FIELD,
          payload: {
            field: key as keyof State,
            value: value.value,
            invalid: true,
          },
        });
      }
    }

    if (isAllValid) {
      const mortgageAmount = +state.mortgageAmount.value.replace(",", "");
      const mortgageTerm = +state.mortgageTerm.value.replace(",", "");
      const interestRate = +state.interestRate.value.replace(",", "");
      const mortgageType = state.mortgageType.value.replace(",", "");

      if (mortgageType === "Repayment") {
        const output = calculateRepaymentMortgage(
          mortgageAmount,
          interestRate,
          mortgageTerm
        );
        console.log(output);

        setResult({ ...output, isDoneComputing: true });
      } else if (mortgageType === "Interest only") {
        const output = calculateInterestOnlyMortgage(
          mortgageAmount,
          interestRate,
          mortgageTerm
        );
        setResult({ ...output, isDoneComputing: true });
      }
    }
  };
  return (
    <>
      <main className="sm:bg-neutral-slate100 sm:p-8 md:min-h-dvh md:grid md:place-content-center">
        <div className="bg-white sm:rounded-xl sm:overflow-hidden md:flex md:max-w-screen-xl md:rounded-3xl">
          <form
            className="grid gap-4 p-6 sm:p-8 sm:grid-cols-2 sm:gap-5 md:max-w-lg"
            onSubmit={handleFormSubmit}
          >
            <FormHeader dispatcher={dispatcher} setResult={setResult} />

            <FormInput
              inputData={{
                label: "Mortgage Amount",
                id: "mortgageAmount",
                wrapperClass: "sm:col-span-2",
                inputClass: "pl-12 pr-4 md:pl-14",
                dispatcher: dispatcher,
                state: state.mortgageAmount,
              }}
            >
              <FormInput.SvgIcon />
            </FormInput>

            <FormInput
              inputData={{
                label: "Mortgage Term",
                id: "mortgageTerm",
                textIcon: "years",
                inputClass: "pl-3 pr-16 md:pr-20",
                dispatcher: dispatcher,
                state: state.mortgageTerm,
              }}
            >
              <FormInput.TextIcon />
            </FormInput>

            <FormInput
              inputData={{
                label: "Interest Rate",
                id: "interestRate",
                textIcon: "%",
                inputClass: "px-3 pr-12 md:pr-16",
                dispatcher: dispatcher,
                state: state.interestRate,
              }}
            >
              <FormInput.TextIcon />
            </FormInput>

            <MortgageType dispatcher={dispatcher} state={state.mortgageType} />

            <button className="flex items-center justify-center py-3 rounded-full bg-primary-lime sm:py-3.5 sm:col-span-2 sm:place-self-start sm:px-10 gap-4 hover:bg-opacity-50 focus-visible:bg-opacity-50 min-w-fit">
              <img src={calculatorIcon} alt="calculator icon" />
              <span className="font-bold text-neutral-slate">
                Calculator Repayments
              </span>
            </button>
          </form>

          <Result output={result} />
        </div>
      </main>
    </>
  );
}

export default App;
