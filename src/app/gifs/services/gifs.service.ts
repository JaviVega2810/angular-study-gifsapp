import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs-interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'QuZw3SjI2kM20IiMNvNkUNJJ04mP470K';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query:string){

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 5);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=QuZw3SjI2kM20IiMNvNkUNJJ04mP470K&q=${query}&limit=10`)
    .subscribe( ( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }

  
}
