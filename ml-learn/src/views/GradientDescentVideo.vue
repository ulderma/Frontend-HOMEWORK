<template>
  <div class="video-modal">
    <div class="modal-content">
      <h2>Градиентный спуск — объяснение</h2>

      <div class="video-container">
        <!-- Видео с YouTube (без лишних пробелов в src) -->
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/s-DriB7Kyq0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <!-- Тайминги -->
        <div class="timeline">
          <h3>⏱ Тайминги:</h3>
          <ul>
            <li><a href="javascript:void(0)" @click="seek(0)">0:00 — Введение</a></li>
            <li><a href="javascript:void(0)" @click="seek(90)">1:30 — Что такое градиент?</a></li>
            <li><a href="javascript:void(0)" @click="seek(195)">3:15 — Как работает спуск</a></li>
            <li><a href="javascript:void(0)" @click="seek(405)">6:45 — Пример с функцией</a></li>
            <li><a href="javascript:void(0)" @click="seek(620)">10:20 — Заключение</a></li>
          </ul>
          <p><small>💡 Тайминги работают только в полноэкранном режиме YouTube</small></p>
        </div>
      </div>

      <button @click="router.back()" class="close-btn">← Назад</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Функция перемотки (работает через YouTube-параметры)
const seek = (seconds: number) => {
  const url = new URL('https://www.youtube.com/embed/s-DriB7Kyq0')
  url.searchParams.set('start', seconds.toString())
  window.open(url.toString(), '_blank')
  // Альтернатива: можно открыть в том же iframe, но проще — в новой вкладке
}
</script>

<style scoped>
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 960px;
  width: 95%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h2 {
  margin-top: 0;
  color: #2c3e50;
}

.video-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
}

.timeline {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 10px;
  width: 280px;
  text-align: left;
  border: 1px solid #eee;
}

.timeline h3 {
  margin-top: 0;
  color: #e74c3c;
  font-size: 1.1rem;
}

.timeline ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline li {
  margin: 8px 0;
}

.timeline a {
  color: #2980b9;
  text-decoration: none;
  font-size: 0.95rem;
}

.timeline a:hover {
  text-decoration: underline;
}

.close-btn {
  margin-top: 20px;
  padding: 10px 24px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #c0392b;
}
</style>