function factorial(n){
   var result = 1n;
   for(let i = 1n; i <= BigInt(n); i++){
      result = result * i;
   }
   return result;
}

function teleProbability(n,m,k){

   let sequenceK = factorial(parseInt(k[0], 10));
   for(let i = 1; i < k.length; i++){
      sequenceK *= factorial(parseInt(k[i], 10));
   }

   let x = Number(factorial(m));
   let y = Number(sequenceK);
   let z = Number((n**m));

   let answer = x/y/z;

   return answer;
}



function changeVisibility()
{
   document.getElementById('resultBtn').style.display = "block";
   document.getElementById('answer').style.display = "none";
}

function changeVisibility2()
{
   document.getElementById('resultBtn2').style.display = "block";
   document.getElementById('answer2').style.display = "none";
}

function calculate_4(){
   var sequence = document.getElementById('sequenceInput').value.split(" ");
   var teleCount = BigInt(parseInt(document.getElementById('teleCountInput').value, 10));
   var channelCount = BigInt(parseInt(document.getElementById('channelCountInput').value, 10));

   var answer = teleProbability(channelCount, teleCount, sequence);

   document.getElementById("answer").textContent = answer.toString(10);

   document.getElementById('resultBtn').style.display = "none";
   document.getElementById('answer').style.display = "block";
}

function comb_no_repeat(n, k){
   return factorial(n) / factorial(k) / factorial(n-k);
}

function calculate_5(){
   var elsCount = BigInt(parseInt(document.getElementById('elementsCount').value, 10));
   var choseElsCount = BigInt(parseInt(document.getElementById('choseElementsCount').value, 10));
   var elsInTypeCount = document.getElementById('elementsInTypeCount').value.split(' ');
   var amongElsCount = document.getElementById('amongElementsCount').value.split(' ');

   let total = comb_no_repeat(elsCount, choseElsCount);
   let AAA = 1n;
   for(let i = 0n; i < choseElsCount; i++){
      AAA *= comb_no_repeat(BigInt(elsInTypeCount[i]), BigInt(amongElsCount[i]));
   }

   let answer = Number(AAA) / Number(total);

   document.getElementById('answer2').textContent = answer.toString(10);

   document.getElementById('resultBtn2').style.display = "none";
   document.getElementById('answer2').style.display = "block";
}