const screen = document.getElementById('screen');

function clearScreen() {
    screen.value = '';
}

function deleteCharacter() {
    screen.value = screen.value.slice(0, -1);
}

function appendCharacter(character) {
    screen.value += character;
}

function calculate() {
    try {
        screen.value = eval(screen.value);
    } catch (error) {
        screen.value = 'Error';
    }
}
