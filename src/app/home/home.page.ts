import { Component, NgModule } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular'; 
import {} from 'ionicons/icons';
import {addIcons}from 'ionicons'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {
  nuevaTarea: string = '';
  tareas: string[] = [];
  // 1. AlertController ya inyectado en el constructor
  constructor(private alertController: AlertController) {
    addIcons({addOutline: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'});
  }

  agregarTarea() {
    const tareaTexto = this.nuevaTarea.trim();

    // Si el input está vacío, simplemente salimos de la función
    if (tareaTexto === '') {
      return;
    }

    // --- 🤖 Lógica de Validación de Tarea Duplicada ---
    // Usamos .find() para verificar si ya existe una tarea con el mismo nombre (ignorando mayúsculas/minúsculas)
    const tareaDuplicada = this.tareas.find(tareaExistente => 
        tareaExistente.toLowerCase() === tareaTexto.toLowerCase()
    );

    if (tareaDuplicada) {
      // 🛑 Tarea duplicada: Llama a la nueva función de alerta
      this.mostrarAlertaDuplicada(tareaTexto);
    } else {
      // ✅ Tarea única: Agrégala
      this.tareas.push(tareaTexto);
      this.nuevaTarea = ''; // Limpiar el input
    }
  }

  // 2. Nuevo método para mostrar la alerta
  async mostrarAlertaDuplicada(tarea: string) {
    const alert = await this.alertController.create({
      header: 'AVISO', 
      message: `La tarea <strong>"${tarea}"</strong> ya existe o está duplicada.`, 
      buttons: ['ACEPTAR'] 
    });

    await alert.present();
  }
  // --- Fin de la Lógica de Validación ---

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule, // 👈 agregar aquí
    IonicModule,
    HomePage
  ]
})
export class HomePageModule {}