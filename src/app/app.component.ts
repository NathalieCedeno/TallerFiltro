import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

//Interfaces
import { Genero } from './models/Genero';
import { Persona } from './models/Persona';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DatePipe,
    RouterOutlet,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taller-mat';
  minDate: Date;
  maxDate: Date;
  form: FormGroup;

  genero: Genero[] = [
    { id: 1, valor: 'Masculino' },
    { id: 2, valor: 'Femenino' },
  ];

  listaPersona: Persona[] = [
    {
      id: 1,
      cedula: "1234567890",
      nombre: "Juan",
      apellido: "Pérez",
      fechaNacimiento: new Date(1990, 5, 15),
      genero: 1,
      correo: "juan@example.com",
      direccion: "Calle 123",
      estado: true
    },
    {
      id: 2,
      cedula: "0987654321",
      nombre: "María",
      apellido: "González",
      fechaNacimiento: new Date(1985, 8, 25),
      genero: 2,
      correo: "maria@example.com",
      direccion: "Avenida Principal",
      estado: false
    },
    {
      id: 3,
      cedula: "1357924680",
      nombre: "Carlos",
      apellido: "Sánchez",
      fechaNacimiento: new Date(1982, 3, 10),
      genero: 1,
      correo: "carlos@example.com",
      direccion: "Plaza Central"
    }
  ];

  displayedColumns: string[] = ['id', 'cedula', 'nombre', 'apellido', 'fechaNacimiento', 'genero', 'correo', 'direccion', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.listaPersona);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregarPersona() {
    const persona: Persona = {
      cedula: this.form.value.cedula,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fechaNacimiento: this.form.value.fechaNacimiento,
      genero: this.form.value.genero,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
    }

    persona.id = this.listaPersona.length + 1,
      persona.estado = true;

    this.listaPersona.push(persona);
    console.log(this.listaPersona)

    this.dataSource = new MatTableDataSource(this.listaPersona);
    this.mensaje("registrado");
    this.form.reset();
  }

  mensaje(texto: string) {
    this._snackBar.open(`La Persona fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

}
