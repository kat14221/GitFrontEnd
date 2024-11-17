import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MedicoService } from '../../medico/services/medico.service';
import { Medico } from '../../medico/models/medico';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { Especialidad } from '../../especialidad/models/especialidad';
import { EspecialidadService } from '../../especialidad/services/especialidad.service';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule,
    ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule, SidebarComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent {
  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' }
  ];
  especialidades: Especialidad[] = [];
  medicos!: Medico[];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  medico = new Medico(0, '', '', '1', new Especialidad(0, ''));

  constructor(
    private medicoService: MedicoService, 
    private messageService: MessageService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit() {
    this.listarMedicos();
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.especialidadService.getEspecialidads().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (error) => {
        console.error('Error al cargar las especialidades', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las especialidades',
        });
      }
    });
  }

  listarMedicos() {
    this.medicoService.getMedicos().subscribe((data) => {
      this.medicos = data;
    });
  }

  deleteMedico(id: number) {
    this.isDeleteInProgress = true;
    this.medicoService.deleteMedico(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Médico eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarMedicos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el médico',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Médico';
    this.opc = 'Editar';
    this.medicoService.getMedicobyID(id).subscribe((data) => {
      this.medico = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Médico';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.medico = {
      id: 0,
      nombre: '',
      apellido: '',
      estado: '1',
      especialidad: {
        id: 0,
        nombre: ''
      }
    };
  }

  addMedico(): void {
    if (!this.medico.nombre || this.medico.nombre.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre del médico no puede estar vacío',
      });
      return;
    }

    this.medicoService.crearMedico(this.medico).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Médico registrado',
        });
        this.listarMedicos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el médico',
        });
      },
    });
    this.visible = false;
  }
  
  updateMedico() {
    this.medicoService.updateMedico(this.medico.id, this.medico).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Médico editado',
        });
        this.listarMedicos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar el médico',
        });
      },
    });
    this.visible = false;
  }
}
