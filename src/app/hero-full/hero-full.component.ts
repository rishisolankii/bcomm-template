import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero-full',
  templateUrl: './hero-full.component.html',
  styleUrl: './hero-full.component.scss',
})
export class HeroFullComponent implements AfterViewInit {
  @Input() banner!: any;
  @Input() foundBanner!: any;
  @Input() bannerKey: string = 'media1';
  @Output() bannerUrl = new EventEmitter<any>();

  @ViewChild('bannerVideo') bannerVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    // Set default banner if not provided
    if (!this.banner) {
      this.banner = {
        type: 'full-banner',
        urls: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&h=800&fit=crop&crop=center'],
        videoUrl: 'assets/videos/hero-video.mp4',
        title: 'Full Experience',
        description: 'Immerse yourself in our complete shopping experience',
        imageTitle: 'Discover More',
        imageDescription: 'Full screen shopping experience',
        urlType: 'category',
        url: '/categories/featured'
      };
    }

    if (!this.foundBanner) {
      this.foundBanner = this.banner;
    }
  }

  ngAfterViewInit() {
    console.log('==== fallback autoplay ====');
    if (this.bannerVideo?.nativeElement) {
      const video = this.bannerVideo.nativeElement;
      video.muted = true;
      video.play().catch((err) => {
        console.log('Autoplay prevented:', err);
      });
    }
  }

  goToBannerURL(banner?: any) {
    this.bannerUrl.emit(banner || true);
  }

  // ngOnInit(): void {
  //   console.log('foundBanner::', this.foundBanner);
  //   console.log('banner::', this.banner);
  // }
}
