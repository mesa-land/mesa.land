/** @jsx h */

import { h, tw } from "../deps.client.ts";

export default function Body(props: { children: any }) {
  return (
    <div
      class={tw
        `antialiased text-slate-200 font-sans bg-black bg-gradient-to-b from-black to-indigo-900 min-h-full`}
    >
      {props.children}
    </div>
  );
}
