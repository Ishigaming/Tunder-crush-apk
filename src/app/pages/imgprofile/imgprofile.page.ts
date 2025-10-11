import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-imgprofile',
    templateUrl: './imgprofile.page.html',
    styleUrls: ['./imgprofile.page.scss'],
    standalone: false,
})
export class ImgprofilePage {
    images: string[] = [];

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private storage: AngularFireStorage,
        private router: Router
    ) {}

    async addPhoto() {
        try {
            const image: Photo = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos,
            });

            if (image?.dataUrl) {
                this.images.push(image.dataUrl);
            }
        } catch (error) {
            console.error('Error al seleccionar la imagen:', error);
            alert('No se pudo acceder a la galería o cámara.');
        }
    }

    removeImage(index: number) {
        this.images.splice(index, 1);
    }

    async continue() {
        try {
            const user = await this.afAuth.authState.pipe(first()).toPromise();
            if (!user) {
                alert('Debes iniciar sesión primero.');
                this.router.navigate(['/login']);
                return;
            }

            const uploadedUrls: string[] = [];

            for (let i = 0; i < this.images.length; i++) {
                const imgData = this.images[i];
                const filePath = `users/${user.uid}/photo_${Date.now()}_${i}.jpg`;
                const fileRef = this.storage.ref(filePath);

                const blob = this.dataURLtoBlob(imgData);
                await fileRef.put(blob);
                const url = await fileRef.getDownloadURL().toPromise();
                uploadedUrls.push(url);
            }

            await this.afs.collection('users').doc(user.uid).set(
                { photos: uploadedUrls },
                { merge: true }
            );

            alert('Imágenes guardadas correctamente.');
            this.router.navigate(['/home']);
        } catch (error) {
            console.error('Error al guardar las imágenes:', error);
            alert('No se pudieron guardar las imágenes: ' + (error as any).message);
        }
    }

    private dataURLtoBlob(dataUrl: string): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);
        for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new Blob([u8arr], { type: mime });
    }
}