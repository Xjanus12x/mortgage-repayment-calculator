import illustrationEmpty from "../../../public/assets/images/illustration-empty.svg";
import { Output } from "../../App";

type ResultProps = {
  output: Output;
};

const Result: React.FC<ResultProps> = ({ output }) => {
  return output.isDoneComputing ? (
    <DisplayOuput
      monthlyPayment={output.monthlyPayment}
      totalRepayments={output.totalRepayments}
    />
  ) : (
    <Default />
  );
};

function Default() {
  return (
    <section className="grid gap-3 p-8 text-center bg-neutral-slate900 justify-items-center sm:p-10 md:place-content-center md:max-w-md md:rounded-bl-[4rem]">
      <img src={illustrationEmpty} alt="Calculator image" />
      <h2 className="text-xl text-white md:text-2xl">Results shown here</h2>
      <p className="text-sm text-neutral-slate300">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be
      </p>
    </section>
  );
}

type DisplayOuputProps = {
  monthlyPayment: string;
  totalRepayments: string;
};

const DisplayOuput: React.FC<DisplayOuputProps> = (outputData) => {
  return (
    <section className="p-8 bg-neutral-slate900 justify-items-center sm:p-10 md:max-w-md md:rounded-bl-[4rem] space-y-5 md:space-y-7">
      <h2 className="text-lg font-semibold text-white sm:text-xl">
        Your results
      </h2>
      <p className="text-sm text-neutral-slate300">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "calculate repayments"
        again.
      </p>

      <div
        className="p-4 bg-[#0E2431] rounded-md space-y-4 divide-y sm:p-8"
        style={{ boxShadow: "inset 0px 10px 0px -6px hsl(61, 70%, 52%)" }}
      >
        <div className="py-1 space-y-3 sm:pt-3 sm:pb-4">
          <p className="text-sm text-neutral-slate300">
            Your monthly repayments
          </p>
          <p className="text-4xl font-extrabold text-primary-lime sm:text-5xl">
            £{outputData.monthlyPayment}
          </p>
        </div>

        <div className="pt-5 space-y-2 sm:pt-8">
          <p className="text-sm text-neutral-slate300">
            Total you'll repay over the term
          </p>
          <p className="text-xl font-extrabold text-white">
            £{outputData.totalRepayments}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Result;
