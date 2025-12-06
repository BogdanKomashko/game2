// Функція відрисовки кадру (гри або меню/екранів завершення)
  function renderGame() {
    // Очищення (фон)
    if (gameState === 'playing') {
      // Заливаємо фон рівня
      ctx.fillStyle = currentLevelBg || '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Малюємо гравця
      ctx.fillStyle = '#3498db'; // блакитний
      ctx.fillRect(player.x, player.y, player.width, player.height);
      // Малюємо ворогів
      ctx.fillStyle = '#e74c3c'; // червоний
      for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      }
      // Малюємо UI (очки та здоров'я)
      ctx.fillStyle = '#fff';
      ctx.font = '18px Arial';
      ctx.fillText(`Очки: ${score}`, 10, 20);
      ctx.fillText(`Здоров'я: ${Math.floor(player.health)}`, 10, 40);
      ctx.fillText(`Рівень: ${level}`, 10, 60);
    } 
    // Малюємо екран меню
    if (gameState === 'menu') {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = '28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('DEMO: Beat \'em Up', canvas.width/2, canvas.height/2 - 60);
      ctx.font = '20px Arial';
      ctx.fillText('Натисніть Enter, щоб розпочати', canvas.width/2, canvas.height/2);
      ctx.fillText(`Звук: ${soundOn ? 'On (M щоб вимкнути)' : 'Off (M щоб увімкнути)'}`, 
                   canvas.width/2, canvas.height/2 + 30);
      ctx.fillText('Esc – Вихід', canvas.width/2, canvas.height/2 + 60);
      ctx.textAlign = 'left'; // повертаємо стандартне вирівнювання
    }
    // Малюємо екран Game Over
    if (gameState === 'gameover') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // напівпрозорий чорний фон
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);
      ctx.font = '20px Arial';
      ctx.fillText(`Ваш рахунок: ${score}`, canvas.width/2, canvas.height/2 + 10);
      ctx.fillText('Enter – повернутися в меню', canvas.width/2, canvas.height/2 + 40);
      ctx.textAlign = 'left';
    }
    // Малюємо екран You Win
    if (gameState === 'win') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // напівпрозорий білий фон
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('YOU WIN!', canvas.width/2, canvas.height/2 - 20);
      ctx.font = '20px Arial';
      ctx.fillText(`Вітаємо, ви пройшли гру!`, canvas.width/2, canvas.height/2 + 10);
      ctx.fillText('Enter – в головне меню', canvas.width/2, canvas.height/2 + 40);
      ctx.textAlign = 'left';
    }
  }
