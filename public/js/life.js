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
      var element = document.getElementById(i+','+j);
      if(grid[i][j] == 1) element.setAttribute("class", "alive");
      else element.setAttribute("class", "dead");
    }
  }
}

function setTile(i, j) {
  if(live == true) {
    grid[i][j] = 1;
  }
  else grid[i][j] = 0;
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

function clickTile(i, j) {
  document.getElementById(i + "," + j).setAttribute("class", "alive");
  setTile(i, j);
}

function hoverTile(i, j) {
  var element = document.getElementById(i + "," + j);
  if(mousedown  == true) {
    if(live == true) element.setAttribute("class", "alive");
    else element.setAttribute("class", "dead");
    setTile(i, j);
  }
}

function toggleLive() {
  live = !live;
  if(live) document.getElementById('togglelive').value = "Alive";
  else document.getElementById('togglelive').value = "Dead";
}

window.onmouseup = function() {
  mousedown = false;
}

window.onmousedown = function() {
  mousedown = true;
}

var DIM = 30;
var live = true;
var upd_grid;
var grid = getNewArray();
var timer;
var mousedown = false;
tick();
