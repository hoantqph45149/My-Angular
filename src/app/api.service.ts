import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  register() {}
  login() {}
  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  getProduct(id?: string | number) {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }
  createProduct(product: Product) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }
  updateProduct(id: string | number, product: Product) {
    return this.http.patch(`${this.apiUrl}/products/${id}`, product);
  }
  deleteProduct(id?: string | number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
