import {
  bounceInDownAnimation,
  headShakeAnimation,
  fadeInAnimation,
  fadeInDownAnimation,
  flipAnimation,
  slideInRightAnimation,
  flipInXAnimation,
} from 'angular-animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  animations: [
    bounceInDownAnimation(),
    headShakeAnimation(),
    fadeInAnimation(),
    fadeInDownAnimation(),
    slideInRightAnimation(),
    flipInXAnimation(),
  ],
})
export class MainComponent {
  title = 'My App';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isError: boolean = false;
  isErrorAnimation: boolean = false;
  animationBounceState: boolean;
  animationShakeState: boolean;
  animationFadeInState: boolean;
  animationFadeDownState: boolean = false;
  animationFlipState: boolean = false;
  animationSlideState: boolean = false;
  animationClasses: string = '';
  selectedAnimation: string = '';

  downloadAsHtml() {
    if (this.imageChangedEvent === '') {
      this.isError = true;
    } else {
      this.isError = false;
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #fff;
          }
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .animatedBounce {
            background-image: url(/css/images/logo.png);
            background-repeat: repeat;
            background-position: left top;
            padding-top:95px;
            margin-bottom:60px;
            -webkit-animation-duration: 5s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }

          @-webkit-keyframes bounceInDown {
            0% {
               opacity: 0;
               -webkit-transform: translateY(-2000px);
            }
            60% {
               opacity: 1;
               -webkit-transform: translateY(30px);
            }
            80% {
               -webkit-transform: translateY(-10px);
            }
            100% {
               -webkit-transform: translateY(0);
            }
          }

          @keyframes bounceInDown {
            0% {
               opacity: 0;
               transform: translateY(-2000px);
            }
            60% {
               opacity: 1;
               transform: translateY(30px);
            }
            80% {
               transform: translateY(-10px);
            }
            100% {
               transform: translateY(0);
            }
          }

          .bounceInDown {
            -webkit-animation-name: bounceInDown;
            animation-name: bounceInDown;
          }

          .shake {
            animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
          }

          @keyframes shake {
            10%, 90% {
              transform: translate3d(-1px, 0, 0);
            }

            20%, 80% {
              transform: translate3d(2px, 0, 0);
            }

            30%, 50%, 70% {
              transform: translate3d(-4px, 0, 0);
            }

            40%, 60% {
              transform: translate3d(4px, 0, 0);
            }
          }

          .fadeIn {
            margin-top: 25px;
            font-size: 21px;
            text-align: center;
            animation: fadein 1s;
          }

          @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          .fadeDown {
            animation: fadeDown 0.5s ease-in both;
          }

          @keyframes fadeDown {
	          from {
		          opacity: 0;
		          transform: translate3d(0, -1000px, 0);
	          }
	          to {
		          opacity: 1;
		          transform: translate3d(0, 0, 0);
	          }
          }

          .slide {
            animation: slide 1s ease-in-out;
            animation-delay: 10ms;
          }

          @keyframes slide {
            0% {
              transform: translateX(1000px);
            }
            100% {
              transform: translateX(0px);
            }
          }

          .animatedFlipInX {
            animation-duration: 1s;
            animation-fill-mode: both;
          }

          @keyframes flipInX {
            0% {
               transform: perspective(400px) rotateX(90deg);
               opacity: 0;
            }
            40% {
               transform: perspective(400px) rotateX(-10deg);
            }
            70% {
               transform: perspective(400px) rotateX(10deg);
            }
            100% {
               transform: perspective(400px) rotateX(0deg);
               opacity: 1;
            }
          }

          .flipInX {
            backface-visibility: visible !important;
            animation-name: flipInX;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="${this.animationClasses}" src="${this.croppedImage}" alt="image">
        </div>
      </body>
      </html>
      `;
      const blob = new Blob([html], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.html';
      a.click();
    }
  }

  animate(animationType: string) {
    if (this.imageChangedEvent === '') {
      this.isErrorAnimation = true;
    } else {
      this.isErrorAnimation = false;
    }

    console.log('animating!');
    switch (animationType) {
      case 'Bounce':
        this.animationClasses = 'animatedBounce bounceInDown';
        this.selectedAnimation = animationType;
        this.animationBounceState = false;
        setTimeout(() => {
          this.animationBounceState = true;
        }, 1);
        break;

      case 'Shake':
        this.animationClasses = 'shake';
        this.selectedAnimation = animationType;
        this.animationShakeState = false;
        setTimeout(() => {
          this.animationShakeState = true;
        }, 1);
        break;

      case 'Fade':
        this.animationClasses = 'fadeIn';
        this.selectedAnimation = animationType;
        this.animationFadeInState = false;
        setTimeout(() => {
          this.animationFadeInState = true;
        }, 1);
        break;

      case 'FadeDown':
        this.animationClasses = 'fadeDown';
        this.selectedAnimation = animationType;
        this.animationFadeDownState = false;
        setTimeout(() => {
          this.animationFadeDownState = true;
        }, 1);
        break;

      case 'Flip':
        this.animationClasses = 'animatedFlipInX flipInX';
        this.selectedAnimation = animationType;
        this.animationFlipState = false;
        setTimeout(() => {
          this.animationFlipState = true;
        }, 1);
        break;

      case 'Slide':
        this.animationClasses = 'slide';
        this.selectedAnimation = animationType;
        this.animationSlideState = false;
        setTimeout(() => {
          this.animationSlideState = true;
        }, 1);
        break;

      default:
        break;
    }
  }

  onFileChanged(event: any) {
    if (
      !/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(event.target.files[0].name)
    ) {
      this.isError = true;
      this.imageChangedEvent = '';
      this.croppedImage = '';
      return;
    } else {
      this.isError = false;
      this.isErrorAnimation = false;
      this.imageChangedEvent = event || '';
    }
  }

  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }
}

