export default class Task {
  constructor(
    public _id: string,
    public title: string,
    public rating: number | null
  ) {}
}
