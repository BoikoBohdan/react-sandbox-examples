import {useFibonacci} from "../hooks";

export const DummyComponent = ({
  id,
  title,
  subTitle,
}: {
  id: string;
  title: string;
  subTitle: string;
}) => {
  console.log("DummyComponent re-render:", id);
  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{subTitle}</div>
    </div>
  );
};

export const DummyComponentSlow = ({
  id,
  title,
  subTitle,
  fibonacciCount = 1000,
}: {
  id: string;
  fibonacciCount: number;
  title: string;
  subTitle: string;
}) => {
  const fibResult = useFibonacci(fibonacciCount);
  console.log("DummyComponentSlow re-render:", id, fibResult);

  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{subTitle}</div>
    </div>
  );
};
