 // Завантаження (ініціалізація) рівня
  function loadLevel(num) {
    level = num;
    // Скидаємо/очищаємо масив ворогів
    enemies = [];
    // Відновлюємо гравця (позиція і, якщо треба, здоров'я)
    player.x = 100;
    player.y = 500;
    if (level === 1) {
      player.health = 100;  // На початку гри повне здоров'я
      score = 0;
    }
    // Приклад: різні фони для різних рівнів (змінна для кольору фону)
    if (level === 1) currentLevelBg = '#5a8f7b';      // зелений відтінок
    if (level === 2) currentLevelBg = '#7b5a8f';      // фіолетовий відтінок

    // Спавнимо ворогів залежно від рівня
    if (level === 1) {
      enemies.push(spawnEnemy(600, 500));
      enemies.push(spawnEnemy(700, 400));
      enemies.push(spawnEnemy(650, 300));
    } else if (level === 2) {
      enemies.push(spawnEnemy(500, 500));
      enemies.push(spawnEnemy(750, 500));
      enemies.push(spawnEnemy(750, 300));
      enemies.push(spawnEnemy(500, 200));
      enemies.push(spawnEnemy(650, 100));
    }
  }
