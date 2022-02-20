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
  <div class={tw`bg-gray-200 flex-auto p-2 mb-2 ml-1 mr-1 rounded-lg`}>
    {props.value && <span>{props.value}</span>}
    <h2>{props.title}</h2>
    {/* <img src={props.image} /> */}
    <p>{props.description}</p>
    <p>Costs: {props.cost}</p>
  </div>
)

