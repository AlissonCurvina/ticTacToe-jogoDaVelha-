//Função para adicionar o listener em todos os espaços
let positions = document.getElementsByClassName('position')
let button = document.getElementById('giveup')
function addEvents() {
    //Adicionar listener nas posições
    for(let i=0; i<positions.length; i++) {
        positions[i].addEventListener('click',init)
    }
    //Adicionar listener no botão
    button.addEventListener('click',giveup)
}
addEvents()

function startGame() {
    document.getElementById('menu').style.display = 'none'
    document.getElementById('game-canvas').style.display = 'flex'
    cleanUp()
}

//players
const player1 = {
    name: 'sadsd',
    id: 1,
    symbol: "O",
    score: 0,
    position: []
}

const player2 = {
    name: 'sdsdsd',
    id: 2,
    symbol: "X",
    score: 0,
    position: []
}

//Função inicial que analisa e lida com o clique em alguma posição
let currentPosition
function init(event) {
    currentPosition = event.target    
    turnControl()
    addPlayerPosition(turnId,currentPosition.id)
}

//Função que adiciona o símbolo na tela
function addSymbol(currentPlayer,position) {
    position.textContent = currentPlayer.symbol
}

//Função que controla os turnos, confere qual o ID do jogador atual, adiciona o simbolo desse jogador na tela e muda o ID para o ID do proximo
let turnId = 1
function turnControl() {
    if (turnId == player1.id) {
        addSymbol(player1,currentPosition)
        turnId = 2
    }
    
    else if (turnId == player2.id) {
        addSymbol(player2,currentPosition)
        turnId = 1
    }
}

//Função para limpar a tela
function cleanUp() {
    for(let i=0; i<positions.length; i++) {
        positions[i].textContent = ''
    }
    player1.position = []
    player2.position = []
    combination = []
    document.getElementById('winner').style.display = 'none'
}

//Função de desistir
function giveup() {
    cleanUp()
    document.getElementById('menu').style.display = 'block'
    document.getElementById('game-canvas').style.display = 'none'
}

//Função que adiciona o símbolo jogado na tela
function addPlayerPosition(currentTurn,pos) {
    if (currentTurn == 2) {
        player2.position.push(pos)
        checkWinner(player2)
    }
    else if (currentTurn == 1) {
        player1.position.push(pos)
        checkWinner(player1)
    }
}

//Funçao que checa a cada jogada se um sequencia vitoriosa já foi colocada
let combination = []
function checkWinner(currentPlayer) {
    for(let i=0; i<winCombs.length; i++) {
        combination = []
        //Checa cada item que o player ja colocou e cria um array separado, quando o array criado é igual a uma das combinações linda
        for(let j=0; j<currentPlayer.position.length; j++) {
            if(winCombs[i].includes(currentPlayer.position[j])) {
                combination.push(currentPlayer.position[j])
                console.log(combination)
            }
            if (combination.length == 3) {
                setTimeout(setAsWinner, 500, currentPlayer)
            }
        }
    }
}

//Troca o conteudo da tela quando alguem vence o jogo
function setAsWinner(player) {
    document.getElementById('menu').style.display = 'none'
    document.getElementById('game-canvas').style.display = 'none'
    document.getElementById('winner').style.display = 'block'
    document.getElementById('player').textContent = `[[${player.name}]]`

    player.score += 1
}

//array com as combinações de vitoria
const winCombs = [
    ['tl','tc','tr'],
    ['cl','cc','cr'],
    ['bl','bc','br'],
    ['tl','cl','bl'],
    ['tc','cc','bc'],
    ['tr','cr','br'],
    ['tl','cc','br'],
    ['bl','cc','tr']
]