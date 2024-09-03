import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { config } from 'node:process';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm: FormGroup = {} as FormGroup;
  constructor(
    private sv: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      thumbnail: [''],
    });
  }

  handleSubmit() {
    if (this.productForm.valid) {
      if (confirm('Do you want to add more product?')) {
        this.sv.createProduct(this.productForm.value).subscribe((res) => {
          console.log(`create product successfully : ${res}`);
          this.router.navigate(['/home']);
        });
      }
    }
  }
}
