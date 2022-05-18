# Mesa.land

Mesa is a NFT card game platform. Turn any NFT collection into a card game
instantly! When you buy a card, you can use it in all your games.

## Contributing

The MVP of mesa runs games in-memory in Deno Deploy. The stack is simple by
declaration:

- [Deno](https://deno.land) for server-side TypeScript.
- [Fresh](https://github.com/lucacasonato/fresh) for JSX components with SSR +
  island hydration.
- [Twind](https://twind.dev/) for styling.
- WebSockets for game state communication. All game moves are events sent on WS.
  State change is calculated server-side and broadcast to all players in the
  game.

That's it — for now.

## Desired future - May 2022

- Browse my card gallery
- Create your own cards in user interface
- Mint cards from OpenSea collection
- Use OpenSea cards in new game
- Games stored in FaunaDB

## Milestones

- End of May: xyz
- Mid May: xyz
- End of April: xyz
- Mid April: xyz

# Developing

First, install fresh: https://github.com/lucacasonoto/fresh.

Then, start the project:

```
deno task dev
```

After adding, removing, or moving a page in the `routes` or directory, or
adding, removing, or moving an island in the `islands` directory, run:

```
fresh manifest
```

# To-do

[] Extract state machine from GameFn

[] Figure out connectedPlayerId vs playerId in websocket

# Colors

#212121\
#03FFFF
