export class Player {
  public actions: number = 0;
  public buys: number = 0;
  public coins: number = 0;
  public wins: number = 0;
  // An array of cardIds representing shuffle order
  public deck: Array<string> = [];
  // An array of cardIds representing shuffle order
  public discard: Array<string> = [];
  // An array of cardIds representing shuffle order
  public hand: Array<string> = [];

  constructor(
    public id: string,
  ) {}
}
