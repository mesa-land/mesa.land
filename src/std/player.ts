export class Player {
  constructor(
    public id: string,
    public actions: number,
  ) {}

  drawCards(num: number) {
    // todo
  }

  addActions(num: number) {
    this.actions += num;
  }
}
