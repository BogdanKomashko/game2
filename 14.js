  // Функція оновлення ігрової логіки
  function updateGame(dt) {
    // 1. Рух гравця
    if (keysDown['ArrowLeft']) {
      player.x -= player.speed * dt;
      player.facing = 'left';
    }
    if (keysDown['ArrowRight']) {
      player.x += player.speed * dt;
      player.facing = 'right';
    }
    if (keysDown['ArrowUp']) {
      player.y -= player.speed * dt;
    }
    if (keysDown['ArrowDown']) {
      player.y += player.speed * dt;
    }
    // Обмежуємо рух межами екрану
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
      player.y = canvas.height - player.height;
    }

    // 2. Рух ворогів (проста поведінка - стежать за гравцем)
    for (let enemy of enemies) {
      // Рух по X в напрямку до гравця
      if (enemy.x < player.x) {
        enemy.x += enemy.speed * dt;
      } else if (enemy.x > player.x) {
        enemy.x -= enemy.speed * dt;
      }
      // Рух по Y в напрямку до гравця
      if (enemy.y < player.y) {
        enemy.y += enemy.speed * dt;
      } else if (enemy.y > player.y) {
        enemy.y -= enemy.speed * dt;
      }
      // (Вороги постійно йдуть на гравця. Можна додати перевірку відстані).
    }

    // 3. Перевірка зіткнень: гравець з ворогами
    for (let enemy of enemies) {
      if (isColliding(player, enemy)) {
        // Якщо ворог торкається гравця - завдаємо шкоди гравцю
        player.health -= enemy.damage * dt;
        if (player.health <= 0) {
          player.health = 0;
          gameState = 'gameover';
          bgMusic.pause();
        }
      }
    }
  }

  // Допоміжна функція перевірки перетину двох прямокутників (колізії)
  function isColliding(a, b) {
    return (a.x < b.x + b.width && 
            a.x + a.width > b.x && 
            a.y < b.y + b.height && 
            a.y + a.height > b.y);
  }
