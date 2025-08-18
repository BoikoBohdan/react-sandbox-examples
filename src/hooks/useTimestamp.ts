import { useState } from "react";
import { useInterval } from "./useIntervale";

export function useTimestamp() {
  const [timestamp, setTimestamp] = useState(Date.now());

  useInterval(() => {
    setTimestamp(Date.now());
  }, 1000);

  return timestamp;
}

export const formatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
