

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
   for (let i = 1; i < statSeriesRel.length; i++) {
      $(container).append(`<div>F(x < ${statSeriesRel[i - 1][0]} <= ${statSeriesRel[i][0]}) = ${sumProbs(statSeriesRel, i).toFixed(4)}</div>`);
      func.push([Number(statSeriesRel[i - 1][0]), Number(statSeriesRel[i][0]), Number(sumProbs(statSeriesRel, i).toFixed(4))])
   }
   $(container).append(`<div>F(x > ${statSeriesRel[statSeriesRel.length - 1][0]}) = 1</div>`);

   return func;
}

function renderChart(intervals, values) {
   const canvas = document.getElementById('graphCanvas');
   const context = canvas.getContext('2d');
   const height = canvas.height - 90; // Высота с учетом отступов
   const width = canvas.width - 60; // Ширина с учетом отступов
   const intervalWidth = width / intervals.length;
   const maxValue = Math.max(...values);
   const offset = 60;

   context.clearRect(0, 0, canvas.width, canvas.height);
   context.textAlign = 'center';

   context.lineWidth = 1;
   // Рисуем ось X
   context.beginPath();
   context.moveTo(offset, height + offset);
   context.lineTo(width + offset, height + offset);
   context.stroke();

   // Рисуем стрелку на конце оси X
   context.beginPath();
   context.moveTo(width + offset - 10, height + offset - 6);
   context.lineTo(width + offset, height + offset);
   context.lineTo(width + offset - 10, height + offset + 6);
   context.closePath();
   context.fill();

   // Рисуем ось Y
   context.beginPath();
   context.moveTo(offset, offset);
   context.lineTo(offset, height + offset);
   context.stroke();

   // Рисуем стрелку на конце оси Y
   context.beginPath();
   context.moveTo(offset - 6, offset);
   context.lineTo(offset + 6, offset);
   context.lineTo(offset, offset - 10);
   context.closePath();
   context.fill();


   // Рисуем горизонтальные линии и точки на стыках интервалов
   for (let i = 0; i < intervals.length; i++) {
      const x = i * intervalWidth + offset;
      const y = height - (values[i] / maxValue * height) + offset;
      context.font = '12px Arial';
      context.lineWidth = 2;
      // Рисуем горизонтальную линию
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + intervalWidth, y);
      context.stroke();
      context.lineWidth = 1;

      // Рисуем точку на стыке интервалов, кроме последнего
      if (i < intervals.length - 1) {
         context.beginPath();
         context.arc(x + intervalWidth, y, 4, 0, 2 * Math.PI);
         context.fill();
         context.beginPath();
         context.fillStyle = 'white'
         context.arc(x + intervalWidth, y, 2, 0, 2 * Math.PI);
         context.fill();
      }
      context.fillStyle = 'black';

      if (i > 0 && i < intervals.length - 1) {
         // Отмечаем значения на оси y черточками
         context.beginPath();
         context.moveTo(offset + 10, y);
         context.lineTo(offset - 10, y);
         context.stroke();
      }
      if (i > 0) {
         // Отмечаем значения на оси x черточками
         context.beginPath();
         context.moveTo(x, height + offset - 10);
         context.lineTo(x, height + offset + 10);
         context.stroke();

         // Подписываем интервалы
         context.fillText(intervals[i][0], x, height + 25 + offset);
      }
      // Подписываем значения
      context.fillText(values[i], 20, y);
   }

}

selectionInputFile.addEventListener('input', (event) => {
   const file = event.target.files[0];
   const reader = new FileReader();

   reader.onload = (e) => {
      const fileContent = e.target.result;
      const floatArray = fileContent.split(/\s+/).map(parseFloat);
      document.getElementById('selectionInput').setAttribute('value', floatArray.join(' '));
      console.log(floatArray);
    };

    reader.readAsText(file);
});

function checkHandle(container, checkbox) {
   checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
         container.style.display = 'block'; // показать div
      } else {
         container.style.display = 'none'; // скрыть div
      }
   });
}

const varCheck = document.getElementById('varCheck');
const statCheck = document.getElementById('statCheck');
const statRelCheck = document.getElementById('statRelCheck');
const empCheck = document.getElementById('empCheck');
const numericCheck = document.getElementById('numericsCheck');

const checksContainers = [document.getElementById('var-ser'), document.getElementById('stat-ser'), document.getElementById('stat-ser-rel'), document.getElementById('emp-ser'), document.getElementById('numerics')];
const cheks = [varCheck, statCheck, statRelCheck, empCheck, numericCheck];

for (let i = 0; i < cheks.length; i++) {
   checkHandle(checksContainers[i], cheks[i]);
}

async function calculate_4() {
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

   // функция распределения
   const distributionFunc = distribution(document.getElementById('distribution'), statSeriesRel);

   // Интервалы
   let distIntervals = [[-Number.MAX_SAFE_INTEGER, distributionFunc[0][0]]];
   for (let i = 0; i < distributionFunc.length; i++) {
      distIntervals.push([distributionFunc[i][0], distributionFunc[i][1]]);
   }
   distIntervals.push([distributionFunc[distributionFunc.length - 1][1], Number.MAX_SAFE_INTEGER]);

   // Значения на интервалах
   let distValues = [0];
   for (let i = 0; i < distributionFunc.length; i++) {
      distValues.push(distributionFunc[i][2]);
   }
   distValues.push(1);
   console.log("intervals: " + distIntervals);
   console.log("Vals: " + distValues);

   const intervals = [];
   const xes = distIntervals.filter((value, index, array) => array.indexOf(value) === index);;
   const relFreqs = distValues;
   relFreqs.shift();
   relFreqs.pop();
   xes.shift();
   xes.pop();
   intervals.push({
      mean: xes[0][0],
      relativeFrequency: 0
   });
   for (let i = 0; i < relFreqs.length; i++) {
      const x = xes[i];
      intervals.push({
         mean: x[1],
         relativeFrequency: relFreqs[i]
      });
   }
   console.log(intervals);

   const task1_empDistGroupedFunc = document.getElementById('task1_empDist');
   const task1_empDistGroupedResponse = await fetch('/task1_emp_dist', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         intervals: intervals
      })
   });
   const task1_empDistGroupedData = await task1_empDistGroupedResponse.json();
   const task1_empDistGroupedSvgImage = task1_empDistGroupedData.image;
   const task1_empDistGroupedHeader = '<h5>Эмпирическая функция распределения</h5>';
   const task1_emoDistBody = ''; 
   const task1_empDistGrouped = '<div>' + atob(task1_empDistGroupedSvgImage) + '</div>' + task1_empDistGroupedData.html;
   task1_empDistGroupedFunc.innerHTML = task1_empDistGroupedHeader + task1_empDistGrouped + task1_emoDistBody;

   // График
   // renderChart(distIntervals, distValues);

   // Числовые хар-ки
   let x = 0;
   for (let i = 0; i < inputSelection.length; i++) {
      x += Number(inputSelection[i]);
   }
   x /= seriesSize;
   x = x.toFixed(4);
   katex.render(`\\frac{1}{n} \\sum_{i=1}^{n} x_i = \\frac{1}{${statSeries.length}} \\sum_{i=1}^{${statSeries.length}} x_i = ${x}`, document.getElementById('x-selected'));


   let D = 0;
   for (let i = 0; i < inputSelection.length; i++) {
      D += Math.pow(inputSelection[i] - x, 2);
   }
   D /= seriesSize;
   D = D.toFixed(4);
   katex.render(`\\sum_{i=1}^{n} n_i (x_i - \\overline{x_в})^2 = \\sum_{i=1}^{${statSeries.length}} n_i (x_i - ${x})^2 = ${D}`, document.getElementById('D'));

   let sigma = Math.sqrt(D).toFixed(4);
   katex.render(`\\sqrt{D_в} = \\sqrt{${D}} = ${sigma}`, document.getElementById('sigma'));

   let S = 0;
   for (let i = 0; i < inputSelection.length; i++) {
      S += Math.pow(inputSelection[i] - x, 2);
   }
   S /= (seriesSize - 1)
   S = Math.sqrt(S);
   S = S.toFixed(4);
   katex.render(`\\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - x_в)^2}{n-1}} = \\sqrt{\\frac{\\sum_{i=1}^{${statSeries.length}}(x_i - ${x})^2}{${statSeries.length - 1}}} = ${S}`, document.getElementById('S'));
}

const dataInput = document.getElementById('data-input-values');
const fileInput = document.getElementById('data-input-file');
const intervalsInput = document.getElementById('data-input-intervals');
const processDataButton = document.getElementById('task2-process-data');

const frequencySeriesContainer = document.getElementById('frequencySeriesWrapper');
const groupedSeriesContainer = document.getElementById('groupedSeriesWrapper');

const frequencyHistogram = document.getElementById('frequencyHistogramWrapper');
const relativeFrequencyHistogram = document.getElementById('relativeFrequencyHistogramWrapper');
const groupedFrequencySeriesPolygon = document.getElementById('groupedFrequencySeriesPolygonWrapper');
const groupedRelativeFrequencySeriesPolygon = document.getElementById('groupedRelativeFrequencySeriesPolygonWrapper');

const empDistFunc = document.getElementById('empiricalDistributionWrapper');
const empDistGroupedFunc = document.getElementById('empiricalDistributionForGroupedWrapper');

fileInput.addEventListener('input', (event) => {
   const file = event.target.files[0];
   const reader = new FileReader();

   reader.onload = (e) => {
      const fileContent = e.target.result;
      const floatArray = fileContent.split(/\s+/).map(parseFloat);
      document.getElementById('data-input-values').setAttribute('value', floatArray.join(' '));
      console.log(floatArray);
    };

    reader.readAsText(file);
});

function makeIntervals(data, intervalsCount) {
   const min = Math.min(...data);
   const max = Math.max(...data);
   const range = max - min;
   const intervalWidth = range / intervalsCount;
   const totalDataPoints = data.length;

   // Создаём интервалы
   const intervals = [];
   let left = min, right = min + intervalWidth;
   for (let i = 0; i < intervalsCount; i++) {
      intervals.push({
         min: left,
         max: right,
         mean: (left + right) / 2,
         frequency: 0,
         relativeFrequency: 0,
         intervalWidth: intervalWidth
      });
      left = right;
      right += intervalWidth;
   }

   // Заполняем интервалы частотами
   data.forEach((e) => {
      for (let i = 0; i < intervalsCount; i++) {
         if (intervals[i].min <= e && e < intervals[i].max) {
            intervals[i].frequency++;
         } else if (i == intervalsCount - 1 && intervals[i].min < e && e <= intervals[i].max) {
            intervals[i].frequency++;
         }
      }
   });

   // Вычисляем относительные частоты
   for (let i = 0; i < intervalsCount; i++) {
      intervals[i].relativeFrequency = intervals[i].frequency / totalDataPoints;
   }

   return intervals;
}

const intervalSeriesCheck = document.getElementById('interval-series-check');
const groupSeriesCheck = document.getElementById('group-series-check');
const hystogramsCheck = document.getElementById('hystograms-check');
const polygonsCheck = document.getElementById('polygons-check');
const empFunctionCheck = document.getElementById('emp-function-check');
const numericsCheck = document.getElementById('numerics-check');

function toggle(element) {
   if (element.style.display === 'none') {
      element.style.display = 'block';
   } else {
      element.style.display = 'none';
   }
}

intervalSeriesCheck.addEventListener('click', function () {
   toggle(frequencySeriesContainer);
});

groupSeriesCheck.addEventListener('click', function () {
   toggle(groupedSeriesContainer);
});

hystogramsCheck.addEventListener('click', function () {
   toggle(document.getElementById('hist'));
});

polygonsCheck.addEventListener('click', function () {
   toggle(document.getElementById('poly'));
});

empFunctionCheck.addEventListener('click', function () {
   toggle(document.getElementById('task2_emp_func'));
});

numericsCheck.addEventListener('click', function () {
   toggle(document.getElementById('numeric-charachetirstics'));
});

const checkings = [intervalSeriesCheck, groupSeriesCheck, hystogramsCheck,
   polygonsCheck, empFunctionCheck, numericsCheck];

const containersForChecking = [document.getElementById('frequencySeriesWrapper'),
document.getElementById('groupedSeriesWrapper'),
document.getElementById('hist'), document.getElementById('poly'),
document.getElementById('task2_emp_func'),
document.getElementById('numeric-charachetirstics')];

document.getElementById('task2-process-data').addEventListener('click', async function () {
   const series = dataInput.value.split(/\s+/).map(Number);
   const intervalsCount = parseInt(intervalsInput.value);
   const intervals = makeIntervals(series, intervalsCount);
   const min = Math.min(...series);
   const max = Math.max(...series);
   const range = max - min;
   const intervalWidth = range / intervalsCount;
   const totalDataPoints = series.length;

   // ***************************

   let header1 = "<h5>Интервальный ряд распределения частот и относительных частот</h5>";
   let intervalsValue = "<tr>" + "<td>Интервалы</td>";
   let freqs = "<tr>" + "<td>ni</td>";
   let relFreqs = "<tr>" + "<td>wi</td>";

   for (let i = 0; i < intervals.length; i++) {
      const start = min + i * intervals[i].intervalWidth;
      const end = start + intervals[i].intervalWidth;

      intervalsValue += "<td>" + `${start.toFixed(2)};${end.toFixed(2)}` + "</td>";
      freqs += "<td>" + intervals[i].frequency + "</td>";
      relFreqs += "<td>" + intervals[i].relativeFrequency.toFixed(2) + "</td>";
   }
   freqs += "</tr>";
   relFreqs += "</tr>";

   let results = header1 + '<table>' + '<tbody class="table-responsive">' + intervalsValue + freqs + relFreqs + "</tbody>" + '</table>';

   let header2 = "<h5>Групповой ряд распределения частот и относительных частот</h5>"
   let xes = "<tr>" + "<td>x*i</td>";
   for (let i = 0; i < intervals.length; i++) {
      xes += "<td>" + intervals[i].mean.toFixed(2) + "</td>";
   }
   xes += "</tr>";

   let group = header2 + '<table>' + '<tbody class="table-responsive">' + xes + freqs + relFreqs + "</tbody>" + '</table>';

   frequencySeriesContainer.innerHTML = results;
   groupedSeriesContainer.innerHTML = group;

   // ***************************
   document.getElementById('numeric-charachetirstics').innerHTML = '<h5>Числовые характеристики</h5> \
   <p>Среднее значение (xв):</p> \
   <p id="mean" class="katex"></p> \
   <p>Дисперсия:</p> \
   <p id="variance" class="katex"></p> \
   <p>Среднее квадратическое отклонение:</p> \
   <p id="meanSquareDeviation" class="katex"></p> \
   <p>Стандартое отклонение:</p> \
   <p id="stdDeviation" class="katex"></p>';

   const sample = series;
   const n = sample.length;

   // Среднее значение (xв)
   const mean = (sample.reduce((sum, value) => sum + value, 0) / n).toFixed(2);
   katex.render(`\\frac{1}{n} \\sum_{i=1}^{n} x_i = \\frac{1}{${sample.length}} \\sum_{i=1}^{${sample.length}} x_i = ${mean}`, document.getElementById('mean'));

   // Дисперсия (Dв)
   const variance = (sample.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n).toFixed(2);
   katex.render(`\\sum_{i=1}^{n} n_i (x_i - \\overline{x_в})^2 = \\sum_{i=1}^{${sample.length}} n_i (x_i - ${mean})^2 = ${variance}`, document.getElementById('variance'));

   //  Среднее квадратическое отклонение (oв)
   const meanSquareDeviation = Math.sqrt(variance).toFixed(2);
   katex.render(`\\sqrt{D_в} = \\sqrt{${variance}} = ${meanSquareDeviation}`, document.getElementById('meanSquareDeviation'));

   // Стандартное отклонение (S)
   const stdDeviation = Math.sqrt(sample.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (n - 1)).toFixed(2);
   katex.render(`\\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - x_в)^2}{n-1}} = \\sqrt{\\frac{\\sum_{i=1}^{${sample.length}}(x_i - ${mean})^2}{${sample.length - 1}}} = ${stdDeviation}`, document.getElementById('stdDeviation'));

   // ***************************

   const histResponse = await fetch('/task2_hist', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         series: series,
         intervals: intervalsCount
      })
   });
   const histData = await histResponse.json();
   const histSvgImage = histData.image;
   const histHeader = '<h5>Гистограмма интервального ряда частот</h5>';
   const hist = '<div>' + atob(histSvgImage) + '</div>';
   frequencyHistogram.innerHTML = histHeader + hist;

   const relHistResponse = await fetch('/task2_hist_rel', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         series: series,
         intervals: intervalsCount
      })
   });
   const relHistData = await relHistResponse.json();
   const relHistSvgImage = relHistData.image;
   const relHistHeader = '<h5>Гистограмма интервального ряда относительных частот</h5>';
   const relHist = '<div>' + atob(relHistSvgImage) + '</div>';
   relativeFrequencyHistogram.innerHTML = relHistHeader + relHist;

   const polygonResponse = await fetch('/task2_polygon', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         intervals: intervals
      })
   });
   const polygonData = await polygonResponse.json();
   const polygonSvgImage = polygonData.image;
   const polygonHistHeader = '<h5>Полигон группированного ряда распределения частот</h5>';
   const polygon = '<div>' + atob(polygonSvgImage) + '</div>';
   groupedFrequencySeriesPolygon.innerHTML = polygonHistHeader + polygon;

   const relPolygonResponse = await fetch('/task2_polygon_rel', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         intervals: intervals
      })
   });
   const relPolygonData = await relPolygonResponse.json();
   const relPolygonSvgImage = relPolygonData.image;
   const relPolygonHistHeader = '<h5>Полигон группированного ряда распределения относительных частот</h5>';
   const relPolygon = '<div>' + atob(relPolygonSvgImage) + '</div>';
   groupedRelativeFrequencySeriesPolygon.innerHTML = relPolygonHistHeader + relPolygon;

   const empDistResponse = await fetch('/task2_emp_dist', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         intervals: intervals
      })
   });
   const empDistData = await empDistResponse.json();
   const empDistSvgImage = empDistData.image;
   const empDistHeader = '<h5>Эмпирическая функция распределения интервального ряда</h5>';
   const empDist = '<div>' + atob(empDistSvgImage) + '</div>';
   empDistFunc.innerHTML = empDistHeader + empDist;

   const empDistGroupedResponse = await fetch('/task2_emp_dist_grouped', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         intervals: intervals
      })
   });
   const empDistGroupedData = await empDistGroupedResponse.json();
   const empDistGroupedSvgImage = empDistGroupedData.image;
   const empDistGroupedHeader = '<h5>Эмпирическая функция распределения группированного ряда</h5>' + empDistGroupedData.html;
   const empDistGrouped = '<div>' + atob(empDistGroupedSvgImage) + '</div>';
   empDistGroupedFunc.innerHTML = empDistGroupedHeader + empDistGrouped;
});