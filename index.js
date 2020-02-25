var table = document.getElementById('table');
var input_grid = [];
var grid = [];
for (var i = 0; i < 9; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    var input_row = [];
    for (var j = 0; j < 9; j++) {
        var input = document.createElement('input');
        input.type = "text";
        input.maxLength = '1';
        input.minLength = '1';
        row.appendChild(input);
        input_row.push(input);
        input.style.border = '1px solid black';
        input.style.borderLeft = "0px"; 
        input.style.borderTop = "0px";
        if (i == 0) {
            input.style.borderTop = '1px solid black';
        } 
        if (j == 0) {
            input.style.borderLeft = '1px solid black';
        }
        if (j !=0 && j != 8 && (j+1)%3 == 0) {
            input.style.borderRight = "3px solid black"
        }
        if (i !=0 && i != 8 && (i+1)%3 == 0) {
            input.style.borderBottom = "3px solid black"
        }
    }

    input_grid.push(input_row);
    table.appendChild(row);
}

for (var i = 0; i < 9; i++) {
    var row = [];
    for (var j = 0; j < 9; j++) {
        row.push(0);
    }
    grid.push(row);
}

var solve_button = document.getElementById('solve');
var reset_button = document.getElementById('reset');
var found = false;

solve_button.addEventListener('click', () => {
    var valid = true;

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            grid[i][j] = 0;
        }
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (input_grid[i][j].value == '') {
                grid[i][j] = 0;
                input_grid[i][j].style.background = "";
            } else {
                if (check(input_grid[i][j].value) == false) {
                    valid = false;
                }
                if (ok(i, j, Number(input_grid[i][j].value)) == false) {
                    valid = false;
                }
                grid[i][j] = Number(input_grid[i][j].value);
                input_grid[i][j].style.background = "lightgreen";
            }
        }
    }

    if (valid) {
        solve();
    } else {
        alert("Invalid Input");
    }
});

reset_button.addEventListener('click', () => {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            input_grid[i][j].value = '';
            grid[i][j] = 0;
            input_grid[i][j].style.background = "";
        }
    }
    found = false;
});

function check(s) {
    switch (s) {
        case '1': case '2': case '3': case '4': case '5':
        case '6': case '7': case '8': case '9':
            return true;
        default: return false;
    }
}

function ok(y, x, k) {
    for (var i = 0; i < 9; i++) {
        if (grid[y][i] == k) { return false; }
        if (grid[i][x] == k) { return false; }
    }

    var p = Math.floor(y/3);
    var q = Math.floor(x/3);

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grid[3*p + i][3*q + j] == k) { return false; }
        }
    }

    return true;
}

function solve() {
    if (found) { return ; }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
           // console.log("hello", i, j, grid[i][j]);
            if (grid[i][j] === 0) {
                for (var k = 1; k <= 9; k++) {
                    if (ok(i, j, k)) {
                        //console.log(i, j);
                        grid[i][j] = k;
                        solve();
                        grid[i][j] = 0;
                    }
                }
                return ;
            }
        }
    }

    console.log(grid);
    found = true;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            input_grid[i][j].value = grid[i][j];
        }
    }
}

