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

  // ngOnInit(): void {
  //   console.log('foundBanner::', this.foundBanner);
  //   console.log('banner::', this.banner);
  // }

  goToBannerURL(banner?: any) {
    this.bannerUrl.emit(banner || true);
  }
}
