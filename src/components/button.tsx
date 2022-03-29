/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

export const Button = (props: any) => {
  const disabledClass = tw`cursor-not-allowed opacity-50`;
  const { disabled, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled ? true : undefined}
      class={tw
        `text-lg bg-purple-800 rounded-md px-4 py-1 text-white shadow-md ` +
        (props.disabled ? disabledClass : "")}
    >
      {props.children}
    </button>
  );
};
