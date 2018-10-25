import { AchiviesModule } from './achivies.module';

describe('AchiviesModule', () => {
  let achiviesModule: AchiviesModule;

  beforeEach(() => {
    achiviesModule = new AchiviesModule();
  });

  it('should create an instance', () => {
    expect(achiviesModule).toBeTruthy();
  });
});
