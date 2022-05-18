/** @jsx h */

import { h, tw } from "../deps.client.ts";

export default function RoundedButton(
  props: h.JSX.HTMLAttributes<HTMLButtonElement>,
) {
  const disabledClass = tw`cursor-not-allowed opacity-50`;
  const { disabled, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled ? true : undefined}
      class={tw
        `text-lg bg-blue-400 text-gray-400 rounded-md px-4 py-1 shadow-md ` +
        (props.disabled ? disabledClass : "")}
    >
      {props.children}
    </button>
  );
}
