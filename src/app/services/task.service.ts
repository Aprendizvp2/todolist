import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private storageReady = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.storageReady = true;
    await this.loadTasks();
  }

  private async loadTasks() {
    if (this.storageReady) {
      const storedTasks = await this.storage.get('tasks');
      this.tasks = storedTasks || [];
    }
  }

  private async saveTasks() {
    if (this.storageReady) {
      await this.storage.set('tasks', this.tasks);
    }
  }

  async getTasks(): Promise<Task[]> {
    if (!this.storageReady) {
      await this.initStorage();
    }
    console.log('Obteniendo tareas:', this.tasks); // Agrega este log
    return [...this.tasks];
  }

  async addTask(task: Task): Promise<boolean> {
    console.log('Service - Recibida tarea para agregar:', task);

    if (!task.title?.trim()) {
      console.error('Service - Tarea sin título válido');
      return false;
    }

    try {
      // Crear nueva referencia del array para forzar detección de cambios
      this.tasks = [...this.tasks, task];
      console.log('Service - Tarea agregada al array local:', this.tasks);

      await this.saveTasks();
      console.log('Service - Tarea guardada en almacenamiento');

      return true;
    } catch (error) {
      console.error('Service - Error al guardar tarea:', error);
      // Revertir el cambio
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      return false;
    }
  }

  async updateTask(task: Task): Promise<boolean> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      await this.saveTasks();
      return true;
    }
    return false;
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    if (this.tasks.length !== initialLength) {
      await this.saveTasks();
      return true;
    }
    return false;
  }
}
