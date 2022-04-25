/** @jsx h */

import { h, tw } from "../deps.client.ts";

export default function NavigationBar(props: { active: string }) {
  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Play",
      href: "/m/",
    },
    {
      name: "Create",
      href: "/c/",
    },
  ];

  return (
    <nav
      class={tw
        `antialiased text-slate-200 font-sans bg-black bg-gradient-to-b from-indigo-900 to-black min-h-full py-2 border(t-2 b-2 gray-100)`}
    >
      <ul class={tw`flex justify-center gap-8 mx-4`}>
        {items.map((item) => (
          <li>
            <a
              href={item.href}
              class={tw`text-slate-200 hover:underline ${
                props.active == item.href ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}