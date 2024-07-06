import { useState, useRef, useEffect } from "react";
import Type from "./Type";
import { Action, ACTIONS, InputState, State } from "../../App";

type MortgageTypeProps = {
  dispatcher: (action: Action) => void;
  state: InputState;
};

const MortgageType: React.FC<MortgageTypeProps> = ({ dispatcher, state }) => {
  const [mortgageType, setMortgageType] = useState<string>("");
  const previousMorgageType = useRef("");
  useEffect(() => {
    previousMorgageType.current = state.value;
  }, [mortgageType]);

  function handleRadioChange(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string
  ) {
    event.preventDefault();
    if (previousMorgageType.current !== type) {
      dispatcher({
        type: ACTIONS.UPDATE_FIELD,
        payload: {
          field: "mortgageType" as keyof State,
          value: type,
          invalid: type === "",
        },
      });
      setMortgageType(type);
    }
  }

  return (
    <div className="mb-3 space-y-2 md:space-y-3 sm:col-span-2">
      <span className="header">Morgage Type</span>
      <Type
        label="Repayment"
        name="mortgage-type"
        isRepayment={mortgageType === "Repayment" && state.value !== ""}
        handleRadioChange={handleRadioChange}
      />
      <Type
        label="Interest only"
        name="mortgage-type"
        isRepayment={mortgageType === "Interest only" && state.value !== ""}
        handleRadioChange={handleRadioChange}
      />
      {state.invalid && (
        <p className="text-xs font-semibold text-primary-red">
          This field is required
        </p>
      )}
    </div>
  );
};

export default MortgageType;
