<template>
  <div class="main-container">
    <h1>Давай начнём учить ML!</h1>
    <input type="text" placeholder="Поиск..." />
    <div class="topics">
      <button
        v-for="topic in topics"
        :key="topic.id"
        @click="showVideo(topic.id)"
        class="topic-btn"
      >
        {{ topic.name }}
      </button>
    </div>

    <!-- Модальное окно для видео -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="video-container">
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/s-DriB7Kyq0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <div class="timeline">
            <h3>⏱ Тайминги:</h3>
            <ul>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=0" target="_blank">0:00 — Введение</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=90" target="_blank">1:30 — Что такое градиент?</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=195" target="_blank">3:15 — Как работает спуск</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=405" target="_blank">6:45 — Пример с функцией</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=620" target="_blank">10:20 — Заключение</a></li>
            </ul>
            <p><small>💡 Клик по таймингу откроет видео в новой вкладке</small></p>
          </div>
        </div>
        <button @click="hideModal" class="close-btn">← Назад</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)

interface Topic {
  id: number;
  name: string;
}

const topics: Topic[] = [
  { id: 1, name: 'Градиентный спуск' },
  { id: 2, name: 'Обучение без учителя' },
  { id: 3, name: 'Классификация' },
  { id: 4, name: 'Обучение с учителем' },
]

const showVideo = (id: number) => {
  if (id === 1) {
    showModal.value = true
  }
}

const hideModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.main-container {
  text-align: center;
  margin-left: 300px;
  font-size: 1.2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 1.5rem;
}

input {
  font-size: 1rem;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  width: calc(90%);
  max-width: 1500px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.topic-btn {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.topic-btn:hover {
  background-color: #ff1a1a;
  transform: scale(1.05);
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent; /* Прозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  max-width: 960px;
  width: 95%;
  text-align: center;
}

.video-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
}

.video-container iframe {
  border: 8px solid white; /* Белая рамка */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Лёгкая тень */
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