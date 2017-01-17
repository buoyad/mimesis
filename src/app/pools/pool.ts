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

  public addMember(u: string) {
    if (this.members.indexOf(u) == -1) {
      this.members.push(u);
    }
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

  set date(j: string) {
    let e = j.split('-');
    let d = new Date(Date.UTC(Number(e[0]), Number(e[1])-1, Number(e[2])));
    this._date = d;
    //this._date.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
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