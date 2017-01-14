import {
  Directive, Input,
  Output, OnInit,
  HostListener, TemplateRef,
  ViewContainerRef, EventEmitter,
  Component
} from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';


export class AutocompleteConfig {
  constructor(public term: any, public data: string[], public asyncData: Observable<string[]>) { }
}

@Directive({
  selector: '[autocompleteConfig]'
})
export class AutocompleteDirective implements OnInit {
  private queryStream = new Subject<string>();
  private queries: Observable<string[]>;

  private term: any;
  private _data: string[];
  private _asyncData: Observable<string[]>;
  private _callback: Function;

  private results: string[];

  @Output() result = new EventEmitter<string>();

  @Input('autocompleteConfig') config: AutocompleteConfig;

  constructor(
    private tr: TemplateRef<any>,
    private vc: ViewContainerRef
  ) { }

  ngOnInit() {
    console.log(this.config)
    this.term = this.config.term;
    this._data = this.config.data;
    this._asyncData = this.config.asyncData;
    this.vc.createEmbeddedView(this.tr);

    this.registerHandlers();
  }

  @HostListener('keyup') query() {
    this.queryStream.next(this.term.value);
  }

  @HostListener('keydown', ['$event']) listen(event) {
    if (event.keyCode === 13) {
      this.result.emit(this.term.value);
      this.term.value = "";
    }
  }

  private registerHandlers() {
    if (this._asyncData) {
      this._asyncData.subscribe(value => {
        this._data = value
      });
    }

    this.queries = this.queryStream
      .debounceTime(300)
      .distinctUntilChanged()
      .map((term: string) => this.getResults(term));

    this.queries.subscribe(value => this.useResults(value));
  }

  private getResults(term: string): string[] {
    if (this._data) {
      return this._data.filter(q => {
        return (q.indexOf(term) > -1);
      })
    }
    else if (this._asyncData) {
      this._asyncData.subscribe(value => {
        var res: string[] = value.filter(q => {
          return (q.indexOf(term) > -1);
        });
        return res;
      })
    }
  }

  private useResults(res: string[]) {
    if (res.length == 1) {
      this.term.value = res[0];
      console.log("1 found: " + this.term.value);
    }
    this.results = res;
    this.generateList();
  }

  private generateList() {

  }

}