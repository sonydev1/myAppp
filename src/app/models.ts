
export interface Actividad{
    id: string;
    titulo: string;
    punto: number;
    actividadI: Date;
    actividadF: Date;
}


export interface User {
  uid: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  ndocumento: string;
  email: string;
  telefono: string;
  programa: string;
  foto: string;
  puntoAcomulado: number;
  puntoTotal: number;
}
