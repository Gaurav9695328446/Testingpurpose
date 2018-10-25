import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { dialogService } from '../core/service/dialog.service';
import { MyLeaderProfileSuccessComponent } from '../msg-components/my-leader-profile-success/my-leader-profile-success.component';

@Component({
  selector: 'app-my-leader-profile',
  templateUrl: './my-leader-profile.component.html',
  styleUrls: ['./my-leader-profile.component.scss']
})
export class MyLeaderProfileComponent implements OnInit {

  profileForm: FormGroup;
  idExist = false;
  profileData: any;
  partyList: any;
  stateList: any;
  loading: boolean = false;
  myProfile: any = {};
  profileId = null;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private dialogservice: dialogService
  ) { }

  ngOnInit() {
    this.initProfileForm();
    this.getMyProfile();
    this.getProfile();
    this.getParty();
    this.getStates();
  }

  getProfile() {
    if (this.profileId) {
      this.httpClient.get(`http://139.162.53.4/netaji/admin/getProfiles?id=${this.profileId}`)
        .subscribe((res) => {
          console.log(res);

          if (res && res['profiles'].length) {
            this.idExist = true;

            this.profileData = res['profiles'][0];
            //this.croppedImage = this.profileData.profileDetails.profilePic;
            if (this.profileData.profileDetails.posHelds.length > 0) {
              for (var i = 0; i < this.profileData.profileDetails.posHelds.length; i++) {
                this.profileData.profileDetails.posHelds[i].from = new Date(this.profileData.profileDetails.posHelds[i].from);
                this.profileData.profileDetails.posHelds[i].to = new Date(this.profileData.profileDetails.posHelds[i].to)
              }
            }
            this.profileForm.patchValue({
              sal: this.profileData.profileDetails.sal,
              firstName: this.profileData.profileDetails.firstName,
              middleName: this.profileData.profileDetails.middleName,
              lastName: this.profileData.profileDetails.lastName,
              position: this.profileData.profileDetails.position,
              positionStartDate: this.profileData.profileDetails.positionStartDate,
              organisation: this.profileData.profileDetails.organisation,
              age: this.profileData.profileDetails.age,
              state: this.profileData.profileDetails.state,
              placeOrAreaOfInterest: this.profileData.profileDetails.placeOrAreaOfInterest,
              qualifications: this.profileData.profileDetails.qualifications,
              occupation: this.profileData.profileDetails.occupation,
              fatherName: this.profileData.profileDetails.fatherName,
              motherName: this.profileData.profileDetails.motherName,
              dob: new Date(this.profileData.profileDetails.dob),
              placeOfBirth: this.profileData.profileDetails.placeOfBirth,
              maritalStatus: this.profileData.profileDetails.maritalStatus,
              spouseName: this.profileData.profileDetails.spouseName,
              dateOfMarriage: new Date(this.profileData.profileDetails.dateOfMarriage),
              noOfChildren: this.profileData.profileDetails.noOfChildren,
              dateOfDeath: new Date(this.profileData.profileDetails.dateOfDeath),
              noOfCriminalCases: this.profileData.profileDetails.noOfCriminalCases,
              presentAddress: this.profileData.profileDetails.presentAddress,
              presentLandLine: this.profileData.profileDetails.presentLandLine,
              permanentAddress: this.profileData.profileDetails.permanentAddress,
              permanentAddressLandLine: this.profileData.profileDetails.permanentAddressLandLine,
              faxNo: this.profileData.profileDetails.faxNo,
              mobileNo: this.profileData.profileDetails.mobileNo,
              email: this.profileData.profileDetails.email,
              website: this.profileData.profileDetails.website,
              facebookLink: this.profileData.profileDetails.facebookLink,
              twitterLink: this.profileData.profileDetails.twitterLink,
              linkedinLink: this.profileData.profileDetails.linkedinLink,
              googlePlus: this.profileData.profileDetails.googlePlus,
              socialAndCulturalActivities: this.profileData.profileDetails.socialAndCulturalActivities,
              specialInterests: this.profileData.profileDetails.socialAndCulturalActivities,
              sports: this.profileData.profileDetails.sports,
              countriesVisted: this.profileData.profileDetails.countriesVisted,
              activities: this.profileData.profileDetails.activities,
              campaigns: this.profileData.profileDetails.campaigns,
              movements: this.profileData.profileDetails.movements,
              fundReleased: this.profileData.profileDetails.fundReleased,
              fundUtilised: this.profileData.profileDetails.fundUtilised,
              totalRecommendedWork: this.profileData.profileDetails.totalRecommendedWork,
              totalSanctionedWorks: this.profileData.profileDetails.totalSanctionedWorks,
              attendenceInHouse: this.profileData.profileDetails.attendenceInHouse,
              noOfQuestionRaised: this.profileData.profileDetails.noOfQuestionRaised,
              noOfAssurancesGivenByGovernment: this.profileData.profileDetails.noOfAssurancesGivenByGovernment,
              noOfBillIntroduced: this.profileData.profileDetails.noOfBillIntroduced,
              noOfDebates: this.profileData.profileDetails.noOfDebates,
              noOfSpecialMentionsMade: this.profileData.profileDetails.noOfSpecialMentionsMade,
              posHelds: this.profileData.profileDetails.posHelds
            });

          };
        }
        )
    }

  }


  addProfile(profileForm) {

    if (!profileForm.valid) {
      Object.keys(profileForm.controls).forEach(field => {
        const control = profileForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    } else {
      console.log(">>>>");
      if (this.idExist) {
        this.updateLeader(profileForm);
      } else {
        this.createLeader(profileForm);
      }

    }
  }

  updateLeader(profileForm) {
    this.loading = true;
    let formValue = profileForm.value;
    let requestOBJ = {
      "profile": {
        "profileDetails": formValue,
        "id": this.profileData.id,
        "active": this.profileData.active
      }
    }
    this.httpClient.post('http://139.162.53.4/netaji/admin/editProfile', requestOBJ)
      .subscribe((res) => {
        this.loading = false;
        this.toastrService.success('Profile updated Successfully', 'Success');
        this.initProfileForm();
        //this.router.navigate(['leaderlist']);
      }, (error) => {
        this.loading = false;
        this.toastrService.error('Failure updating Profile', 'Failure');

      });
  }

  resetform() {

  }

  createLeader(profileForm) {
    this.loading = true;
    this.httpClient.post('http://139.162.53.4/netaji/admin/createProfile', profileForm.value)
      .subscribe((res) => {
        this.loading = false;
        // console.log(res);
        //this.initProfileForm();
        this.profileId = res["message"];
        console.log("Create Leader" + this.profileId);
        this.toastrService.success('Profile added Successfully', 'Success');
        this.dialogservice.open(MyLeaderProfileSuccessComponent);
        //this.router.navigate(['leaderlist']);
      }, error => {
        this.loading = false;
        this.toastrService.error('Failure adding Profile', 'Failure');
      });
  }

  initProfileForm() {
    this.profileForm = this.formBuilder.group({
      profilePic: [null],
      sal: [null],
      firstName: ['', Validators.required],
      middleName: [null],
      lastName: [''],
      position: [null, Validators.required],
      positionStartDate: [null],
      organisation: ['', Validators.required],
      age: [null, Validators.required],
      state: ['', Validators.required],
      placeOrAreaOfInterest: [''],
      qualifications: [],
      occupation: [],
      fatherName: [],
      motherName: [],
      dob: [''],
      placeOfBirth: [''],
      maritalStatus: [''],
      spouseName: [''],
      dateOfMarriage: [''],
      noOfChildren: [null, Validators.min(0)],
      dateOfDeath: [null],
      noOfCriminalCases: [null, Validators.min(0)],
      presentAddress: [''],
      presentLandLine: [''],
      permanentAddress: [],
      permanentAddressLandLine: [''],
      faxNo: [''],
      mobileNo: [null, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      email: [null, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')],
      website: [null, Validators.pattern('^(http|https)?(://)?(www|ftp)?.?[a-z0-9-]+(.|:)([a-z0-9-]+)+([/?].*)?$')],
      facebookLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)facebook.com\/(#!\/)?[a-z0-9_.]+$')],
      twitterLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$')],
      linkedinLink: [null, Validators.pattern('^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$')],
      googlePlus: [null, Validators.pattern('^https:\/\/plus.google\.com\/.*$')],
      youtubeLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)youtube.com\/.*$')],
      instagramLink: [null, Validators.pattern('^(https?:\/\/)?((w{3}\.)?)instagram.com\/.*$')],
      socialAndCulturalActivities: [''],
      specialInterests: [''],
      sports: [''],
      countriesVisted: [''],
      activities: [''],
      campaigns: [''],
      movements: [''],
      fundReleased: [null, Validators.pattern('^[0-9]*$')],
      fundUtilised: [null, Validators.pattern('^[0-9]*$')],
      totalRecommendedWork: [null, Validators.pattern('^[0-9]*$')],
      totalSanctionedWorks: [null, Validators.pattern('^[0-9]*$')],
      attendenceInHouse: [null, Validators.pattern('^[0-9]*$')],
      noOfQuestionRaised: [null, Validators.pattern('^[0-9]*$')],
      noOfAssurancesGivenByGovernment: [null, Validators.pattern('^[0-9]*$')],
      noOfBillIntroduced: [null, Validators.pattern('^[0-9]*$')],
      noOfDebates: [null, Validators.pattern('^[0-9]*$')],
      noOfSpecialMentionsMade: [null, Validators.pattern('^[0-9]*$')],
      posHelds: this.formBuilder.array([this.formBuilder.group({ from: null, to: null, held: '' })])
    });
  }

  get posHelds() {

    return this.profileForm.get('posHelds') as FormArray;
  }
  agecalculate(temp) {
    if (this.profileForm.value.dob != null) {
      let dateString = this.profileForm.value.dob.toString();
      let birthYear = new Date(dateString);
      var now = new Date();

      var nowMonth = now.getUTCMonth() + 1; //months from 1-12
      var nowDay = now.getUTCDate();
      var nowYear = now.getUTCFullYear();

      var myMonth_birth = birthYear.getUTCMonth();
      var myDay_birth = birthYear.getUTCDate();
      var myYear_birth = birthYear.getUTCFullYear();

      var birthAge = nowYear - myYear_birth - 1;//not ur age yet

      if (nowMonth >= myMonth_birth) //means ur birth month is now or passed
        if (nowDay >= myDay_birth)//check if the day is now or passed
          birthAge += 1;
      const age = this.profileForm.get('age');
      age.setValue(birthAge);
    } else {
      const age = this.profileForm.get('age');
      age.setValue(0);
    }
  }
  addPosition() {
    this.posHelds.push(this.formBuilder.group({ from: null, to: null, held: '' }));

  }
  addPositionByget(obj) {
    this.posHelds.push(this.formBuilder.group(obj));

  }

  deletePosition(index) {
    if (index > 0) {
      this.posHelds.removeAt(index);
    }
  }

  getParty() {
    this.httpClient.get('http://139.162.53.4/netaji/admin/getParties')
      .subscribe((res) => {
        console.log(res);
        this.partyList = res['parties'].sort(function (a, b) {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        });
      });
  }

  getStates() {
    const url = `http://139.162.53.4/netaji/admin/getStates`;
    this.httpClient.get(url).subscribe((res: any) => {

      this.stateList = res['states'].sort(function (a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
    });
  }

  imageUploadCallback(event) {
    this.profileForm.patchValue({
      profilePic: event.target.result.split(',')[1]
    });
    //console.log("data", event, event.target.result);
  }

  getMyProfile() {
    this.httpClient.get('http://139.162.53.4/netaji/' + 'account/getDetails', { observe: 'response' }).subscribe(res => {
      if (res.status === 200) {
        this.myProfile = res.body;
        this.profileId = this.myProfile.leaderId;
      }
    }, function (error) {
      console.log(error);
    })
  }

}

export class posHelds {
  from: Date
  to: Date
  held: string
}
