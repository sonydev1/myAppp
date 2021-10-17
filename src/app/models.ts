
export interface Actividad{
    id: string;
    titulo: string;
    punto: number;
    actividadI: Date;
    actividadF: Date;
    descripcion: string;
}


export interface User {
  uid: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  ndocumento: string;
  email: string;
  telefono: number;
  programa: string;
  foto: string;
  puntoAcomulado: number;
  puntoTotal: number;
}

export interface Listo {
  id: string;
  user: User;
  activdades: Actividad [];
  puntototal: number;
  estado: EstadoActividad;
  fecha: Date;
}

export type EstadoActividad= 'listo' |  'eviado';
