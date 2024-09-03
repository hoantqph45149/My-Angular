import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private sv: ApiService) {}
  ngOnInit(): void {
    this.sv.getProducts().subscribe((res) => (this.products = res));
  }
  deleteProduct(id?: string | number) {
    if (confirm('Do you want to delete this product?')) {
      this.sv.deleteProduct(id).subscribe((res) => {
        this.products = this.products.filter((product) => product.id !== id);
      });
    }
  }
}
