import { DadosService } from './dados.service';
import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) {

  }

  ngOnInit() {
      this.dadosService.obterDados().subscribe(
        dados => {
          this.dados = dados;
          this.init();
        });
  }

  /**
   * inicializa a API de gráficos com delay de 1s,
   * o que permite a integração da API com o Angular.
   * @return void
   */

  init(): void{
    if(typeof(google) !== 'undefined'){
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * método chamado assim que a API de gráficos é iniciada.
   * Responsável por chamar os métodos geradores dos gráficos.
   * @return void
   */

  exibirGraficos(): void{
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
    this.exibirDonutChart();
  }

  /**
   * exibe o gráfico do Pie Chart
   * @return void
   */

  exibirPieChart(): void{
    const pc = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(pc);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * exibe o grafico Pie Chart em 3D.
   * @return void
   */

  exibir3dPieChart(): void{
    const pc = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(pc);
    const options = this.obterOpcoes();

    options['is3D'] = true;
    chart.draw(this.obterDataTable(), options);
  }

  /**
   * exibe o grafico Donut Chart
   * @return void
   */

  exibirDonutChart(): void{
    const dc = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(dc);
    const options = this.obterOpcoes();

    options['pieHole'] = 0.4;
    chart.draw(this.obterDataTable(), options);
  }

  /**
   * exibe o grafico Bar Chart
   * @return void
   */

  exibirBarChart(): void{
    const bc = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(bc);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * exibe o gráfico Line Chart
   * @return void
   */
  exibirLineChart(): void{
    const lc = document.getElementById('line_chart')
    const chart = new google.visualization.LineChart(lc);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * exibe o gráfico Column Chart
   * @return void
   */
  exibirColumnChart(): void{
    const cc = document.getElementById('column_chart')
    const chart = new google.visualization.ColumnChart(cc);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }


  /**
   * Cria e retorna o objeto DataTable da API de gráficos, 
   * responsável por definir os dados do gráfico
   */
  obterDataTable(): any{
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * retorna as opções do gráfico, que incluem o título 
   * e tamanho do gráfico
   * @return any
   */

  obterOpcoes(): any{
    return {
      'title': 'Quantidade de cadastros do primeiro semestre',
      'width': 400,
      'height': 300
    };
  }
}
