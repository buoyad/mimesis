export class Pool {
  public admins: string[]; 
  public members: string[];

  public schedule: Schedule;
  public book: Book;
}

export class Book {
  public title: string;
  public author: string;
  public pages: number;
}

export class Schedule {
  public startDate: Date;
  public endDate: Date;

  public stones: Stone[];
}

export class Stone {
  public page: number;
  public date: number;

  public threads: Thread[];
}

export class Thread {
  public owner: string;
  public msgs: Message[];
}

export class Message {
  public author: string;
  public content: string;
  public timestamp: Date;
}