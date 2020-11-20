const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const grid = 48;
const gridGap = 10;

// função de sprite
function Sprite(props) {
  // atalho pra atribuir propriedades do objeto no sprite
  Object.assign(this, props);
}
Sprite.prototype.render = function() {
  context.fillStyle = this.color;

  // sprite retangular
  if (this.shape === 'rect') {
    // tamanho menor que da grid pra garantir espaço visual entre cada linha
    context.fillRect(this.x, this.y + gridGap / 2, this.size, grid - gridGap);
  }
  // sprite circular. tamanho =  d/2 = r 
  // x e y do centro do sprite
  else {
    context.beginPath();
    context.arc(
      this.x + this.size / 2, this.y + this.size / 2,
      this.size / 2 - gridGap / 2, 0, 2 * Math.PI
    );
    context.fill();
  }
}

const frogger = new Sprite({
  x: grid * 6,
  y: grid * 13,
  color: 'greenyellow',
  size: grid,
  shape: 'circle'
});
const scoredFroggers = [];

// cada pattern define os obstaculo de cada linha
const patterns = [
  // end bank is safe
  null,

  // madeira
  {
    spacing: [2],      // espaço em grid entre cada obstaculo
    color: '#c55843',  // cor do obstaculo
    size: grid * 4,    // largura (retangulo) / diamentro (circulo) do obstaculo
    shape: 'rect',     // forma (retangulo ou circulo)
    speed: 0.75        // velocidade e direção do objeto
  },

  // tartaruga
  {
    spacing: [0,2,0,2,0,2,0,4],
    color: '#de0004',
    size: grid,
    shape: 'circle',
    speed: -1
  },

  // madeira comprida
  {
    spacing: [2],
    color: '#c55843',
    size: grid * 7,
    shape: 'rect',
    speed: 1.5
  },

  // madeira
  {
    spacing: [3],
    color: '#c55843',
    size: grid * 3,
    shape: 'rect',
    speed: 0.5
  },

  // tartaruga
  {
    spacing: [0,0,1],
    color: '#de0004',
    size: grid,
    shape: 'circle',
    speed: -1
  },

  // praia
  null,

  // caminhão
  {
    spacing: [3,8],
    color: '#c2c4da',
    size: grid * 2,
    shape: 'rect',
    speed: -1
  },

  // carro rapido
  {
    spacing: [14],
    color: '#c2c4da',
    size: grid,
    shape: 'rect',
    speed: 0.75
  },

  // carro
  {
    spacing: [3,3,7],
    color: '#de3cdd',
    size: grid,
    shape: 'rect',
    speed: -0.75
  },

  // escavadeira
  {
    spacing: [3,3,7],
    color: '#0bcb00',
    size: grid,
    shape: 'rect',
    speed: 0.5
  },

  // carro
  {
    spacing: [4],
    color: '#e5e401',
    size: grid,
    shape: 'rect',
    speed: -0.5
  },

  // inicio
  null
];

// rows armazena tds obstaculos da linha especifica
const rows = [];
for (let i = 0; i < patterns.length; i++) {
  rows[i] = [];

  let x = 0;
  let index = 0;
  const pattern = patterns[i];

  // ignora areas seguras
  if (!pattern) {
    continue;
  }

  // permite adição de um pattern extra fora da tela para suvizar o loop
  let totalPatternWidth =
    pattern.spacing.reduce((acc, space) => acc + space, 0) * grid +
    pattern.spacing.length * pattern.size;
  let endX = 0;
  while (endX < canvas.width) {
    endX += totalPatternWidth;
  }
  endX += totalPatternWidth;

  // popula linha com sprites
  while (x < endX) {
    rows[i].push(new Sprite({
      x,
      y: grid * (i + 1),
      index,
      ...pattern
    }));

    // move proximo sprite de acordo com espaçamento
    const spacing = pattern.spacing;
    x += pattern.size + spacing[index] * grid;
    index = (index + 1) % spacing.length;
  }
}

// funçao chamada quando vidas zeram
function gameOver() {
  alert("Game Over");
  window.location.reload(false);
}

// funcao de vitória
var victory = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            // ajax
            ajaxRequest = new XMLHttpRequest();
            var player = prompt("Você ganhou! Digite seu Nome:");
            var timeScore = document.getElementById("totalSec").value;
            var game = 'frogger';
              $.ajax({
                url: "save_score.php",
                type: "POST",
                data: {
                  player: player,
                  timeScore: timeScore,
                  game: game		
                },
                cache: false
              });
            window.location.reload(false);
          }
    };
})();

// funcao para gerenciar vidas do sapo
var frogs = 6;

function lives() {
  
  if (frogs == 1){
    frogs -= 1;
    document.getElementById("vidas").innerHTML = frogs;
    gameOver();
  } else {
    frogs -= 1;
    document.getElementById("vidas").innerHTML = frogs;
  }

}

// loop do jogo
function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // background do jogo
  // agua
  context.fillStyle = '#000047';
  context.fillRect(0, grid, canvas.width, grid * 6);

  // linha de chegada
  context.fillStyle = '#1ac300';
  context.fillRect(0, grid, canvas.width, 5);
  context.fillRect(0, grid, 5, grid);
  context.fillRect(canvas.width - 5, grid, 5, grid);
  for (let i = 0; i < 4; i++) {
    context.fillRect(grid + grid * 3 * i, grid, grid * 2, grid);
  }

  // praia
  context.fillStyle = '#8500da';
  context.fillRect(0, 7 * grid, canvas.width, grid);

  // inicio
  context.fillRect(0, canvas.height - grid * 2, canvas.width, grid);

  // atualiza e desenha obstaculos
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];

    for (let i = 0; i < row.length; i++) {
      const sprite = row[i]
      sprite.x += sprite.speed;
      sprite.render();

      // loop sprite aao redor da tela
      // sprite vai pra esquerda até sumir da tela
      if (sprite.speed < 0 && sprite.x < 0 - sprite.size) {

        // busca sprite mais da direita
        let rightMostSprite = sprite;
        for (let j = 0; j < row.length; j++) {
          if (row[j].x > rightMostSprite.x) {
            rightMostSprite = row[j];
          }
        }

        // move sprite para proximo posicao do pattern para continuar
        const spacing = patterns[r].spacing;
        sprite.x =
          rightMostSprite.x + rightMostSprite.size +
          spacing[rightMostSprite.index] * grid;
        sprite.index = (rightMostSprite.index + 1) % spacing.length;
      }

      // sprite vai pra direita até sumir da tela
      if (sprite.speed > 0 && sprite.x > canvas.width) {

        //  busca sprite mais da esquerda
        let leftMostSprite = sprite;
        for (let j = 0; j < row.length; j++) {
          if (row[j].x < leftMostSprite.x) {
            leftMostSprite = row[j];
          }
        }

        //  move sprite para proximo posicao do pattern para continuar
        const spacing = patterns[r].spacing;
        let index = leftMostSprite.index - 1;
        index = index >= 0 ? index : spacing.length - 1;
        sprite.x = leftMostSprite.x - spacing[index] * grid - sprite.size;
        sprite.index = index;
      }
    }
  }

  // desenha sapo
  frogger.x += frogger.speed || 0;
  frogger.render();

  // desenha sapos da linha de chegada
  scoredFroggers.forEach(frog => frog.render());

  if (scoredFroggers.length == 5){
    victory();
  }

  // checa por colisao com outros sprites da mesma linha do sapo
  const froggerRow = frogger.y / grid - 1 | 0;
  let collision = false;
  for (let i = 0; i < rows[froggerRow].length; i++) {
    let sprite = rows[froggerRow][i];

    // checa colisao AABB (axis-aligned bounding box)
    // trata circulos como retangulos pra colisao
    if (frogger.x < sprite.x + sprite.size - gridGap &&
        frogger.x + grid - gridGap > sprite.x &&
        frogger.y < sprite.y + grid &&
        frogger.y + grid > sprite.y) {
      collision = true;

      // reseta sapo se bater no carro
      if (froggerRow > rows.length / 2) {
        frogger.x = grid * 6;
        frogger.y = grid * 13;
        lives();
      }
      // mov sapo junto de obstaculo (tartarugas e madeiras)
      else {
        frogger.speed = sprite.speed;
      }
    }
  }

  if (!collision) {
    // se sapo nao estiver colidindo reseta velocidade
    frogger.speed = 0;

    // sapo chegou no final (a cada 3 colunas)
    const col = (frogger.x + grid / 2) / grid | 0;
    if (froggerRow === 0 && col % 3 === 0 &&
        // checa por sapo na mesma posicao
        !scoredFroggers.find(frog => frog.x === col * grid)) {
      scoredFroggers.push(new Sprite({
        ...frogger,
        x: col * grid,
        y: frogger.y + 5
      }));
      frogs += 1;
    }

    // reseta sapo se colidir com agua
    if (froggerRow < rows.length / 2 - 1) {
      frogger.x = grid * 6;
      frogger.y = grid * 13;
      lives();
    }
  }
}

// pega eventos do teclado pra controlar sapo
document.addEventListener('keydown', function(e) {
  // seta esq
  if (e.which === 37) {
    frogger.x -= grid;
  }
  // seta dir
  else if (e.which === 39) {
    frogger.x += grid;
  }

  // set cima
  else if (e.which === 38) {
    frogger.y -= grid;
  }
  // seta bai
  else if (e.which === 40) {
    frogger.y += grid;
  }

  // prende posicao do sapo pra ficar na tela
  frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
  frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
});

// inicia jogo
requestAnimationFrame(loop);

// configura e inicia timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  document.getElementById("totalSec").value = totalSeconds;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}