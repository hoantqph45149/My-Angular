import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTextColor]',
  standalone: true,
})
export class HighlightDirective {
  @Input() defaultColor: string = 'black';
  @Input('appTextColor') highlightColor: string = 'blue';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setColor(this.defaultColor); // Thiết lập màu mặc định
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.highlightColor); // Đổi màu khi di chuột vào
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor(this.defaultColor); // Trở lại màu mặc định khi rời chuột
  }

  private setColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
