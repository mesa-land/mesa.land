import { tw } from "../deps.ts";

export const Button = (props: any) => (
  <button
    {...props}
    class={tw`text-lg bg-purple-800 rounded-md px-6 py-2 text-white`}
  >
    {props.children}
  </button>
);
