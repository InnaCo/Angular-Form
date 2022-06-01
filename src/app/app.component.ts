import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import Swal from 'sweetalert2';


import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

export interface user {
  nombre: string;
  apellidos: string;
  edad: any;
  dni: string;
  cumpleanos: any;
  colorFavorito: string;
  sexo: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(public dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);}

  name: string = "";


  columnsToDisplay: string[] = ["nombre", "apellidos","edad","dni", "cumpleanos", "colorFavorito", "sexo", "actions"];
  public USER_DATA: user[] = [];
  public newUser = {nombre: "", apellidos: "", edad:"", dni:"", cumpleanos:"", colorFavorito:"", sexo:""};
  public myDataArray: any;


  addUser() {
    if(this.newUser.nombre!=""&&this.newUser.apellidos!=""&&this.newUser.edad!=""&&this.newUser.dni!=""&&this.newUser.cumpleanos!=""&&this.newUser.colorFavorito!=""&&this.newUser.sexo!=""){
      const newUsersArray = this.USER_DATA;
      newUsersArray.push(this.newUser);
      this.myDataArray = [...newUsersArray];
      this.newUser = {nombre:"", apellidos: "", edad:"", dni:"", cumpleanos:"", colorFavorito:"", sexo:""};
    //console.warn(this.myDataArray);
    }else{
      Swal.fire('Invalid input values!')
      //Swal.fire('Invalid input values!')
    }

  }

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value, key)=>{
      return value.nombre != row_obj.nombre;
    });
    this.myDataArray = [...this.USER_DATA];//refresh the dataSource
    Swal.fire('Deleted successfully!')
  }




  openDialog(row_obj:any): void {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: row_obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.USER_DATA = result;
      if(this.USER_DATA!=undefined){
        if(this.name==""){


        } else{
          row_obj.userName=this.USER_DATA
          const newUsersArray = this.USER_DATA;
          this.myDataArray = [...newUsersArray];
          Swal.fire('Updated successfully!')
        }

      }


    });
  }

  ngOnInit() {

  }



}
