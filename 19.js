  // Функція старту нової гри
  function startGame() {
    loadLevel(1);         // запускаємо перший рівень
    gameState = 'playing';
    // Запускаємо музику спочатку (якщо вона була на паузі або зупинена)
    if (soundOn) {
      bgMusic.currentTime = 0; // почати трек з початку
      bgMusic.play();
    }
  }

  // Функція перемикання звуку
  function toggleSound() {
    soundOn = !soundOn;
    if (!soundOn) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
  }

  // Функція виходу з гри
  function exitGame() {
    // Вихід: спробуємо закрити вкладку або перезавантажити сторінку
    bgMusic.pause();
    alert('Гру завершено. Закрийте вкладку або натисніть OK для перезавантаження.'); 
    document.location.reload();
  }
</script>
