export class Pool {
  public name: string = "";
  public admins: string[]; 
  public members: string[];

  public schedule: Schedule;
  public book: Book;

  constructor() {
    this.admins = new Array<string>();
    this.members = new Array<string>();
    this.schedule = new Schedule();
    this.book = new Book();
  }
}

export class Book {
  public title: string = "";
  public author?: string = "";
  public pages: number;
}

export class Schedule {
  public startDate: Date;
  public endDate: Date;

  public stones: Stone[];

  constructor() {
    this.stones = new Array<Stone>();
  }
}

export class Stone {
  public page: number;
  private _date: Date;

  public threads: Thread[];

  set date(d: string) {
    console.log(d);
    let tokens = d.split('-');
    this._date.setFullYear(Number(tokens[0]));
    this._date.setMonth(Number(tokens[1]));
    this._date.setDate(Number(tokens[2]));
  }

  get date(): string {
    let res = this._date.toISOString().substr(0, 10);
    return res;
  }

  constructor() {
    this.threads = new Array<Thread>();
    this._date = new Date();
  }
}

export class Thread {
  public owner: string;
  public msgs: Message[];

  constructor() {
    this.msgs = new Array<Message>();
  }
}

export class Message {
  public author: string = "";
  public content: string = "";
  public timestamp: Date;
}