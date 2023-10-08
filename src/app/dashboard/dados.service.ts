import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  readonly dados = [
    ['Janeiro', 35],
    ['Fevereiro', 20],
    ['Março', 57],
    ['Abril', 12],
    ['Maio', 5],
    ['Junho', 90]
  ];

  constructor() { }

  /**
   * retorna um observable contendo os dados a serem exibidos no gráfico
   * 
   * @returns Observale <any>
   */

  obterDados(): Observable<any> {
    return new Observable(observable => {
      observable.next(this.dados);
      observable.complete();
    })
  }
}
