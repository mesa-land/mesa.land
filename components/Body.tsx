/** @jsx h */

import { h, tw } from "../deps.client.ts";

export default function Body(props: { children: any }) {
  return (
    <div
      class={tw`antialiased text-blue-400 font-sans bg-gray-400 min-h-full `}
    >
      {props.children}
    </div>
  );
}
