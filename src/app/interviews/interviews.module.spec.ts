import { InterviewsModule } from './interviews.module';

describe('InterviewsModule', () => {
  let interviewsModule: InterviewsModule;

  beforeEach(() => {
    interviewsModule = new InterviewsModule();
  });

  it('should create an instance', () => {
    expect(interviewsModule).toBeTruthy();
  });
});
