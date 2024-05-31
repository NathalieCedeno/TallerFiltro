export interface Persona{
    id?: number,
    cedula: string,
    nombre: string,
    apellido: string,
    fechaNacimiento: Date,
    genero: number,
    correo: string,
    direccion: string,
    estado?: boolean
}