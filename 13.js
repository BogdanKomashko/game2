 // Об'єкт для зберігання натиснутих клавіш
  const keysDown = {};

  // Обробник натискання клавіш
  window.addEventListener('keydown', function(e) {
    const key = e.code;
    // Щоб сторінка не прокручувалась стрілками/пробілом
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(key)) {
      e.preventDefault();
    }
    if (gameState === 'menu') {
      if (key === 'Enter') {
        startGame();        // Почати гру з меню
      } else if (key === 'KeyM') {
        toggleSound();      // Переключити звук
      } else if (key === 'Escape') {
        exitGame();         // Вийти з гри (закрити або повернутися до меню)
      }
    } else if (gameState === 'playing') {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) {
        keysDown[key] = true;        // позначаємо цю клавішу як натиснуту
      }
      if (key === 'Space') {
        playerAttack();             // виконати атаку при натисканні пробілу
      } 
      // Опціонально: клавіша Esc під час гри - вихід в меню
      if (key === 'Escape') {
        gameState = 'menu';
        bgMusic.pause();            // поставити музику на паузу при виході до меню
      }
    } else if (gameState === 'gameover' || gameState === 'win') {
      if (key === 'Enter') {
        gameState = 'menu';         // повернутись до меню з екрану завершення
        bgMusic.pause();
      }
    }
  });

  // Обробник відпускання клавіш
  window.addEventListener('keyup', function(e) {
    const key = e.code;
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) {
      delete keysDown[key];  // видаляємо клавішу з об'єкта, коли її відпустили
    }
  });
