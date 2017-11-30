import { HomestylePage } from './app.po';

describe('homestyle App', () => {
  let page: HomestylePage;

  beforeEach(() => {
    page = new HomestylePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
