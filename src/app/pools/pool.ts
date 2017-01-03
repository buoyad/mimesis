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
  public date: Date;

  public threads: Thread[];

  constructor() {
    this.threads = new Array<Thread>();
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