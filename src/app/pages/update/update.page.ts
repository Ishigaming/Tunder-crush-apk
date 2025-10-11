import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
    standalone: false,
})
export class UpdatePage implements OnInit {

    profileForm: FormGroup;
    passions: string[] = ['Harry potter', 'Music', 'Loli'];

    constructor(
        private fb: FormBuilder,
        private toastController: ToastController,
        private router: Router
    ) {
        this.profileForm = this.fb.group({
            firstName: ['Jane', Validators.required],
            lastName: ['Doe', Validators.required],
            country: ['Colombia', Validators.required],
        });
    }

    ngOnInit() {
    }
    
    saveProfile() {
        if (this.profileForm.valid) {
            const updatedData = {
                ...this.profileForm.value,
                passions: this.passions
            };
            
            console.log('Datos del perfil actualizados:', updatedData);

            this.presentToast('✅ Perfil actualizado con éxito!', 'success');
        } else {
            this.presentToast('❌ Por favor, rellena todos los campos requeridos.', 'danger');
        }
    }
    
    addPassion(newPassion: string) {
        if (newPassion && !this.passions.includes(newPassion)) {
            this.passions.push(newPassion);
            console.log('Pasión añadida:', newPassion);
        }
    }

    removePassion(passionToRemove: string) {
        this.passions = this.passions.filter(p => p !== passionToRemove);
        console.log('Pasión eliminada:', passionToRemove);
    }
    
    uploadMedia() {
        this.presentToast('📂 Abriendo selector de archivos...', 'primary');
    }
    
    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
            color: color
        });
        toast.present();
    }
    
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