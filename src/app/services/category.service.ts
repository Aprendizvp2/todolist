import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.loadCategories();
  }

  private async loadCategories() {
    const storedCategories = await this.storage.get('categories');
    this.categories = storedCategories || [];
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async addCategory(category: Category) {
    this.categories.push(category);
    await this.storage.set('categories', this.categories);
  }

  async updateCategory(category: Category) {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index] = category;
      await this.storage.set('categories', this.categories);
    }
  }

  async deleteCategory(categoryId: string) {
    this.categories = this.categories.filter(c => c.id !== categoryId);
    await this.storage.set('categories', this.categories);
  }
}