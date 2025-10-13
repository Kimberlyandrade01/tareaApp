import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}

export class HomePage {
  message = '';

  // opción simple: alert del navegador
  showMessage() {
    alert('¡Botón funcionando correctamente! 🎉');
  }}