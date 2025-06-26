import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCheckbox,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonBadge,
  IonIcon,
} from '@ionic/angular/standalone';
import { Category } from '../models/category.model';
import { Task } from '../models/task.model';
import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonBadge,
    IonIcon,
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  newTaskTitle = '';
  selectedCategory = '';
  loading = true;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.tasks = await this.taskService.getTasks();
      this.categories = await this.categoryService.getCategories();
    } finally {
      this.loading = false;
    }
  }

  async addTask() {
    if (this.newTaskTitle.trim()) {
      console.log('Intentando agregar tarea:', this.newTaskTitle);

      const newTask: Task = {
        id: Date.now().toString(),
        title: this.newTaskTitle.trim(),
        completed: false,
        category: this.selectedCategory,
      };

      try {
        const success = await this.taskService.addTask(newTask);

        if (success) {
          console.log('Tarea creada, actualizando vista...');
          // FORZAR LA ACTUALIZACIÓN DE LA VISTA
          this.tasks = await this.taskService.getTasks();
          console.log('Tareas actualizadas:', this.tasks);

          this.newTaskTitle = '';
          this.selectedCategory = '';

          // Cambio adicional para forzar detección de cambios
          this.tasks = [...this.tasks];
        } else {
          console.error('Error al guardar la tarea');
        }
      } catch (error) {
        console.error('Error en addTask:', error);
      }
    }
  }

  async updateTask(task: Task) {
    await this.taskService.updateTask(task);
    this.tasks = await this.taskService.getTasks();
  }

  async deleteTask(taskId: string) {
    const success = await this.taskService.deleteTask(taskId);
    if (success) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : '';
  }
}
