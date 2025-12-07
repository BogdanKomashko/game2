/*
 * 2D гра жанру beat 'em up у стилі Battletoads.
 * Реалізація на HTML5 Canvas + JavaScript.
 * Цей файл містить код гри: рендеринг, логіку, меню та керування.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Змінні стану гри
let gameState = 'menu';       // поточний стан гри: 'menu', 'play', 'win' або 'gameover'
const keys = {};              // об'єкт для відстеження стану натиснутих клавіш
let canAttack = true;         // чи може гравець зараз атакувати (для перезарядки атаки)

// Об'єкт гравця з початковими параметрами
const player = {
  width: 50,
  height: 50,
  x: 50,
  y: canvas.height / 2 - 25, // початкове розташування (по центру вертикально)
  color: 'green',
  hp: 5,
  speed: 5
};

// Поточний ворог (створюється при старті гри)
let enemy = null;
const totalEnemies = 3;      // скільки ворогів потрібно перемогти для виграшу
let enemiesDefeated = 0;     // лічильник переможених ворогів

// Функція для створення нового ворога із початковими параметрами
function spawnEnemy() {
  const enemyWidth = 50;
  const enemyHeight = 50;
  const startX = canvas.width - enemyWidth - 50;              // початкова позиція X (біля правого краю)
  const startY = Math.random() * (canvas.height - enemyHeight); // випадкова позиція Y в межах екрану
  return {
    width: enemyWidth,
    height: enemyHeight,
    x: startX,
    y: startY,
    color: 'red',
    hp: 3,
    speed: 2,
    lastAttackTime: 0        // час останньої атаки ворога (для затримки між атаками)
  };
}

// Обробник подій натискання клавіш
window.addEventListener('keydown', function(e) {
  // Запобігти прокрутці сторінки стрілками або пробілом
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
  }
  // Якщо в меню і натиснуто Enter – почати гру
  if (gameState === 'menu' && e.key === 'Enter') {
    startGame();
    return;
  }
  // Якщо гра завершена (перемога чи поразка) і натиснуто R – перезапустити гру
  if ((gameState === 'win' || gameState === 'gameover') && (e.key === 'r' || e.key === 'R')) {
    startGame();
    return;
  }
  // Обробка керування під час гри
  if (gameState === 'play') {
    // Атака по натисканню пробілу (якщо не на перезарядці)
    if (e.key === ' ' && canAttack) {
      // Перевірка влучання (перетин гравця з ворогом)
      if (enemy && 
          player.x < enemy.x + enemy.width &&
          player.x + player.width > enemy.x &&
          player.y < enemy.y + enemy.height &&
          player.y + player.height > enemy.y) {
        // Гравець завдає удару ворогу
        enemy.hp -= 1;
      }
      // Запустити перезарядку атаки
      canAttack = false;
      setTimeout(() => { canAttack = true; }, 500); // 0.5 секунди перезарядка
    }
    // Позначити клавішу як натиснуту (для руху)
    keys[e.key] = true;
  }
});

// Обробник подій відпускання клавіш
window.addEventListener('keyup', function(e) {
  if (gameState === 'play') {
    // Позначити клавішу як відпущену
    keys[e.key] = false;
  }
});

// Функція для запуску (або перезапуску) гри
function startGame() {
  // Скидання параметрів гравця
  player.x = 50;
  player.y = canvas.height / 2 - player.height / 2;
  player.hp = 5;
  // Скидання лічильників та станів
  enemiesDefeated = 0;
  canAttack = true;
  // Очищення стану натиснутих клавіш
  keys.ArrowUp = false;
  keys.ArrowDown = false;
  keys.ArrowLeft = false;
  keys.ArrowRight = false;
  // Створення нового ворога
  enemy = spawnEnemy();
  enemy.lastAttackTime = performance.now(); // щоб ворог не атакував одразу після появи
  // Перехід до ігрового стану
  gameState = 'play';
}

// Функція оновлення стану гри (логіка руху та бою)
function updateGame() {
  // Рух гравця на основі натиснутих клавіш
  if (keys['ArrowLeft']) {
    player.x -= player.speed;
  }
  if (keys['ArrowRight']) {
    player.x += player.speed;
  }
  if (keys['ArrowUp']) {
    player.y -= player.speed;
  }
  if (keys['ArrowDown']) {
    player.y += player.speed;
  }
  // Обмеження гравця межами полотна
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

  // Рух ворога (просте переслідування гравця)
  if (enemy) {
    // Ворог рухається по горизонталі до гравця
    if (enemy.x + enemy.width / 2 < player.x + player.width / 2) {
      enemy.x += enemy.speed;
    } else if (enemy.x + enemy.width / 2 > player.x + player.width / 2) {
      enemy.x -= enemy.speed;
    }
    // Ворог рухається по вертикалі до гравця
    if (enemy.y + enemy.height / 2 < player.y + player.height / 2) {
      enemy.y += enemy.speed;
    } else if (enemy.y + enemy.height / 2 > player.y + player.height / 2) {
      enemy.y -= enemy.speed;
    }
    // Обмеження ворога межами полотна
    if (enemy.x < 0) enemy.x = 0;
    if (enemy.x + enemy.width > canvas.width) enemy.x = canvas.width - enemy.width;
    if (enemy.y < 0) enemy.y = 0;
    if (enemy.y + enemy.height > canvas.height) enemy.y = canvas.height - enemy.height;
    // Атака ворога (якщо є контакт з гравцем, з затримкою між ударами)
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Гравець і ворог стикнулися
      const now = performance.now();
      if (now - enemy.lastAttackTime > 1000) {   // затримка 1 секунда між атаками ворога
        player.hp -= 1;
        enemy.lastAttackTime = now;
      }
    }
    // Якщо здоров'я гравця вичерпано – поразка
    if (player.hp <= 0) {
      gameState = 'gameover';
    }
    // Якщо здоров'я ворога вичерпано – ворог переможений
    if (enemy.hp <= 0) {
      enemiesDefeated += 1;
      if (enemiesDefeated >= totalEnemies) {
        // Усі вороги переможені – перемога в грі
        enemy = null;
        gameState = 'win';
      } else {
        // Переходимо до наступного ворога
        enemy = spawnEnemy();
        enemy.lastAttackTime = performance.now();
      }
    }
  }
}

// Головний цикл гри: оновлює стан і перемальовує сцену
function gameLoop() {
  // Очищення фону (заливка чорним кольором)
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (gameState === 'menu') {
    // Відображення меню з назвою та інструкціями
    ctx.fillStyle = '#fff';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Beat 'Em Up Game", canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = '18px sans-serif';
    ctx.fillText('Стрілки — рух, Пробіл — атака', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Натисніть Enter, щоб почати', canvas.width / 2, canvas.height / 2 + 40);
  } else if (gameState === 'play') {
    // Оновлення логіки гри
    updateGame();
    // Малювання гравця
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Малювання ворога (якщо є)
    if (enemy) {
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
    // Відображення здоров'я гравця та статистики (кількість переможених ворогів)
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Здоров\u0027я гравця: ${player.hp}`, 10, 10);
    ctx.textAlign = 'right';
    ctx.fillText(`Ворогів здолано: ${enemiesDefeated} / ${totalEnemies}`, canvas.width - 10, 10);
  } else if (gameState === 'win') {
    // Відображення повідомлення про перемогу
    ctx.fillStyle = '#fff';
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Перемога!', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '20px sans-serif';
    ctx.fillText('Натисніть R, щоб почати знову', canvas.width / 2, canvas.height / 2 + 20);
  } else if (gameState === 'gameover') {
    // Відображення повідомлення про поразку
    ctx.fillStyle = '#fff';
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Поразка!', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '20px sans-serif';
    ctx.fillText('Натисніть R, щоб спробувати знову', canvas.width / 2, canvas.height / 2 + 20);
  }

  // Викликати наступний кадр
  requestAnimationFrame(gameLoop);
}

// Запуск циклу гри з початкового меню
requestAnimationFrame(gameLoop);
