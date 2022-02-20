/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

export type CardType = "action" | "coin" | "win" | "loss"

export type CardState = {
  title: string
  image: string
  description: string
  types: Record<CardType, boolean>
  value: number
  cost: number
  state: "supply" | "discard" | "hand" | "play" | "trash"
}

export const Card = (props: CardState) => (
  <div class={tw`bg-gray-50 rounded-lg border-solid border-2 border-purple-100`}>
    {props.value && <span>{props.value}</span>}
    <h1>{props.title}</h1>
    {/* <img src={props.image} /> */}
    <p>{props.description}</p>
    <p>{props.cost}</p>
  </div>
)

