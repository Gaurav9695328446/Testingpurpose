import { EditProfileModule } from './editprofile.module';

describe('EditProfileModule', () => {
  let editProfileModule: EditProfileModule;

  beforeEach(() => {
    editProfileModule = new EditProfileModule();
  });

  it('should create an instance', () => {
    expect(EditProfileModule).toBeTruthy();
  });
});
