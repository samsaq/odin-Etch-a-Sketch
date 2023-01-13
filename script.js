//Initializes a 16 x 16 grid of divs using gridItem and gridRow classes to do so and appends them to the class gridContainer div
function initializeGrid() {
    for (let i = 0; i < 16; i++) {
        let row = document.createElement('div');
        row.classList.add('gridRow');
        for (let j = 0; j < 16; j++) {
            let item = document.createElement('div');
            item.classList.add('gridItem');
            row.appendChild(item);
        }
        document.querySelector('.gridContainer').appendChild(row);
    }
}

//function to remove all children of class gridContainer div
function removeGrid() {
    const gridContainer = document.querySelector('.gridContainer');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

//function to generate a grid into gridContainer class (a variable version of initializeGrid)
function generateGrid(size) //size is the number of rows and columns
{
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('gridRow');
        for (let j = 0; j < size; j++) {
            let item = document.createElement('div');
            item.classList.add('gridItem');
            row.appendChild(item);
        }
        document.querySelector('.gridContainer').appendChild(row);
    }
}

//function to change the color of the div to a random rgb value, and add the colored class to it
//we will also add a data-key color intensity value to the div & increase it each time the grid is colored
//this will allow us to change the color of the divs to a darker shade each time it is colored
function colorGrid(e) { //this function will be called each time a gridItem is hovered over
    const gridItem = e.target;
    if (!gridItem.classList.contains('colored')) //uncolored grid items are set to a random rgb value and the class is added
    {
        gridItem.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        gridItem.classList.add('colored');
        gridItem.dataset.key = 1;
    }
    else if (gridItem.dataset.key < 10)
    //if the colored class is there and the key value less than 10, intensify the color by 10% and increase the key by 1
    {
        //lower the rgb values of the color by 10% to darken it
        let color = gridItem.style.backgroundColor;
        let colorArray = color.split(',');
        colorArray[0] = Math.floor(colorArray[0] * 0.9);
        colorArray[1] = Math.floor(colorArray[1] * 0.9);
        colorArray[2] = Math.floor(colorArray[2] * 0.9);
        gridItem.style.backgroundColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
        gridItem.dataset.key++;
    }
}

//function to reset the grid to its original state
//removes the colored class and sets the background color to white
function resetGrid() {
    const gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(item => {
        item.classList.remove('colored');
        item.style.backgroundColor = 'white';
    });
}

//adding an event listener to the reset button to call the resetGrid function
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGrid);

//adding an event listener to the create new grid button to call the generateGrid function, uses the grid size input value
//if the input value is not a number or is less than 1 or greater than 100, the grid will not be generated
//if a grid already exists, it will be removed before the new grid is generated
const newGridButton = document.querySelector('#createGrid');
newGridButton.addEventListener('click', () => {
    const gridSize = document.querySelector('#gridSize').value;
    if (!isNaN(gridSize) && gridSize >= 1 && gridSize <= 100) {
        removeGrid();
        generateGrid(gridSize);
    }
});

//adding an event listener to all gridItems to call colorGrid function when they are hovered over
const gridItems = document.querySelectorAll('.gridItem');
gridItems.forEach(item => {
    item.addEventListener('mouseover', alert(e));
});

//function to change a gridItem's color to black
function blackGrid(e) {
    const gridItem = e.target;
    gridItem.style.backgroundColor = 'black';
}

initializeGrid();