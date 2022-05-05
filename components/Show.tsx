/** @jsx h */

import { h } from "../deps.client.ts";

export default function Show(
  props: {
    when: boolean;
    children: any;
  },
) {
  return props.when ? props.children : null;
}
