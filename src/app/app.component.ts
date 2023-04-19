import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import {SankeyController, Flow} from 'chartjs-chart-sankey';
Chart.register(SankeyController, Flow);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit
{
  constructor() { }
  ngOnInit(): void {
    this.RenderChart();
  }
  RenderChart(){
    type ColorMap = {
      [key: string]: string;
    }
    const colors:ColorMap = {
      a: 'red',
      b: 'green',
      c: 'blue',
      d: 'gray'
    };
    
    const getColor = (key: string) => colors[key];
    
    // const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    const chart = new Chart('myChart', {
      type: 'sankey',
      data: {
        datasets: [{
          label: 'My sankey',
          data: [
            {from: 'a', to: 'b', flow: 10},
            {from: 'a', to: 'c', flow: 5},
            {from: 'b', to: 'c', flow: 10},
            {from: 'd', to: 'c', flow: 7}
          ],
          colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
          colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
          colorMode: 'gradient', // or 'from' or 'to'
          /* optional labels */
          labels: {
            a: 'Label A',
            b: 'Label B',
            c: 'Label C',
            d: 'Label D'
          },
          
          /* optional priority */
          priority: {
            b: 1,
            d: 0
          },
          /* optional column overrides */
          column: {
            d: 1
          },
          size: 'max', // or 'min' if flow overlap is preferred
        }]
      },
      options: 
      {
        responsive:false,
        layout: 
        {
          padding: {
             left: 40,
             right: 40,
          }
        },
        interaction:
        {
          mode:'nearest'
        }
      }
    });
    
  }
}
