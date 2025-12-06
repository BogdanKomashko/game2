<script>
  // Налаштування Canvas
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Глобальні змінні стану гри
  let gameState = 'menu';    // поточний режим: 'menu', 'playing', 'gameover', 'win'
  let level = 1;             // поточний рівень (1 або 2)
  let score = 0;             // очки гравця
  let soundOn = true;        // стан звуку (true = увімкн., false = вимкн.)

  // Об'єкти гри
  const player = { x: 100, y: 500, width: 40, height: 40, speed: 200, health: 100, 
                   dx: 0, dy: 0, facing: 'right' };
  let enemies = [];          // масив ворогів на поточному рівні

  // Налаштування звуку (фонової музики)
  const bgMusic = new Audio('bgmusic.mp3');  // *Покладіть файл bgmusic.mp3 поруч із HTML
  bgMusic.loop = true;
  if (soundOn) { bgMusic.volume = 0.5; bgMusic.play(); }

  // Налаштування ігрового циклу
  let lastTime = performance.now();
  function gameLoop(timestamp) {
    // Розрахунок дельти часу в секундах
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Оновлення стану гри (якщо йде гра)
    if (gameState === 'playing') {
      updateGame(delta);
    }
    // Малювання кадру відповідно до стану
    renderGame();

    // Запланувати наступний кадр
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
</script>
