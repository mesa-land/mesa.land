/** @jsx h */

import { h, tw } from "../deps.client.ts";

export default function CardContainer(
  props: {
    title: string;
    children: any;
  },
) {
  return (
    <div
      class={tw
        `rounded-lg border-gray-400 border-1 border-dashed p-2 mb-2 mx-2`}
      style="min-height: 238px; min-width: 152px; width: 99%;"
    >
      <h3 class={tw`mb-2`}>{props.title}</h3>
      {props.children}
    </div>
  );
}
