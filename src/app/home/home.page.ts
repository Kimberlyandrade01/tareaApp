import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList, IonIcon, AlertController // ⬅️ Correcto: AlertController para Standalone
, IonReorderGroup, IonLabel, IonReorder } from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { addOutline, newspaperOutline, trash } from 'ionicons/icons'; 
// NOTA: Se eliminó la importación de ToastController si no se usa.



// CLAVE PARA LOCALSTORAGE: Debe estar aquí para que toda la clase la reconozca.
const STORAGE_KEY = 'lista_de_tareas'; 




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonReorder, IonLabel,
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
    IonIcon,
    IonReorderGroup
],
})





export class HomePage implements OnInit {
confirmarEliminarTarea(_t24: number) {
throw new Error('Method not implemented.');
}
    
  nuevaTarea: string = '';
  tareas: string[] = [];

  constructor(private alertController: AlertController) {
    // Inicialización de íconos
    addIcons({trash,newspaperOutline,addOutline}); 
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

    if (tareaTexto === '') {return;} // Evita agregar tareas vacías

    // Verifica si la tarea ya existe (ignorando mayúsculas/minúsculas)

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

async eliminarTarea(index: number) {
  const alert = await this.alertController.create({
    header: 'Confirmar eliminación',
    message: '¿Estás segura de que deseas eliminar esta tarea?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.tareas.splice(index, 1);
          this.guardarTareas(); // guardar después de eliminar
        }
      }
    ]
  });

  await alert.present();
}

reordenarTareas(event: any) {
  const itemMove = this.tareas.splice(event.detail.from, 1)[0];
  this.tareas.splice(event.detail.to, 0, itemMove);
  event.detail.complete();
  this.guardarTareas(); // 🔄 Guardar el nuevo orden en localStorage
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





