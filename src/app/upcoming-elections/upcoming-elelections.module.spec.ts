import { UpcomingElelectionsModule } from './upcoming-elelections.module';

describe('UpcomingElelectionsModule', () => {
  let upcomingElelectionsModule: UpcomingElelectionsModule;

  beforeEach(() => {
    upcomingElelectionsModule = new UpcomingElelectionsModule();
  });

  it('should create an instance', () => {
    expect(upcomingElelectionsModule).toBeTruthy();
  });
});
