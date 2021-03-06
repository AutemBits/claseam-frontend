import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HorarioComponent } from '../horario/horario.component';
import { MateriaComponent } from '../materia/materia.component';
import { SubjectService } from '../_services/subject.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../_services/group.service';

import {FormBuilder} from '@angular/forms';
export interface DialogData {
  hola: string;
}



interface Periodo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  materias: object;
  grupo: object;
  registroGrupo;
  constructor(
    private formBuilder: FormBuilder,
    private servicio: GroupService,
    private serve: SubjectService,
    public dialog: MatDialog,
    public dialogReff: MatDialogRef<GrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { 
      this.registroGrupo = this.formBuilder.group({
        Group: '',
        Calendar: '',
        Subject: ''
      });
    }


  periodo: Periodo[] = [
    {value: 'Enero-Abril', viewValue: 'Enero-Abril'},
    {value: 'Mayo-Agosto', viewValue: 'Mayo-Agosto'},
    {value: 'Septiembre-Diciembre', viewValue: 'Septiembre-Diciembre'}
  ];


  Lunes: number;
  Martes: number;
  Miercoles: number;
  Jueves: number;
  Viernes: number;

  horario;
  dialogRef;

  openHorario(): void {
    this.dialogRef = this.dialog.open(HorarioComponent, {
      width: '450px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openMateria(): void {
    this.dialogRef = this.dialog.open(MateriaComponent, {
      width: '450px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
      this.serve.obtenerMateria().subscribe((data: any[]) => {
        console.log(data);
        this.materias = data;
    });
  }

  onSubmit(registerData) {
    console.warn('datos de registro', registerData);
    this.servicio.crearGrupo(registerData).subscribe((data: any[]) => {
      console.log(data);
      this.grupo = data;
    });
  }


}
