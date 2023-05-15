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

   // График
   renderChart(distIntervals, distValues);

   // Числовые хар-ки
   let x = 0;
   for (let i = 0; i < inputSelection.length; i++) {
      x += Number(inputSelection[i]);
   }
   x /= seriesSize;
   document.getElementById('x-chosen').innerHTML = x;

   let D = 0;
   for (let i = 0; i < inputSelection.length; i++) {
      D += Math.pow(inputSelection[i] - x, 2);
   }
   D /= seriesSize;

   document.getElementById('D').innerHTML = D;

   document.getElementById('sigma').innerHTML = Math.sqrt(D);

   let S = 0;
   for (let i = 0; i < inputSelection.length; i++) {
      S += Math.pow(inputSelection[i] - x, 2);
   }
   S /= (seriesSize - 1)

   document.getElementById('S').innerHTML = Math.sqrt(S);



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