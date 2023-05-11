function factorial(n) {
   var result = 1n;
   for (let i = 1n; i <= BigInt(n); i++) {
      result = result * i;
   }
   return result;
}

function teleProbability(n, m, k) {

   let sequenceK = factorial(parseInt(k[0], 10));
   for (let i = 1; i < k.length; i++) {
      sequenceK *= factorial(parseInt(k[i], 10));
   }

   let x = Number(factorial(m));
   let y = Number(sequenceK);
   let z = Number((n ** m));

   let answer = x / y / z;

   return answer;
}



function changeVisibility() {
   document.getElementById('resultBtn').style.display = "block";
   document.getElementById('answer').style.display = "none";
}

function changeVisibility2() {
   document.getElementById('resultBtn2').style.display = "block";
   document.getElementById('answer2').style.display = "none";
}

// Функция для создания ячейки
function createCell(value) {
   const cell = document.createElement('td');
   cell.textContent = value;
   return cell;
}

// Функция для создания строки
function createRow(cells) {
   const row = document.createElement('tr');
   cells.forEach((cell) => {
      row.appendChild(cell);
   });
   return row;
}


function createStatArray(inputArray) {
   const statArray = [];

   inputArray.forEach((value) => {
      let found = false;

      // Поиск значения в статистическом массиве
      for (let i = 0; i < statArray.length; i++) {
         if (statArray[i][0] === value) {
            statArray[i][1]++;
            found = true;
            break;
         }
      }

      // Если значение не найдено, добавить его в статистический массив
      if (!found) {
         statArray.push([value, 1]);
      }
   });

   return statArray;
}

function statTableCreate(statSeries, tableBody) {
   if (tableBody) tableBody.innerHTML = ''; // Очистка содержимого таблицы
   const row1 = createRow([]);
   for (var i = 0; i < statSeries.length; i++) {
      row1.appendChild(createCell(statSeries[i][0]));
   }

   // Добавление первой строки в таблицу
   tableBody.appendChild(row1);

   // Создание второй строки таблицы
   const row2 = createRow([]);
   for (var i = 0; i < statSeries.length; i++) {
      row2.appendChild(createCell(statSeries[i][1]));
   }

   // Добавление второй строки в таблицу
   tableBody.appendChild(row2);
}

function sumProbs(statSeries, n) {
   let sum = 0;
   for (let i = 0; i < n; i++) {
      sum += Number(statSeries[i][1]);
   }
   return sum;
}

function distribution(container, statSeriesRel) {
   container.innerHTML = '';
   let func = [];
   $(container).append(`<div>F(x <= ${statSeriesRel[0][0]}) = 0</div>`);
   func.push([-Number.MAX_VALUE, Number(statSeriesRel[0][0]), 0]);
   for (let i = 1; i < statSeriesRel.length; i++) {
      $(container).append(`<div>F(x < ${statSeriesRel[i - 1][0]} <= ${statSeriesRel[i][0]}) = ${sumProbs(statSeriesRel, i).toFixed(4)}</div>`);
      func.push([Number(statSeriesRel[i - 1][0]), Number(statSeriesRel[i][0]),Number(sumProbs(statSeriesRel, i).toFixed(4))])
   }
   $(container).append(`<div>F(x > ${statSeriesRel[statSeriesRel.length - 1][0]}) = 1</div>`);
   func.push([Number(statSeriesRel[statSeriesRel.length - 1][0]), Number.MAX_SAFE_INTEGER, 1]);
   console.log(func);
   return func;
}

function renderChart(func) {
   var svg = d3.select('#distribution-chart')
     .append('svg')
     .attr('width', 500)
     .attr('height', 300);
 
   var xMin = func[1][0]; // Начало второго интервала
   var xMax = func[func.length - 2][1]; // Конец предпоследнего интервала
 
   var xScale = d3.scaleLinear()
     .domain([xMin-5, xMax+5])
     .range([50, 450]);
 
   var yScale = d3.scaleLinear()
     .domain([0, 1])
     .range([250, 50]);
 
   svg.selectAll('line')
     .data(func)
     .enter()
     .append('line')
     .attr('x1', function (d) { return xScale(d[0]); })
     .attr('x2', function (d) { return xScale(d[1]); })
     .attr('y1', function (d) { return yScale(d[2]); })
     .attr('y2', function (d) { return yScale(d[2]); })
     .attr('stroke', 'blue')
     .attr('stroke-width', 2);
 
   svg.append('g')
     .attr('transform', 'translate(50, 0)')
     .call(d3.axisLeft(yScale));
 
   svg.append('g')
     .attr('transform', 'translate(0, 250)')
     .call(d3.axisBottom(xScale));
 }
 






function calculate_4() {
   // Пример использования
   let inputSelection = document.getElementById('selectionInput').value || document.getElementById('selectionInputFile').value;

   inputSelection = inputSelection
      .split(' ')
      .sort((a, b) => a - b);
   const seriesSize = inputSelection.length;
   $('#variation-series')
      .empty()
      .append(inputSelection.join(', '));

   const statSeries = createStatArray(inputSelection);
   let statSeriesRel = Array.from(statSeries, subArray => subArray.slice());
   for (let i = 0; i < statSeries.length; i++) {
      statSeriesRel[i][1] /= seriesSize;
      statSeriesRel[i][1] = Number(statSeriesRel[i][1].toFixed(4));
   }



   statTableCreate(statSeries, document.getElementById('stat-series'));

   statTableCreate(statSeriesRel, document.getElementById('stat-series-relative'));

   const distributionFunc = distribution(document.getElementById('distribution'), statSeriesRel);

   renderChart(distributionFunc);

}



function comb_no_repeat(n, k) {
   return factorial(n) / factorial(k) / factorial(n - k);
}

function calculate_5() {
   var elsCount = BigInt(parseInt(document.getElementById('elementsCount').value, 10));
   var choseElsCount = BigInt(parseInt(document.getElementById('choseElementsCount').value, 10));
   var elsInTypeCount = document.getElementById('elementsInTypeCount').value.split(' ');
   var amongElsCount = document.getElementById('amongElementsCount').value.split(' ');

   let total = comb_no_repeat(elsCount, choseElsCount);
   let AAA = 1n;
   for (let i = 0n; i < choseElsCount; i++) {
      AAA *= comb_no_repeat(BigInt(elsInTypeCount[i]), BigInt(amongElsCount[i]));
   }

   let answer = Number(AAA) / Number(total);

   document.getElementById('answer2').textContent = answer.toString(10);

   document.getElementById('resultBtn2').style.display = "none";
   document.getElementById('answer2').style.display = "block";
}