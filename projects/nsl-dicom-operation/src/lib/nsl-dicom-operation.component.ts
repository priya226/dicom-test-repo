import { Component, Input, OnInit, ViewChild } from '@angular/core';
//@ts-ignore
import * as cornerstone from 'cornerstone-core';
//@ts-ignore
import * as cornerstoneTools from 'cornerstone-tools';
//@ts-ignore
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
//@ts-ignore
import * as cornerstoneMath from 'cornerstone-math';
//@ts-ignore
import * as Hammer from 'hammerjs';
import { CornerstoneDirective } from 'projects/cornerstone.directive';
@Component({
  selector: 'lib-nsl-dicom-operation',
  template: './nsl-dicom-operation.component.html',
  styles: []
})
export class NslDicomOperationComponent implements OnInit {
  // @Input() config: any;
  public enableViewerTools = false; // enable viewer tools
  public enablePlayTools = false; // enable Play Clip tools
  public downloadImagesURL = '' // download images URL
  public maxImagesToLoad = 20; // limit for the automatic loading of study images
  public seriesList:any = []; // list of series on the images being displayed
  public currentSeriesIndex = 0;
  public currentSeries: any = {};
  public imageCount = 0; // total image count being viewed
  private element: any;
  
  @ViewChild(CornerstoneDirective, { static: true }) viewPort!: CornerstoneDirective; // the main cornertone view port
  private provider = {
    element: null,
    cornerstoneTools:cornerstoneTools,
    cornerstone:cornerstone,
  };
  private isMultiFrame: boolean=false;
  private playClipActive: boolean=false;
  // control enable/disable image scroll buttons
  public get hidePreviousImage(): any { return { color: (this.viewPort.currentIndex < 1) ? 'black' : 'white' }; }
  public get hideNextImage(): any { return { color: (this.viewPort.currentIndex >= (this.imageCount - 1)) ? 'black' : 'white' }; }
   // control message for more images to load
   public get moreImagestoLoad(): string {
    if (this.loadedImages.length < this.imageIdList.length && !this.loadingImages) { // are there any more images to load?
      const imagesToLoad = (this.maxImagesToLoad <= 0) ? (this.imageIdList.length - this.loadedImages.length) : Math.min(this.maxImagesToLoad, this.imageIdList.length - this.loadedImages.length);
      return imagesToLoad.toString();
    } else return '';
  }
  public get showProgress(): any { return { display: (this.loadingImages) ? 'inline-block' : 'none' } };
  private loadedImages:any = [];
  private imageIdList:any = [];
  // control exhibition of a loading images progress indicator
  public loadingImages = false;
  private targetImageCount = 0;
  constructor() { 
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;}

  ngOnInit(): void {
    this.element = this.viewPort.element;
  }
   /**
   * Load dicom images for display
   *
   * @param imageIdList list of imageIds to load and display
   */
    loadStudyImages(imageIdList: Array<any>) {
      this.element = this.viewPort.element;
      this.imageIdList = imageIdList;
      this.viewPort.resetViewer();
      this.viewPort.resetImageCache(); // clean up image cache
      this.seriesList = []; // start a new series list
      this.currentSeriesIndex = 0; // always display first series
      this.loadedImages = []; // reset list of images already loaded
  
      //
      // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
      //
      const maxImages = (this.maxImagesToLoad <= 0) ? imageIdList.length : Math.min(this.maxImagesToLoad, imageIdList.length);
      this.loadingImages = true; // activate progress indicator
      this.targetImageCount = maxImages;
      for (let index = 0; index < maxImages; index++) {
        const imageId = imageIdList[index];
        cornerstone.loadAndCacheImage(imageId).then((imageData:any) => { this.imageLoaded(imageData) });
      }
  
    }
    /**
   * Load the next batch of images
   */
  public loadMoreImages() {
    this.element = this.viewPort.element;
    //
    // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
    //
    const maxImages = (this.maxImagesToLoad <= 0) ? (this.imageIdList.length - this.loadedImages.length) : Math.min(this.maxImagesToLoad, this.imageIdList.length - this.loadedImages.length);
    this.loadingImages = true; // activate progress indicator
    this.targetImageCount += maxImages;
    let nextImageIndex = this.loadedImages.length;
    for (let index = 0; index < maxImages; index++) {
      const imageId = this.imageIdList[nextImageIndex++];
      cornerstone.loadAndCacheImage(imageId)
        .then((imageData:any) => { this.imageLoaded(imageData) })
        .catch((err:any) => { this.targetImageCount--; });
    }

  }

  /**
   *
   * @param imageData the dicom image data
   */
  private imageLoaded(imageData:any) {
    //console.log(imageData.imageId)
    // build list of series in all loadded images
    let series:any = {
      studyID: imageData.data.string('x0020000d'),
      seriesID: imageData.data.string('x0020000e'),
      seriesNumber: imageData.data.intString('x00200011'),
      studyDescription: imageData.data.string('x00081030'),
      seriesDescription: imageData.data.string('x0008103e'),
      imageCount: 1,
      imageList: [imageData]
    }
    // if this is a new series, add it to the list
    let seriesIndex = this.seriesList.findIndex(
      (item:any) => item.seriesID === series.seriesID);
    if (seriesIndex < 0) {
      seriesIndex = this.seriesList.length;
      this.seriesList.push(series);
      this.seriesList.sort((a:any, b:any) => {
        if (a.seriesNumber > b.seriesNumber) return 1;
        if (a.seriesNumber < b.seriesNumber) return -1;
        return 0;
      })
    } else {
      let seriesItem = this.seriesList[seriesIndex];
      seriesItem.imageCount++;
      seriesItem.imageList.push(imageData);
      seriesItem.imageList.sort((a:any, b:any) => {
        if (a.data.intString('x00200013') > b.data.intString('x00200013')) return 1;
        if (a.data.intString('x00200013') < b.data.intString('x00200013')) return -1;
        return 0;
      })
    }

    this.loadedImages.push(imageData); // save to images loaded

    if (seriesIndex === this.currentSeriesIndex) {
      //this.currentSeries = this.seriesList[seriesIndex];
      //this.imageCount = this.currentSeries.imageCount; // get total image count
      //this.viewPort.addImageData(imageData);
      this.showSeries(this.currentSeriesIndex)
    }

    if (this.loadedImages.length >= this.targetImageCount) { // did we finish loading images?
      this.loadingImages = false; // deactivate progress indicator
    }

  }

  public showSeries(index:number) {
    //        this.resetAllTools();
    this.currentSeriesIndex = index;
    this.currentSeries = this.seriesList[index];
    this.imageCount = this.currentSeries.imageCount; // get total image count
    this.viewPort.resetImageCache(); // clean up image cache
    //        this.loadingImages = true; // activate progress indicator
    for (let i = 0; i < this.currentSeries.imageList.length; i++) {
      const imageData = this.currentSeries.imageList[i];
      this.viewPort.addImageData(imageData);
    }
    //        this.loadingImages = false; // de-activate progress indicator
  }

  // deactivate all tools
public resetAllTools() {
  if (this.imageCount > 0) {
    this.viewPort.resetAllTools()
    this.stopClip();
  }
}

// Play Clip
public playClip() {
  if (this.imageCount > 0) {
    let frameRate = 10;
    let stackState = cornerstoneTools.getToolState(this.element, 'stack');
    if (stackState) {
      frameRate = stackState.data[0].frameRate;
      // Play at a default 10 FPS if the framerate is not specified
      if (frameRate === undefined || frameRate === null || frameRate === 0) {
        frameRate = 10;
      }
    }
    cornerstoneTools.playClip(this.element, frameRate);
  }
}

// Stop Clip
public stopClip() {
  cornerstoneTools.stopClip(this.element);
}
  public saveAs() {
    cornerstoneTools.saveAs(this.element, "teste.jpg")
  }

  /**
   * Image scroll methods
   */
  public nextImage() {
    if (this.viewPort.currentIndex < this.imageCount) {
      this.viewPort.nextImage();
    }
  }

  public previousImage() {
    if (this.viewPort.currentIndex > 0) {
      this.viewPort.previousImage();
    }
  }

}
