import { Directive ,ElementRef, HostListener, OnInit, AfterViewChecked} from '@angular/core';
//@ts-ignore
import * as cornerstone from 'cornerstone-core';
//@ts-ignore
import * as cornerstoneTools from 'cornerstone-tools';
//@ts-ignore
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
//@ts-ignore
import * as Hammer from 'hammerjs';
//@ts-ignore
import * as cornerstoneMath from 'cornerstone-math';
@Directive({
  selector: '[appCornerstone]'
})
export class CornerstoneDirective implements OnInit{
  public element: any;

  public imageList:any = [];
  private imageIdList:any = [];
  public currentIndex = 0;
  public currentImage: any;
  // private ZoomTool = cornerstoneTools.ZoomTool;
  // private ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
  // private PanMultiTouchTool = cornerstoneTools.PanMultiTouchTool;
  // private StackScrollTool = cornerstoneTools.StackScrollTool;
  // cornersTone Tools we use
  private WwwcTool = cornerstoneTools.WwwcTool;
  private PanTool = cornerstoneTools.PanTool;
  private ProbeTool = cornerstoneTools.ProbeTool;
  private LengthTool = cornerstoneTools.LengthTool;
  private AngleTool = cornerstoneTools.AngleTool;
  private EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
  private RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
  private DragProbeTool = cornerstoneTools.DragProbeTool;
  private StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
  private EraserTool = cornerstoneTools.EraserTool;
  private MagnifyTool = cornerstoneTools.Magnify;
  private   RotateTool = cornerstoneTools.Rotate;
  private ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheel;
  private FreehandRoiTool = cornerstoneTools.FreehandRoi;

  private isCornerstoneEnabled = false;


  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    // Retrieve the DOM element itself
    this.element = this.elementRef.nativeElement;

    // now add the Tools we use
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init({ globalToolSyncEnabled: true });

    cornerstoneTools.addTool(this.WwwcTool);
    cornerstoneTools.addTool(this.PanTool);
    cornerstoneTools.addTool(this.ProbeTool);
    cornerstoneTools.addTool(this.LengthTool);
    cornerstoneTools.addTool(this.AngleTool);
    cornerstoneTools.addTool(this.EllipticalRoiTool);
    cornerstoneTools.addTool(this.RectangleRoiTool);
    cornerstoneTools.addTool(this.DragProbeTool);
    cornerstoneTools.addTool(this.StackScrollMouseWheelTool);
    cornerstoneTools.addTool(this.EraserTool);
    cornerstoneTools.addTool(this.MagnifyTool);
    cornerstoneTools.addTool(this.RotateTool);
    cornerstoneTools.addTool(this.ZoomMouseWheelTool);
    cornerstoneTools.addTool(this.FreehandRoiTool);

    // Enable the element with Cornerstone
    this.resetViewer();
  }

  public resetViewer() {
    this.disableViewer();
    cornerstone.enable(this.element);
    this.isCornerstoneEnabled = true;
  }

  public disableViewer() {
    this.element = this.elementRef.nativeElement;
    try {
      cornerstone.disable(this.element);
    } finally { }

    this.isCornerstoneEnabled = false;
  }


   // deactivate all tools
   public resetAllTools() {
    cornerstoneTools.setToolDisabledForElement(this.element, 'Wwwc');
    cornerstoneTools.setToolDisabledForElement(this.element, 'Pan');
    cornerstoneTools.setToolDisabledForElement(this.element, 'Probe');
    cornerstoneTools.setToolDisabledForElement(this.element, 'Length');
    cornerstoneTools.setToolDisabledForElement(this.element, 'Angle');
    cornerstoneTools.setToolDisabledForElement(this.element, 'EllipticalRoi');
    cornerstoneTools.setToolDisabledForElement(this.element, 'RectangleRoi');
    cornerstoneTools.setToolDisabledForElement(this.element, 'DragProbe');
    cornerstoneTools.setToolDisabledForElement(this.element, 'StackScrollMouseWheel');
    cornerstoneTools.setToolDisabledForElement(this.element,'EraserTool');
    cornerstoneTools.setToolDisabledForElement(this.element,'Magnify');
    cornerstoneTools.setToolDisabledForElement(this.element,'Rotate');
    cornerstoneTools.setToolDisabledForElement(this.element,'ZoomMouseWheel');
    cornerstoneTools.setToolDisabledForElement(this.element,'FreehandRoi');
    // cornerstoneTools.setToolDisabledForElement(this.element, 'PanMultiTouch');
    // cornerstoneTools.setToolDisabledForElement(this.element, 'StackScroll');
    // cornerstoneTools.setToolDisabledForElement(this.element, 'Zoom');
    // cornerstoneTools.setToolDisabledForElement(this.element, 'ZoomTouchPinch');

  }

  public resetImageCache() {
    this.imageList = [];
    this.imageIdList = [];
    this.currentImage = null;
    this.currentIndex = 0;
    // this.patientName = '';
    // this.hospital = '';
    // this.instanceNumber = '';
  }

  public previousImage() {
    if (this.imageList.length > 0) {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
      this.displayImage(this.imageList[this.currentIndex]);
    }

  }

  public nextImage() {
    if (this.imageList.length > 0) {
      this.currentIndex++;
      if (this.currentIndex >= this.imageList.length) {
        this.currentIndex = this.imageList.length - 1;
      }
      this.displayImage(this.imageList[this.currentIndex]);
    }
  }

  public addImageData(imageData: any) {
    this.element = this.elementRef.nativeElement;
    //if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
    this.imageList.push(imageData);
    this.imageIdList.push(imageData.imageId);
    if (this.imageList.length === 1) {
      this.currentIndex = 0;
      this.displayImage(imageData);
    }
    //}

    cornerstone.resize(this.element, true);
  }

  public displayImage(image:any) {
    this.element = this.elementRef.nativeElement;
    const viewport = cornerstone.getDefaultViewportForImage(this.element, image);
    cornerstone.displayImage(this.element, image, viewport);
    this.currentImage = image;
    // Fit the image to the viewport window
    cornerstone.fitToWindow(this.element);
    cornerstone.resize(this.element, true);

    // Enable all tools we want to use with this element
    cornerstoneTools.setToolActiveForElement(this.element, 'Wwwc', { mouseButtonMask: 1 }, ['Mouse']); // ww/wc is the default tool for left mouse button
    cornerstoneTools.setToolActiveForElement(this.element, 'Pan', { mouseButtonMask: 4 }, ['Mouse']); // pan is the default tool for middle mouse button
    cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', { mouseButtonMask: 2 }, ['Mouse']); // zoom is the default tool for right mouse button

    /*     cornerstoneTools.wwwc.activate(this.element, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(this.element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(this.element, 4); // zoom is the default tool for right mouse button
        cornerstoneTools.probe.enable(this.element);
        cornerstoneTools.length.enable(this.element);
        cornerstoneTools.angle.enable(this.element);
        cornerstoneTools.simpleAngle.enable(this.element);
        cornerstoneTools.ellipticalRoi.enable(this.element);
        cornerstoneTools.rectangleRoi.enable(this.element);
        cornerstoneTools.wwwcTouchDrag.activate(this.element) // - Drag
        cornerstoneTools.zoomTouchPinch.activate(this.element) // - Pinch
        cornerstoneTools.panMultiTouch.activate(this.element) // - Multi (x2) */

    // Stack tools

    // Define the Stack object
    const stack = {
      currentImageIdIndex: this.currentIndex,
      imageIds: this.imageIdList
    };

    cornerstoneTools.addStackStateManager(this.element, ['playClip']);
    // Add the stack tool state to the enabled element
    cornerstoneTools.addStackStateManager(this.element, ['stack']);
    cornerstoneTools.addToolState(this.element, 'stack', stack);
    // cornerstoneTools.stackScrollWheel.activate(this.element);
    // Enable all tools we want to use with this element
    cornerstoneTools.setToolActiveForElement(this.element, 'StackScroll', {});
    //cornerstoneTools.stackPrefetch.enable(this.element);

  }

}
