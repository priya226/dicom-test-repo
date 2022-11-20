import { Component, OnInit, ViewChild } from '@angular/core';
//@ts-ignore
import * as cornerstone from 'cornerstone-core';
//@ts-ignore
import * as cornerstoneTools from 'cornerstone-tools';
//@ts-ignore
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { ToolModeEnum } from 'projects/model';
import { NslDicomOperationComponent } from 'projects/nsl-dicom-operation/src/public-api';
@Component({
  selector: 'app-dicom-operations',
  templateUrl: './dicom-operations.component.html',
  styleUrls: ['./dicom-operations.component.scss']
})
export class DicomOperationsComponent implements OnInit {
  config = {
    // fileUrl: `${window.location.origin}/assets/0002.DCM`,
    tools: [
      {
        name: 'DragProbe',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'Eraser',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'Magnify',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'StackScrollMouseWheel',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Active
      },
      {
        name: 'Rotate',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'Pan',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'ZoomMouseWheel',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'Length',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'Angle',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'FreehandRoi',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      },
      {
        name: 'Wwwc',
        options: { mouseButtonMask: 1 },
        mode: ToolModeEnum.Passive
      }
    ],
    classList: 'canvas-container'
  };
  constructor() { }
  viewerProvider={
    element: null,
    cornerstoneTools: cornerstoneTools,
    cornerstone: cornerstone,
  }
  @ViewChild(NslDicomOperationComponent, { static: true }) viewPort!: NslDicomOperationComponent;
  imageCount=0;
  ngOnInit(): void {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone; // intialize WADO Image loader

    // configur codec web workers
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
        webWorkerPath: './assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
        taskConfiguration: {
            'decodeTask': {
                codecsPath: '../codecs/cornerstoneWADOImageLoaderCodecs.js'
            }
        }
    });
  }
  /**
   * Load selected DICOM images
   *
   * @param files list of selected dicom files
   */
   loadDICOMImages(event: any) {
    let files = event.target.files;   
    if (files && files.length > 0) {
      let imageList = [];
      const fileList:Array<File> = Array.from(files);
      fileList.sort((a,b) => {
        if ( a.name > b.name ) return 1;
        if ( b.name > a.name ) return -1;
        return 0;
      })
      //cornerstoneWADOImageLoader.wadouri.fileManager.purge();
      cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
      this.imageCount=0;
      // loop thru the File list and build a list of wadouri imageIds (dicomfile:)
      for (let i = 0; i < fileList.length; i++) {
        this.imageCount++;
        const dicomFile: File = fileList[i];
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
        imageList.push(imageId);
      }

      // this.viewPort.resetAllTools();

      // now load all Images, using their wadouri
      this.viewPort.loadStudyImages(imageList);

    } else alert('Choose Dicom images to display.');
  }



}
