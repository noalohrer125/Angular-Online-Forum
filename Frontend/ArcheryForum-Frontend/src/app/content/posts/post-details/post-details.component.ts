import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { AnswersComponent } from "./answers/answers.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { imageService } from '../../../services/image.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AnswersComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  postId = input.required()

  constructor(private apiService: ApiService, private imageService: imageService) { }

  postIdNumber!: number;

  subject!: string;
  userName!: string;
  avatar!: any;
  user: boolean = false;
  content!: string;
  image!: SVGElement;
  likes!: number;
  dislikes!: number;

  is_superuser: boolean = false;
  is_authorised: boolean = false;

  current_user_like_cat_image!: boolean;

  @ViewChild('svg') dataContainer: ElementRef | any;

  ngOnInit() {
    this.postIdNumber = Number(this.postId());

    this.apiService.getSpecificPost(this.postIdNumber).subscribe(response => {
      if (response.error_message) {
        window.alert('we have issues with our servers, try again later')
      }
      else {
        this.subject = response.post.Subject
        this.apiService.getSpecificUser(response.post.User).subscribe(data => {
          this.userName = data.User[1]
          this.avatar = data.User[2]
          this.apiService.current_user().subscribe((response: any) => {
            this.is_superuser = response.is_superuser
            if (response.username !== '') {
              this.user = true
            }
            if (this.userName === response.username) {
              this.is_authorised = true
            }
          })
        })
        this.content = response.post.Content

        if (response.post.Image === "") {
          let imageString = this.apiService.getRandomImage().subscribe(response => {
            this.image = response.image

            this.dataContainer.nativeElement.innerHTML = this.imageService.imageUrlToSvg(String(this.image));

            const imageElement = this.dataContainer!.nativeElement.querySelector('image');
            if (imageElement) {
              imageElement.setAttribute('width', '30vw'); // set width
              this.dataContainer.nativeElement.style.display = 'flex'

              // check if current user allready liked the specific cat-image
              this.apiService.currentUserLikedCatImage(String(this.image)).subscribe((response: any) => {
                this.current_user_like_cat_image = response.data
                const button = document.getElementById('saveCatImageButton')
                button!.style.backgroundColor = 'green';
              })
            }
          });
          // insert svg-string into #svg div
        } else {
          this.dataContainer.nativeElement.innerHTML = response.post.Image;
          const button = document.getElementById('saveCatImageButton')
          button!.style.display = 'none';
        }
        const imageElement = this.dataContainer!.nativeElement.querySelector('image');
        if (imageElement) {
          imageElement.setAttribute('width', '30vw'); // set width
          this.dataContainer.nativeElement.style.display = 'flex'
        }
        this.likes = response.post.likes_count
        this.dislikes = response.post.dislikes_count
      }
    });
  }

  delete() {
    this.apiService.deletePost(this.postIdNumber).subscribe(response => {
      if (response.error_message) {
        window.alert('failed to delete Post, try again later')
      }
      else {
        window.location.href = '/posts';
      }
    })
  }

  vote_up() {
    if (!this.user) {
      window.alert('You have to loggin to like a post!')
      return
    }
    const voting = 'up'
    this.apiService.votePost(voting, this.postIdNumber).subscribe(response => {
      location.reload()
    })
  }

  vote_down() {
    if (!this.user) {
      window.alert('You have to loggin to dislike a post!')
      return
    }
    const voting = 'down'
    this.apiService.votePost(voting, this.postIdNumber).subscribe(response => {
      location.reload()
    })
  }

  reportForm = new FormGroup({
    comment: new FormControl,
  })

  report_post_submit() {
    this.displayReportForm = false

    const email_data = {
      postId: this.postIdNumber,
      comment: this.reportForm.value.comment
    }

    this.apiService.reportPost(email_data).subscribe(response => { })
  }

  displayReportForm: boolean = false;

  openReportForm() {
    this.displayReportForm = true
  }

  saveCatImage() {
    const imageUrl = this.image
    this.apiService.saveCatImage(String(imageUrl)).subscribe(response => { })
  }
}
