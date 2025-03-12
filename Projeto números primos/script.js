function abrirPDF() {
    window.open("questao/Questões sobre números primos com gabarito.pdf", "_blank");
}

let maxNumber = 100;
const grid = document.getElementById("grid");

function createGrid() {
    grid.innerHTML = "";
    for (let i = 2; i <= maxNumber; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = i;
        cell.onclick = () => markMultiples(i);
        grid.appendChild(cell);
    }
}

function markMultiples(num) {
    document.querySelectorAll(".cell").forEach(cell => {
        if (parseInt(cell.textContent) % num === 0 && parseInt(cell.textContent) !== num) {
            cell.classList.add("marked");
        }
    });
}

function resetGrid() {
    createGrid();
}

function reduceNumbers() {
    if (maxNumber > 10) {
        maxNumber -= 10;
        createGrid();
    }
}

function addNumbers() {
    if (maxNumber < 200) {
        maxNumber += 10;
        createGrid();
    }
}

function displayPrimes() {
    document.querySelectorAll(".cell").forEach(cell => {
        let num = parseInt(cell.textContent);
        if (!isPrime(num)) cell.classList.add("marked");
        
    });
    document.getElementsByName.innerHTML="Só sobraram os primos";
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

createGrid();