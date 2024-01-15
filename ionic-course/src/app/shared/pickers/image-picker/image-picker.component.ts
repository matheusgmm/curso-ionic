import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent  implements OnInit {

  @Output() imagePick = new EventEmitter<string>();
  selectedImage!: string;

  constructor() { }

  ngOnInit() {}


  async onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }

    await Camera.getPhoto({
          quality: 50,
          source: CameraSource.Prompt,
          correctOrientation: true,
          height: 320,
          width: 200,
          allowEditing: true,
          resultType: CameraResultType.DataUrl
    }).then(image => {
      this.selectedImage = image.dataUrl!;
      this.imagePick.emit(image.dataUrl);
    }).catch(error => {
      console.error('Error: ', error);
      return false;
    })

    // const takePicture = async () => {
    //   const image = await Camera.getPhoto({
    //     quality: 90,
    //     allowEditing: true,
    //     resultType: CameraResultType.Uri
    //   });

    //   // image.webPath will contain a path that can be set as an image src.
    //   // You can access the original file using image.path, which can be
    //   // passed to the Filesystem API to read the raw data of the image,
    //   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    //   var imageUrl = image.webPath;

    //   // Can be set to the src of an image now
    //   imageElement.src = imageUrl;
    // };
    
  }

}
