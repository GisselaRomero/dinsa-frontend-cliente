import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bannerofertas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bannerofertas.component.html',
  styleUrls: ['./bannerofertas.component.css']
})
export class BannerofertasComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  mensaje: string = '';
tipoBanner: string = 'principal';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }
subirBanner() {
  if (!this.selectedFile) {
    this.mensaje = "Por favor selecciona una imagen.";
    return;
  }

  const formData = new FormData();
  formData.append('imagen', this.selectedFile);
  formData.append('tipo', this.tipoBanner);

  this.http.post('http://localhost:3000/banner', formData)
    .subscribe({
next: (res: any) => {
    this.mensaje = `✅ Banner ${this.tipoBanner} subido correctamente.`;
    this.selectedFile = null;
    this.previewUrl = null;

    // Emitir evento o recargar HomeComponent
    window.dispatchEvent(new Event('bannerActualizado'));
},

      error: () => {
        this.mensaje = `❌ Error al subir el banner ${this.tipoBanner}.`;
      }
    });
}



}
