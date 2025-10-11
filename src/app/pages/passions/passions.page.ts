import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passions',
  templateUrl: './passions.page.html',
  styleUrls: ['./passions.page.scss'],
  standalone: false,
})
export class PassionsPage implements OnInit {

  passions: string[] = [
    'Harry Potter', 'Music', 'Video games', 'Camping', 'Beer',
    'Yoga', 'Running', 'Travel', 'Instagram', 'Gym',
    'J-Pop', 'K-Pop', 'Skate boarding', 'Reading', 'Lo-Fi',
    'Hiking', 'Meditation', 'Sushi', 'Basketball', 'Football', 'Books'
  ];

  selectedPassions: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {}

  togglePassion(passion: string) {
    const index = this.selectedPassions.indexOf(passion);
    if (index > -1) {
      this.selectedPassions.splice(index, 1);
    } else {
      this.selectedPassions.push(passion);
    }
  }

  isSelected(passion: string): boolean {
    return this.selectedPassions.includes(passion);
  }

  goBack() {
    this.router.navigate(['/birthdate']);
  }

  continue() {
    if (this.selectedPassions.length === 0) {
      alert('Por favor selecciona al menos una pasión');
      return;
    }

    console.log('Passions seleccionadas:', this.selectedPassions);

    this.router.navigate(['/imgprofile']); 
  }
}
