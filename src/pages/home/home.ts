import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public ad=[
    {
      name:'Demo1',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo2',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo3',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo4',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo5',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo6',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo7',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },{
      name:'Demo8',
      downloadurl:'http://www.africau.edu/images/default/sample.pdf',
      filename:'sample.pdf'
    },
  ]

  constructor(
    public Platform:Platform,
    public navCtrl: NavController,
    private transfer: FileTransfer, 
    private file: File,
    private androidPermissions: AndroidPermissions) {

  }
  
  download(item) {
    if(this.Platform.is('ios')){
      this.downloadFileIOS(item);
    }else if(this.Platform.is('android')){
        this.checkPermissionAndCallDownload(item)
    }
  }


  checkPermissionAndCallDownload(item){
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if (status.hasPermission) {
        this.downloadFileAndroid(item);
      } 
      else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          .then(status => {
            if(status.hasPermission) {
              this.downloadFileAndroid(item);
            }
          });
      }
    });
  }

  

  public downloadFileAndroid(item){
    // let findFileNameAndExtension = item.substring(item.lastIndexOf('/')+1)
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download(item.downloadurl, this.file.externalRootDirectory + '/Download/' + item.filename).then((entry) => {
        alert("Download complete : " + entry.toURL())
      }, (error) => {
        alert("Download complete : " + error)
      });
  }

  public downloadFileIOS(item){
    // let findFileNameAndExtension = item.substring(item.lastIndexOf('/')+1)
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download(item.downloadurl, this.file.dataDirectory + item.filename,true).then((entry) => {
        alert("Download complete : " + entry.toURL())
      }, (error) => {
        alert("Download complete : " + error)
      });
  }


  

}
