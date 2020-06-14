import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000';
  private readonly TOKEN = 'token';
  public codeUser: string;
  public userType: string;
  constructor(private http: HttpClient, private nav: NavController) { }

  async isLoggedIn() {
    // logica para obtener el token en el localStorage, si existe y no esta expirado entonces proceder
    try {
      const resp = await this.validateToken();
      console.log('esta logeado?', resp);
      return resp;
    } catch (err) {
      console.log('error', err);
      return false;
    }
  }

  async login(user: { code: string, password: string }) {
    return await this.http.post(`${this.API_URL}/OAuth/iniciar`, {
      codigo: +user.code,
      nip: user.password
    }).pipe(
      tap(token => {
        console.log(token);
        if (token['ok']) {
          this.saveCredentials(user.code, token['token']);
        }
      }),
      map(response => {
        return response['ok'];
      })
    ).toPromise();
  }

 /* getUsuario(id_usuario: string) {
    return this.http.get(`${this.API_URL}/usuario/?id=${id_usuario}`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }*/

  /*modifyUsuario(
    usuario: {
      nombres: string,
      apellidos: string,
      area_adscripcion: string,
      plaza_laboral: string,
      nss: string
    }
){
  return this.http.put(`${this.API_URL}/usuario`, {
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    area_adscripcion: usuario.area_adscripcion,
    plaza_laboral: usuario.plaza_laboral,
    numero_social: usuario.nss
  }).pipe(
      tap(resp => {
        console.log(resp);
        if (resp['ok']) {
          return resp['body'];
        }
      }),
      map(response => {
        return response['ok'];
      })
  ).toPromise();
}*/

/*async createUser(user: { programa_evento
  code: Number,
  name: string,
  lastname: string,
  nip: string,
  area_adscripcion: string,
  plaza_laboral: string,
  numero_social:  Number,
  date: string
}) {
  return await this.http.post(`${this.API_URL}/usuario`, {
    codigo: user.code,
    nombres: user.name,
    apellidos: user.lastname,
    tipo_usuario: "P",
    nip: user.nip,
    area_adscripcion: user.area_adscripcion,
    plaza_laboral: user.plaza_laboral,
    fecha_creacion: user.date,
    numero_social: user.numero_social
  }).pipe(
    tap(token => {
      if (token['ok']) {
        this.saveCredentials(user.code.toString(), token['token']);
      }
    }),
    map(response => {
      return response['ok'];
    })
  ).toPromise();

}*/

async validateToken() {
  return await this.http.post(`${this.API_URL}/OAuth/validar`, null).pipe(
    map(response => {
      console.log('Validar token:', response);
      if (response['ok']) {
        this.codeUser = response['body'][0]['codigo'];
        this.userType = response['body'][0]['tipo_usuario'];
      }
      return response['ok'];
    })
  ).toPromise();
}

private saveCredentials(code: string, token: any) {
  localStorage.removeItem(this.TOKEN);
  localStorage.setItem(this.TOKEN, token);
  localStorage.setItem('id_usuario', code);
}

restorePassword(data) {
  return this.http.put(`${this.API_URL}/OAuth/recuperar`, {
    codigo: data.code,
    nombres: data.name,
    apellidos: data.lastname,
    numero_social: data.imss,
    nueva_contraseña: data.newpassword
  }).pipe(
    map(response => {
      return response;
    })
  );
}

changePassword(value) {
  return this.http.post(`${this.API_URL}/OAuth/cambiar`, {
    password: value.password,
    changeToken: value.token
  }).pipe(
    map(response => {
      return response;
    })
  );
}

logout() {
  console.log('Cerrar Sesión');
  this.codeUser = null;
  this.userType = null;
  localStorage.clear();
  window.location.reload();
  this.nav.navigateRoot('/login', { animated: true });
}

getProd(codigo){
  let token = localStorage.getItem(this.TOKEN);
  let headers1 = new HttpHeaders({
    'Authorization': token
  });
  console.log()
  this.http.get(`${this.API_URL}/pro/${codigo}`, { headers: headers1}).subscribe((data)=>{console.log(data)});
}

}
