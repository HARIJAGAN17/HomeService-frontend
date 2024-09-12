import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private viewportScroller: ViewportScroller,private route:Router) {}

  scrollTo(section: string): void {

    this.route.navigateByUrl("/home/landing");
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}
