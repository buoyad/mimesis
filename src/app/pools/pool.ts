export class Pool {
  public $key?: string;
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

  /**
   * Adds a normal member to this pool.
   * @param u the username of the user to add
   * @returns true if the user was added, false if the user already exists
   */
  public addMember(u: string): boolean {
    if (this.members.indexOf(u) == -1) {
      this.members.push(u);
      return true;
    }
    return false;
  }
}

export class Book {
  public title: string = "";
  public author?: string = "";
  public pages: number;
}

export class Schedule {
  public startDate: string;
  public endDate: string;

  public stones: Stone[];

  constructor() {
    this.stones = new Array<Stone>();
  }
}

export class Stone {
  public page: number;
  public date: string = new Date().toISOString().substr(0, 10);
  public heading: string = "";

  public threads: string;

  constructor() { }
}

export class Message {
  public author: string = "";
  public content: string = "";
  public timestamp: string;
}