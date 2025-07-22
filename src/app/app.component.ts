import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FORM_TYPE } from './core/constants/storage-keys';
import { FORM_TYPE_VALUE } from './core/constants/form-type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.checkFormType();
  }
  checkFormType() {
    const formType = localStorage.getItem(FORM_TYPE);
    if (!formType) {
      localStorage.setItem(FORM_TYPE, FORM_TYPE_VALUE.modal);
    }
  }
}
