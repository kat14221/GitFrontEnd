import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { EspecialidadService } from '../../especialidad/services/especialidad.service';
import { Especialidad } from '../../especialidad/models/especialidad';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule, 
    ConfirmDialogModule, DialogModule, InputTextModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {
  especialidades!: Especialidad[];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  especialidad = new Especialidad(0, '');

  constructor(
    private especialidadService: EspecialidadService, 
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarEspecialidades();
  }

  listarEspecialidades() {
    this.especialidadService.getEspecialidads().subscribe((data) => {
      this.especialidades = data;
    });
  }

  deleteEspecialidad(id: number) {
    this.isDeleteInProgress = true;
    this.especialidadService.deleteEspecialidad(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Especialidad eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarEspecialidades();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la especialidad',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Especialidad';
    this.opc = 'Editar';
    this.especialidadService.getEspecialidadbyID(id).subscribe((data) => {
      this.especialidad = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Especialidad';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.especialidad = {
      id: 0,
      nombre: ''
    };
  }
  
  addEspecialidad(): void {
    if (!this.especialidad.nombre || this.especialidad.nombre.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre de la especialidad no puede estar vacío',
      });
      return;
    }

    this.especialidadService.crearEspecialidad(this.especialidad).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Especialidad registrada',
        });
        this.listarEspecialidades();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la especialidad',
        });
      },
    });
    this.visible = false;
  }
  
  updateEspecialidad() {
    this.especialidadService.updateEspecialidad(this.especialidad.id, this.especialidad).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Especialidad editada',
        });
        this.listarEspecialidades();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar la especialidad',
        });
      },
    });
    this.visible = false;
  }
}
