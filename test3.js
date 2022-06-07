import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Test3Component extends Component {
    // @action
    // upload() {
    // //   let formData = new FormData();
    // //   formData.append('nameFile', file.files[0]);
    //   const selectedFile = document.getElementById('nameFile').files[0];

    //   // await fetch('http://localhost:8080/webMavenDemo2/DemoServlet3', {
    //   //     method: "POST",
    //   //     body: formData
    //   // });
    //   // alert('The file upload with Ajax and Java was a success!');

    //   var req = new XMLHttpRequest();
    //   let obj = '';

    //   req.onload = function () {
    //     obj = this.responseText;
    //   };

    //   req.open('get', 'http://localhost:8080/webMavenDemo2/DemoServlet3', false);
    //   req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //   req.send(selectedFile);
    //   console.log(selectedFile);
    // }
    dropUpload() {

        var obj = {};
        var formData = new FormData();
        var file = document.getElementById("nameFile").files[0];
        formData.append("file", file);
        var fileFormat = document.getElementById('logs').value;
        formData.append("logFormat", fileFormat);
        console.log("file:---->", file);
        console.log("file format:---->", fileFormat);

        var xhr = new XMLHttpRequest();


        xhr.onload = function () {
             console.log("Response in onload:____",this.responseText);
             alert("uploaded");
         };

        xhr.open("POST", "http://localhost:8080/demoMaven1/demoServlet3", false);
        xhr.send(formData);
      
        console.log("obj:---->", obj);
    }
}
