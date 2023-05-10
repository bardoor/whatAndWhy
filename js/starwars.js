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

function statTableCreate(statSeries, tableBody, divider) {
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
      row2.appendChild(createCell(statSeries[i][1]/divider));
   }

   // Добавление второй строки в таблицу
   tableBody.appendChild(row2);
}

function calculate_4() {
   // Пример использования
   let inputSelection = document.getElementById('selectionInput').value || document.getElementById('selectionInputFile').value;

   inputSelection = inputSelection
      .split(' ')
      .sort((a, b) => a - b);
   $('#variation-series')
      .empty()
      .append(inputSelection.join(', '));
   
   const statSeries = createStatArray(inputSelection);

   statTableCreate(statSeries, document.getElementById('stat-series'), 1);

   statTableCreate(statSeries, document.getElementById('stat-series-relative'), inputSelection.length);




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