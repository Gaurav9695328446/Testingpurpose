import { Injectable, ComponentFactoryResolver, ViewChild, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { DialogComponent } from '../../common/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class dialogService {

  private dialogComponentRef: any;
  private componentRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef) { }
  open(component) {
    //destroy current dialog component af already initiated
    close();
    this.dialogComponentRef = this.componentFactoryResolver.resolveComponentFactory(DialogComponent).create(this.injector);

    //dynacally called component & attach to main application
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    const dynamicDomElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    //dialog component attach to main application
    this.appRef.attachView(this.dialogComponentRef.hostView);
    const domElem = (this.dialogComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    domElem.querySelector(".dynamicComponent").appendChild(dynamicDomElem);
    document.body.appendChild(domElem);
  }

  close() {
    //destroy dialog component if dialog component initiated
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
    }
    //destroy current dynamic component if component initiated
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }
}
