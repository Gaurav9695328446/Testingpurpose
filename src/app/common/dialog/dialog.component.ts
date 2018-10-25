import { Component, OnInit } from '@angular/core';
import { dialogService } from '../../core/service/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogservice : dialogService) { }

  ngOnInit() {
  }

  close() {
    this.dialogservice.close();
  }

}
