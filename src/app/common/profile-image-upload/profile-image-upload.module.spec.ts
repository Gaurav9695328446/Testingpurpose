import { ProfileImageUploadModule } from './profile-image-upload.module';

describe('ProfileImageUploadModule', () => {
  let profileImageUploadModule: ProfileImageUploadModule;

  beforeEach(() => {
    profileImageUploadModule = new ProfileImageUploadModule();
  });

  it('should create an instance', () => {
    expect(profileImageUploadModule).toBeTruthy();
  });
});
