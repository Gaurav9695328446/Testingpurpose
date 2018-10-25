import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, pipe } from 'rxjs';
import { throttleTime, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-slider-by-screen',
  templateUrl: './slider-by-screen.component.html',
  styleUrls: ['./slider-by-screen.component.scss']
})
export class SliderByScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('translateDivElem') translateDivElemRef: ElementRef;
  translateValue: number = 0;
  translateStyle: string;
  hideRightArrow: boolean = false;
  private overallWidth: number = 0;
  private resizeEventUnbind: any;
  private rootElemOffsetWidth = 0;
  constructor(private rootElem : ElementRef) { }

  ngOnInit() {
    //let example = pipe(throttleTime(200));
    this.resizeEventUnbind = fromEvent(window, "resize").pipe(debounceTime(200)).subscribe((e) => {
      this.translateValue = 0;
      this.translateStyle = 'translate(' + this.translateValue + 'px)';
      this.resetAll();
    });
  }

  ngAfterViewInit() {
    //add essential style in component root element
    this.rootElem.nativeElement.style = "display: block !important; white-space: nowrap; position: relative; overflow: hidden";
    this.resetAll();
  }

  slideProgress(direction) {
    switch (direction) {
      case 'left':
        if(this.translateValue < 0) {
            this.translateValue += this.translateDivElemRef.nativeElement.offsetWidth;
        }
        if(this.translateValue > 0) {
          this.translateValue = 0;
        }
        break;
      case 'right':
        if(!this.hideRightArrow) {
          this.translateValue -= this.translateDivElemRef.nativeElement.offsetWidth;
        }
        break;
    }
    this.translateStyle = 'translate(' + this.translateValue + 'px)';
    this.checkShowRightArrow();
  }

  private checkShowRightArrow() {
    if (-this.translateValue >= (this.overallWidth - this.translateDivElemRef.nativeElement.offsetWidth - 10)) {
      this.hideRightArrow = true;
    } else {
      this.hideRightArrow = false;
    }
  }

  private resetAll() {
    this.overallWidth = this.translateDivElemRef.nativeElement.scrollWidth;
    this.checkShowRightArrow();
  }

  ngOnDestroy() {
    this.resizeEventUnbind.unsubscribe();
  }
}
