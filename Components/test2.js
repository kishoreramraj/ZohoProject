import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Test2Component extends Component {

  @tracked head = {};
  @tracked data = {};

  @action
  reqestFun(choice) {
    // console.log(choice);
    var num1 = 'key=' + choice;

    var req = new XMLHttpRequest();
    let obj = {};
    let chartData = {};

    try {
      req.onload = function () {
        obj = JSON.parse(this.responseText);
      };
    } catch (error) {
      console.log(error);
    }

    req.open('post', 'http://localhost:8080/demoMaven1/demoServlet2', false);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(num1);

    // console.log("Heading: __" + obj[0]);
    chartData = obj[0];
    this.head = obj[1];
    obj.splice(0, 2);
    this.data = obj;
    // console.log(Object.keys(obj[0]).length);
    var keyArr1 = [];
    var valueArr1 = [];

    if (chartData.key == "pie") {
      for (var i = 0; i < obj.length; i++) {
        var month = {};
        month.name = obj[i].key;
        month.y = parseInt(obj[i].value);
        valueArr1.push({ ...month });
      }
    }
    else{
      for (var i = 0; i < obj.length; i++) {
        keyArr1[i] = obj[i].key;
        valueArr1[i] = parseInt(obj[i].value);
      }
    }
    // keyArr1.shift();
    // valueArr1.shift();

    // console.log(keyArr1);
    // console.log(valueArr1);

    Highcharts.chart('container1', {
      chart: {
        type: chartData.key,
      },
      title: {
        text: 'Stacked column chart',
      },
      xAxis: {
        categories: keyArr1,
      },
      yAxis: {
        min: 0,
        title: {
          text: this.head.value,
        },
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          marker: {
            enabled: false
          },
        }
      },
      series: [
        {
          name: this.head.key,
          data: valueArr1,
        },
      ],
    });

    // let table = document.createElement('table');
    // let thead = document.createElement('thead');
    // let tbody = document.createElement('tbody');

    // table.appendChild(thead);
    // table.appendChild(tbody);
    // table.setAttribute('border', '2');
    // table.setAttribute('align', 'center');

    // // Adding the entire table to the body tag
    // document.getElementById('table').appendChild(table);

    // let row_1 = document.createElement('tr');
    // let heading_1 = document.createElement('th');
    // heading_1.innerHTML = obj[0].key;
    // let heading_2 = document.createElement('th');
    // heading_2.innerHTML = obj[0].value;
    // // let heading_3 = document.createElement('th');
    // // heading_3.innerHTML = "Company";

    // row_1.appendChild(heading_1);
    // row_1.appendChild(heading_2);
    // thead.appendChild(row_1);

    // // Creating and adding data to second row of the table
    // for (var temp = 0; temp < obj.length - 1; temp++) {
    //   let row_2 = document.createElement('tr');
    //   let row_2_data_1 = document.createElement('td');
    //   row_2_data_1.innerHTML = keyArr1[temp];
    //   let row_2_data_2 = document.createElement('td');
    //   row_2_data_2.innerHTML = valueArr1[temp];

    //   row_2.appendChild(row_2_data_1);
    //   row_2.appendChild(row_2_data_2);
    //   tbody.appendChild(row_2);
    // }
  }

}