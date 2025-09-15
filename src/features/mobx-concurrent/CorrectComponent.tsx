import {observer} from "mobx-react-lite";
import {counterStore} from "./store";

export const CorrectValueComponent = observer(() => {
  return (
    <div className="text-sm text-gray-500">
      <strong>Actual Value:</strong> {counterStore.value}
    </div>
  );
});
