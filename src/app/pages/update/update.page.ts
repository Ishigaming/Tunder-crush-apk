import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Se mantiene para la navegación del footer

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
    standalone: false,
})
export class UpdatePage implements OnInit {

    profileForm: FormGroup;
    // Datos de ejemplo para las pasiones del usuario
    passions: string[] = ['Harry potter', 'Music', 'Loli'];

    constructor(
        private fb: FormBuilder,
        private toastController: ToastController,
        private router: Router
    ) {
        // 1. Inicialización del formulario reactivo
        this.profileForm = this.fb.group({
            firstName: ['Jane', Validators.required],
            lastName: ['Doe', Validators.required],
            country: ['Colombia', Validators.required],
            // Otros campos que podrías añadir:
            // bio: ['Me encanta viajar.', Validators.maxLength(150)],
        });
    }

    ngOnInit() {
    }
    
    // ===========================================
    // LÓGICA DE MANEJO DE DATOS
    // ===========================================

    /**
     * Simula el envío de datos al servidor para actualizar el perfil.
     */
    saveProfile() {
        if (this.profileForm.valid) {
            const updatedData = {
                ...this.profileForm.value,
                passions: this.passions // Añadimos las pasiones
            };
            
            console.log('Datos del perfil actualizados:', updatedData);

            // Simulación de una llamada API exitosa
            this.presentToast('✅ Perfil actualizado con éxito!', 'success');
            
            // Opcional: Redirigir al usuario de vuelta a la página principal
            // setTimeout(() => {
            //     this.router.navigateByUrl('/home');
            // }, 1500);

        } else {
            this.presentToast('❌ Por favor, rellena todos los campos requeridos.', 'danger');
        }
    }
    
    /**
     * Agrega una nueva pasión a la lista (simulación).
     */
    addPassion(newPassion: string) {
        if (newPassion && !this.passions.includes(newPassion)) {
            this.passions.push(newPassion);
            console.log('Pasión añadida:', newPassion);
        }
    }

    /**
     * Elimina una pasión de la lista.
     */
    removePassion(passionToRemove: string) {
        this.passions = this.passions.filter(p => p !== passionToRemove);
        console.log('Pasión eliminada:', passionToRemove);
    }
    
    /**
     * Simulación de subida de media (fotos/videos).
     */
    uploadMedia() {
        this.presentToast('📂 Abriendo selector de archivos...', 'primary');
    }

    // ===========================================
    // FUNCIONES DE UTILIDAD
    // ===========================================
    
    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
            color: color
        });
        toast.present();
    }
    
    // ===========================================
    // FUNCIONES DEL FOOTER (Se mantienen para navegación)
    // ===========================================
    public goToChats() {
        this.router.navigateByUrl('/chats');
    }

    public goToHome() {
        this.router.navigateByUrl('/home');
    }
    
    public goToProfileUpdate() {
        this.router.navigateByUrl('/update'); 
    }
}