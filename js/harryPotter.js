let houseTotals = [0, 0, 0, 0];
let totalInHouse = "";
let hufflepuffs = [];
let slytherins = [];
let ravenclaws = [];
let gryffindors = [];
let houseNumber = "";
let remainderChildren = 0;
hideElements(false);

document.getElementById("result").innerHTML = " you are in ";
let x = document.getElementById("result");
x.classList.add("result");

function hideElements(flag) {
  document.getElementById("toHide").hidden = flag;
}

function clickOKNumber() {
  totalInHouseValue = document.getElementById('numberOfBeavers').value / 4;
  totalInHouse = Math.ceil(totalInHouseValue);
  hideElements(true);
  for (let j = 0; j < totalInHouse; j++) {
    addBlankRowToTable();
  }
  remainderChildren = document.getElementById('numberOfBeavers').value - (Math.floor(totalInHouseValue) * 4);
}

function isHouseFull(houseNumber) {
  return houseTotals[houseNumber - 1] >= totalInHouse;
}

function addtohouse(houseNumber) {
  houseTotals[houseNumber - 1] += 1;
}

function resetName() {
  document.getElementById("name").value = "";
}


function addBlankRowToTable() {
  let table = document.getElementById("table");
  let newRow = table.insertRow(table.length);
  for (let j = 0; j < 4; j++) {
    let cell = newRow.insertCell(j);
    cell.innerHTML = "";
  }
}

function updateCell(value, j, i) {
  let table = document.getElementById("table");
  let row = table.rows[i];

  if (typeof row === 'undefined') {
    addBlankRowToTable();
    row = table.rows[i];
  }

  let cell = row.cells[j];
  cell.innerHTML = value;
}

function showHouse(houseName, nameInput, houseNumber, houseArray) {
  document.getElementById("result").innerHTML = "<div>" + nameInput + " you are in " + houseName + " house</div>";
  updateCell(nameInput, houseNumber, houseArray.length);
  let result = document.getElementById("result");
  result.classList.remove("result");
  result.classList.add("alternative");
  resetName();
}

function allocateHouse(houseName, houseArray, nameInput, houseNumber) {
  console.log(houseName);
  houseArray.push(nameInput);
  playAudio(houseName, nameInput, houseNumber, houseArray);
  let numberOfHousesFull = getNumberOfHousesFull();
  if (numberOfHousesFull === remainderChildren) {
    totalInHouse -= 1;
  }
}

function getNumberOfHousesFull() {
  let count = 0
  for (let i = 0; i < 4; i++) {
    if (isHouseFull(i)) {
      count += 1;
    }
  }
  return count;
}

function playSound(sound1, houseName, nameInput, houseNumber, houseArray) {
  let audio1 = new Audio(sound1);
  audio1.play();
  audio1.addEventListener('ended', function () {
    window.setTimeout(function () {
      showHouse(houseName, nameInput, houseNumber, houseArray);
      let soundFile = 'audio/' + houseName.toLowerCase() + '.wav';
      let audio2 = new Audio(soundFile);
      audio2.play();
      audio2.addEventListener('ended', function () {
        document.getElementById("hat").classList.remove("spinner");
        document.getElementById('nameEntered').disabled = false;
      });
    }, 1000);
  });

}

function playAudio(houseName, nameInput, houseNumber, houseArray) {
  audioNumber = Math.floor(Math.random() * 5) + 1;
  if (audioNumber === 1) {
    playSound('audio/ahright.wav', houseName, nameInput, houseNumber, houseArray);
  }
  else if (audioNumber === 2) {
    playSound('audio/difficult.wav', houseName, nameInput, houseNumber, houseArray);
  }
  else if (audioNumber === 3) {
    playSound('audio/itsallhere.wav', houseName, nameInput, houseNumber, houseArray);
  }
  else if (audioNumber === 4) {
    playSound('audio/rightok.wav', houseName, nameInput, houseNumber, houseArray);
  }
  else {
    playSound('audio/wheretoputyou.wav', houseName, nameInput, houseNumber, houseArray);
  }
}


function clickOK() {
  document.getElementById("hat").classList.add("spinner");

  let nameInput = document.getElementById('name').value;
  document.getElementById('nameEntered').disabled = true;
  do {
    houseNumber = Math.floor(Math.random() * 4) + 1;
    console.log(houseNumber);
  }
  while (isHouseFull(houseNumber))
  addtohouse(houseNumber);
  console.log(houseTotals);

  if (houseNumber === 1) {
    allocateHouse("Hufflepuff", hufflepuffs, nameInput, houseNumber - 1);
  }
  else if (houseNumber === 2) {
    allocateHouse("Ravenclaw", ravenclaws, nameInput, houseNumber - 1);
  }

  else if (houseNumber === 3) {
    allocateHouse("Slytherin", slytherins, nameInput, houseNumber - 1);
  }
  else {
    allocateHouse("Gryffindor", gryffindors, nameInput, houseNumber - 1);
  }
}

