import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastController, GestureController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    city: string;
    distance: number;
    photo: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false,
})
export class HomePage implements OnInit {

    public users: User[] = [];
    private currentCard: HTMLElement | null = null;

    constructor(
        private toastController: ToastController,
        private gestureController: GestureController,
        private platform: Platform,
        private cdRef: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadUsers();
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.setupSwipeGesture();
        }, 50);
    }

    loadUsers() {
        this.users = [
            { id: 1, name: 'Jane Doe', age: 25, gender: 'Heterosexual', city: 'Cartagena', distance: 1, photo: 'https://i.ibb.co/68vB4zD/Jane-Doe.png' },
            { id: 2, name: 'Carlos Ruíz', age: 28, gender: 'Heterosexual', city: 'Bogotá', distance: 5, photo: 'https://placehold.co/400x600/2a66e4/white?text=Carlos' },
            { id: 3, name: 'Sofía Díaz', age: 22, gender: 'Heterosexual', city: 'Medellín', distance: 2, photo: 'https://placehold.co/400x600/e94d65/white?text=Sofia' },
            { id: 4, name: 'Andrés Gil', age: 30, gender: 'Heterosexual', city: 'Cali', distance: 10, photo: 'https://placehold.co/400x600/4c7f77/white?text=Andres' },
            { id: 5, name: 'Karina Bluu', age: 25, gender: 'Heterosexual', city: 'Cartagena', distance: 12, photo: 'https://pbs.twimg.com/media/Fe3uxBXaMAAZDIE?format=jpg&name=4096x4096' },
        ];
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
    
    public async swipeLeft() {
        if (this.currentCard) {
            const windowWidth = this.platform.width();
            await this.animateExit(windowWidth * -1.5, 'left');
            this.processSwipe('left');
        }
    }

    public async swipeRight() {
        if (this.currentCard) {
            const windowWidth = this.platform.width();
            await this.animateExit(windowWidth * 1.5, 'right');
            this.processSwipe('right');
        }
    }
    
    private processSwipe(direction: 'left' | 'right') {
        if (this.users.length === 0) return;
        const currentUser = this.users[0];
        
        let message = '';
        let color = '';

        if (direction === 'left') {
            message = '❌ Pasaste de ' + currentUser.name;
            color = 'danger';
        } else if (direction === 'right') {
            message = '❤️ Match potencial con ' + currentUser.name;
            color = 'success';
        }

        this.presentToast(message, color);

        this.users.shift();
        this.checkUserList();
        this.cdRef.detectChanges();
        this.setupSwipeGesture();
    }
    
    setupSwipeGesture() {
        if (this.users.length === 0) return;

        this.currentCard = document.querySelector('.user-card') as HTMLElement;

        if (!this.currentCard) return;

        const existingGesture = (this.currentCard as any)._ionicGesture;
        if (existingGesture) {
            existingGesture.destroy();
        }

        const windowWidth = this.platform.width();
        const SWIPE_THRESHOLD = windowWidth / 4;

        const gesture = this.gestureController.create({
            el: this.currentCard,
            gestureName: 'swipe-card',
            onStart: ev => {
            },
            onMove: ev => {
                this.currentCard!.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`;
            },
            onEnd: ev => {
                const deltaX = ev.deltaX;

                if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                    const direction = deltaX > 0 ? 'right' : 'left';
                    const exitX = direction === 'right' ? windowWidth * 1.5 : windowWidth * -1.5;

                    this.animateExit(exitX, direction)
                        .then(() => {
                            this.processSwipe(direction);
                        });

                } else {
                    this.animateReturn();
                }
            }
        });

        (this.currentCard as any)._ionicGesture = gesture;
        gesture.enable(true);
    }
    
    private animateExit(x: number, direction: 'left' | 'right'): Promise<void> {
        return new Promise(resolve => {
            if (this.currentCard) {
                this.currentCard.style.transition = 'transform 0.4s ease-out';
                this.currentCard.style.transform = `translateX(${x}px) rotate(${direction === 'right' ? 10 : -10}deg)`;

                setTimeout(() => {
                    resolve();
                }, 400);
            } else {
                resolve();
            }
        });
    }

    private animateReturn() {
        if (this.currentCard) {
            this.currentCard.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.currentCard.style.transform = 'translateX(0) rotate(0)';
            setTimeout(() => {
                this.currentCard!.style.transition = '';
            }, 300);
        }
    }

    checkUserList() {
        if (this.users.length === 0) {
            console.log('No quedan más usuarios para mostrar.');
        }
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: 'bottom',
            color: color
        });
        toast.present();
    }
}