import { Especialidad } from "../../especialidad/models/especialidad";

export class Medico {
    id: number;
    nombre: string;
    apellido: string;
    estado: string;
    especialidad: Especialidad;

    constructor(id: number = 0, nombre: string = '', apellido: string = '', estado: string = '', especialidad: Especialidad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.estado = estado;
        this.especialidad = especialidad;
    }
}
