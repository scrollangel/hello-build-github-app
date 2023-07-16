import { ChangeEvent } from "react";

type OnInputChangeFunction = (value: string) => void;

type OnInputEventFunction = (event: ChangeEvent<HTMLInputElement>) => void

export function getInputValue(onChange: OnInputChangeFunction): OnInputEventFunction {
  return function (event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  };
}
