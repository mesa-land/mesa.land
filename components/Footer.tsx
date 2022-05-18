/** @jsx h */

import { h, tw } from "../deps.client.ts";

const LINKS = [
  {
    title: "Source",
    href: "https://github.com/mesa-land/mesa.land",
  },
];

export default function Footer() {
  const footer = tw
    `border(t-1 gray-200) bg-gray-400 h-32 flex flex-col gap-4 justify-center`;
  const inner = tw
    `mx-auto max-w-screen-lg flex items-center justify-center gap-8`;
  const linkStyle = tw`text-gray-600 hover:underline`;
  const copyright = tw`text(gray-600 center)`;
  return (
    <footer class={footer}>
      <div class={inner}>
        {LINKS.map((link) => (
          <a href={link.href} class={linkStyle}>
            {link.title}
          </a>
        ))}
      </div>
      <div class={copyright}>
        <span>© {new Date().getFullYear()} the Mesa authors</span>
        <br />
        <span>
          special thanks to the{" "}
          <a href="https://github.com/lucacasonoto/fresh">fresh</a> authors
        </span>
      </div>
    </footer>
  );
}
