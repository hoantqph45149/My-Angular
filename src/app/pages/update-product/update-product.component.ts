import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup = {} as FormGroup;
  id: number | string = '';
  constructor(
    private sv: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      thumbnail: [''],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sv.getProduct(this.id).subscribe((res) => {
      this.productForm.patchValue(res);
    });
  }
  handleSubmit() {
    if (this.productForm.valid) {
      this.sv
        .updateProduct(this.id, this.productForm.value)
        .subscribe((res) => {
          console.log(`update product successfully : ${res}`);
          this.router.navigate(['/home']);
        });
    }
  }
}
