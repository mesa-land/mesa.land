# Mesa.land

Mesa is a NFT card game platform. Make your own cards and sell them on OpenSea!
When you buy a card, you can use it in your next games.

## Contributing

The MVP of mesa runs games in-memory in Deno Deploy. The stack is simple by
declaration:

- [Deno](https://deno.land) for server-side TypeScript.
- [Fresh](https://github.com/lucacasonato/fresh) for components with SSR +
  hydration.
- [Tailwind](https://tailwindcss.com/) for styling.
- WebSockets for game state communication. All game moves are events sent on WS.
  State change is calculated server-side and broadcast to all players in the
  game.

That's it — for now.

## Desired future - May 2022

- Browse my card gallery
- Create your own cards in user interface
- Mint cards to OpenSea
- Buy cards from OpenSea
- Use bought cards in new game
- Games stored in FaunaDB

## Milestones

- End of May: xyz
- Mid May: xyz
- End of April: xyz
- Mid April: xyz

# Usage

### Pre-requisites

- Install fresh
- Install tailwind

Start the project:

```
deno run -A --watch main.ts
```

After adding, removing, or moving a page in the `routes` or directory, or
adding, removing, or moving an island in the `islands` directory, run:

```
fresh manifest
```
