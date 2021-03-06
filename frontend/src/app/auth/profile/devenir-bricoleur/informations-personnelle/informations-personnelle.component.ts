import { Router } from '@angular/router';
import { UserModule } from 'src/app/models/user/user.module';

import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/user.service';
import { FileService } from 'src/app/core/file.service';
import { Address } from 'src/app/models/server-user/server-user.module';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-informations-personnelle',
  templateUrl: './informations-personnelle.component.html',
  styleUrls: ['./informations-personnelle.component.scss']
})
export class InformationsPersonnelleComponent implements OnInit {
  
  photoRout = environment.API_URL+"load/image/";
  status;
  user:UserModule;
  reader = new FileReader();
  updatedUser:UserModule;
  selectedFile = null;
  profileImage = null;
  constructor(private userService:UserService,
              private fileService:FileService,
              private route: Router) {}

  ngOnInit(): void {
    console.log(this.userService.getUser());
    this.userService.currentUser.subscribe(user =>{ 
      this.user = user;
      this.updatedUser = JSON.parse(JSON.stringify(this.user));
      if(!this.updatedUser.address) this.updatedUser.address = new Address();
    });

    if(!this.updatedUser.photo){
      this.profileImage = "../assets/images/profile-avatar.jpg" 
    }else{
      this.profileImage = this.photoRout+this.updatedUser.photo;;
    }
  }

  onSubmit(){
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  uploadImage(image){
    Swal.fire({
      title: 'vous étes sûr?',
      text: "Voulez vous vraiment modifié votre photo de profil!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier-le!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })
        this.fileService.uploadImage(this.selectedFile).subscribe(
          res => {
            Swal.fire(
              'Votre photo est modifié',
              'aaaaaa aaa',
              'success'
            )
          }
        )
        
      }
    })
  }

  loadImage(){
    this.fileService.loadImage().subscribe(
      event => console.log(event)
    )
  }

  imageShow(imageuser){
    console.log(imageuser.value)
  }

  changeDate($event){
    console.log($event);
  }

  fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      let _this = this;
      reader.onload = function (e : any) {
        _this.profileImage =  e.target.result;
        
      }   
      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

infobrico(){
  this.userService.updateUser(this.updatedUser).subscribe(
    res => {
      this.updatedUser = res;
    }
  )
  this.status = 2;
  this.route.navigate(['profile/devenir-bricoleur/informations-bricoleur'])
}

}
