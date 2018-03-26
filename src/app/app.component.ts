import { Component } from '@angular/core';

declare let navigator: any;
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    if (this.userMedia()) {
      var videoPlaying = false;
      var constraints = {
        video: true,
        audio: false
      };
      var video: any = document.getElementById('v');

      var media = navigator.getUserMedia(constraints, function (stream) {
        // URL Object is different in WebKit
        var url = window.URL || window.webkitURL;

        // create the url and set the source of the video element
        video.src = url ? url.createObjectURL(stream) : stream;
        
        // Start the video
        video.play();
        videoPlaying = true;
      }, function (error) {
        console.log("ERROR");
        console.log(error);
      });


      // Listen for user click on the "take a photo" button
      document.getElementById('take').addEventListener('click', function () {
        if (videoPlaying) {
          var canvas: any = document.getElementById('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          var data = canvas.toDataURL('image/webp');
          document.getElementById('photo').setAttribute('src', data);
        }
      }, false);



    } else {
      console.log("KO");
    }
  }

  userMedia() {
    var media = navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.mediaDevices.getUserMedia ||
      navigator.msGetUserMedia || null;

     
    navigator.mediaDevices.enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {          
          let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);
          if (type === "video") {
            console.log(device);
          console.log(device.kind + ": " + device.label +
            " id = " + device.deviceId);
          }
        });
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
    return media;

  }

}
