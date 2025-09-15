import {useEffect, useState} from "react";
import {Reaction} from "mobx";

export function useMobxReaction<T>(observe: () => T): T {
  const [value, setValue] = useState(observe());

  useEffect(() => {
    const reaction = new Reaction("useMobxReaction", () => {
      setValue(observe());
    });

    // Track observable reads
    reaction.track(observe);

    return () => reaction.dispose();
  }, [observe]);

  return value;
}
