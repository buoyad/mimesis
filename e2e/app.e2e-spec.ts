import { MimesisPage } from './app.po';

describe('mimesis App', function() {
  let page: MimesisPage;

  beforeEach(() => {
    page = new MimesisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
