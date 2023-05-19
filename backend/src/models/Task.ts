export class Task {
  constructor(
    public title: string,
    public rating: number | null,
    public _id?: string
  ) {}
}
