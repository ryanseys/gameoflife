function getNewArray() {
  var arr = new Array(DIM);
  for (var i = 0; i < DIM; i++) {
    arr[i] = new Array(DIM);
    for(var j = 0; j < DIM; j++) {
      arr[i][j] = Math.round(Math.random());
    }
  }
  return arr;
}

function getEmptyArray() {
  var arr = new Array(DIM);
  for (var i = 0; i < DIM; i++) {
    arr[i] = new Array(DIM);
  }
  return arr;
}

function countNeighbours(grid, x, y) {
  var count = 0;
  if(y != DIM-1 && grid[x][y+1] == 1)                 count++;
  if(y != 0 && grid[x][y-1] == 1)                     count++;
  if(x != DIM-1 && grid[x+1][y] == 1)                 count++;
  if(x != DIM-1 && y != DIM-1 && grid[x+1][y+1] == 1) count++;
  if(x != 0 && grid[x-1][y] == 1)                     count++;
  if(x != 0 && y != DIM-1 && grid[x-1][y+1] == 1)     count++;
  if(x != 0 && y != 0 && grid[x-1][y-1] == 1)         count++;
  if(x != DIM-1 && y != 0 && grid[x+1][y-1] == 1)     count++;
  return count;
}

function updateGrid() {
  upd_grid = getEmptyArray();
  var count;
  for(var i = 0; i < DIM; i++) {
    for(var j = 0; j < DIM; j++) {
      count = countNeighbours(grid, i, j);
      //live cell
      if(grid[i][j] == 1) {
        //Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        if(count < 2) upd_grid[i][j] = 0;
        //Any live cell with two or three live neighbours lives on to the next generation.
        else if(count == 2 || count == 3) upd_grid[i][j] = 1;
        //Any live cell with more than three live neighbours dies, as if by overcrowding.
        else if(count > 3) upd_grid[i][j] = 0;
      }
      //dead cell
      else {
        if(count == 3) upd_grid[i][j] = 1;
      }
    }
  }
  grid = upd_grid;
}

function printGrid() {
  for(var i = 0; i < DIM; i++) {
    for(var j = 0; j < DIM; j++) {
      if(grid[i][j] == 1) document.getElementById(i+','+j).style.backgroundColor = "#000";//innerHTML = "<div style=\"height:100%; width:100%; background-color:#000000; position:relative;\"></div>";
      else document.getElementById(i+','+j).style.backgroundColor = "#FFF";
    }
  }
}

function tick() {
  timer = setTimeout(function() {
    updateGrid();
    printGrid();
    tick();
  }, 200);
}

function toggleTicking() {
  if (timer) {
    clearTimeout(timer);
    timer = 0;
    document.getElementById('toggle').value = "Play";
  }
  else {
    tick();
    document.getElementById('toggle').value = "Pause";
  }
}

var DIM = 30;
var upd_grid;
var grid = getNewArray();
var timer;
tick();
