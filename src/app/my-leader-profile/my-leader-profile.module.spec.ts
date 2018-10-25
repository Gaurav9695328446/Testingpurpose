import { MyLeaderProfileModule } from './my-leader-profile.module';

describe('MyLeaderProfileModule', () => {
  let myLeaderProfileModule: MyLeaderProfileModule;

  beforeEach(() => {
    myLeaderProfileModule = new MyLeaderProfileModule();
  });

  it('should create an instance', () => {
    expect(myLeaderProfileModule).toBeTruthy();
  });
});
