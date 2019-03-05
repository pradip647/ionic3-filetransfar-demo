# Download Files 
This example is showing How to download file using cordova-plugin-file-transfer plugin

## Working Code
To run the above tested and ready code please clone the repository and use the following commands in your project root folder.

```
Clone the repo
ionic cordova preapre
ionic run android (or ios)

npm install 
ionic platform add android (or ios)
ionic build android (or ios)

```
Or you can follow below steps

```
Clone the repo
npm install 
ionic platform add android (or ios)
ionic build android (or ios)
ionic run android (or ios)

```

## Step by Step Working Example

### Requirements
* Ionic 2/3
* cordova plugin file transfar (https://ionicframework.com/docs/v3/native/file-transfer/)
* cordova plugin file (https://ionicframework.com/docs/v3/native/file/)
* cordova plugin android permissions (https://ionicframework.com/docs/v3/native/android-permissions/)

### Installing cordova plugin file transfar into your project
From the root of your, execute the following:
```
ionic cordova plugin add cordova-plugin-file-transfer --save
npm install --save @ionic-native/file-transfer@4
```

### Installing cordova plugin file into your project
From the root of your, execute the following:
```
ionic cordova plugin add cordova-plugin-file --save
npm install --save @ionic-native/file@4
```

### Installing cordova plugin android permisssion into your project
For Android you have to accept android permisssion for read external and internal storage
From the root of your, execute the following:
```
ionic cordova plugin add cordova-plugin-android-permissions --save
npm install --save @ionic-native/android-permissions@4
```

## Usage

### app module
You have to import all plugins as a providers into your project's app.module.ts
```

import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

```
Add under @NgModule
```

  providers: [
    FileTransfer,
    File,
    AndroidPermissions
  ]

```

### home component
```
import { Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

  constructor(
    public Platform:Platform,
    private transfer: FileTransfer, 
    private file: File,
    private androidPermissions: AndroidPermissions) {

  }
   <!--- Download function --->
    download(item) {
    if(this.Platform.is('ios')){
      this.downloadFileIOS(item);
    }else if(this.Platform.is('android')){
        this.checkPermissionAndCallDownload(item)
    }


    <!--- checkPermissionAndCallDownload function of checking android permissions and request permission --->
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


    <!---  downloadFileAndroid function is for Download in android --->
    public downloadFileAndroid(item){
        // let findFileNameAndExtension = item.substring(item.lastIndexOf('/')+1)
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.download(item.downloadurl, this.file.externalRootDirectory + '/Download/' + item.filename).then((entry) => {
            alert("Download complete : " + entry.toURL())
        }, (error) => {
            alert("Download complete : " + error)
        });
    }

    <!---  downloadFileIOS function is for Download in android --->
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

```

### Resources

* Ionic Framework - [http://www.ionicframework.com](http://www.ionicframework.com)

* Ionic Native - [https://ionicframework.com/docs/v3/native/](https://ionicframework.com/docs/v2/native/)

* Google Developer Console - [https://console.developers.google.com](https://console.developers.google.com)
