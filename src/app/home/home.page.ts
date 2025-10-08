import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonList, 
  IonIcon,
  AlertController // ⬅️ Correcto: AlertController para Standalone
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { addOutline, newspaperOutline } from 'ionicons/icons'; 
// NOTA: Se eliminó la importación de ToastController si no se usa.

// CLAVE PARA LOCALSTORAGE: Debe estar aquí para que toda la clase la reconozca.
const STORAGE_KEY = 'lista_de_tareas'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonInput, // ⬅️ Agregué IonInput que faltaba en los imports
    IonButton, 
    IonList,
    IonIcon
  ],
})
export class HomePage implements OnInit { 
    
  nuevaTarea: string = '';
  tareas: string[] = [];

  constructor(private alertController: AlertController) {
    // Inicialización de íconos
    addIcons({newspaperOutline, addOutline}); 
  }

  // Se ejecuta al iniciar el componente. Llama a la carga de datos persistentes.
  ngOnInit() {
    this.cargarTareas();
  }

  // ===================================
  // LÓGICA DE PERSISTENCIA (LocalStorage)
  // ===================================

  // Carga las tareas desde LocalStorage
  cargarTareas() {
    const data = localStorage.getItem(STORAGE_KEY);
    
    // Si encuentra datos guardados, los convierte de JSON string a array
    if (data) {
      this.tareas = JSON.parse(data);
    } 
    // Si no hay datos (la primera vez), el array 'this.tareas' se mantiene vacío.
  }

  // Guarda las tareas en LocalStorage
  guardarTareas() {
    // Convierte el array 'tareas' a una cadena JSON para guardarlo
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas));
  }

  // ===================================
  // LÓGICA DE TAREAS Y ACCIONES
  // ===================================

  agregarTarea() {
    const tareaTexto = this.nuevaTarea.trim();

    if (tareaTexto === '') {
      return;
    }

    const tareaDuplicada = this.tareas.find(tareaExistente => 
        tareaExistente.toLowerCase() === tareaTexto.toLowerCase()
    );

    if (tareaDuplicada) {
      this.mostrarAlertaDuplicada(tareaTexto);
    } else {
      this.tareas.push(tareaTexto);
      this.nuevaTarea = ''; // Limpiar el input
      this.guardarTareas(); // ⬅️ PERSISTENCIA: ¡Guardar después de agregar!
      this.mostrarAlertaGuardado(); // ⬅️ ALERTA: Notificación de éxito
    }
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    this.guardarTareas(); // ⬅️ PERSISTENCIA: ¡Guardar después de eliminar!
  }

  // ===================================
  // LÓGICA DE ALERTAS
  // ===================================

  async mostrarAlertaGuardado() {
    const alert = await this.alertController.create({
      header: '¡ÉXITO!',
      message: 'La tarea ha sido agregada correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async mostrarAlertaDuplicada(tarea: string) {
    const alert = await this.alertController.create({
      header: 'AVISO', 
      message: `La tarea <strong>"${tarea}"</strong> ya existe o está duplicada.`, 
      buttons: ['ACEPTAR'] 
    });

    await alert.present();
  }
}