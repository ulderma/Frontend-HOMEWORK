<template>
  <div class="main-container">
    <!-- 🚀 БЕГУЩАЯ СТРОКА НА ВСЮ ШИРИНУ ЭКРАНА -->
    <div class="marquee-full-width">
      <div class="marquee-content">
        <span class="marquee-text">
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ML-learn
        </span>
      </div>
    </div>

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
            v-if="currentVideo === 'gradient'"
            width="800"
            height="450"
            src="https://www.youtube.com/embed/s-DriB7Kyq0?autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            v-if="currentVideo === 'unsupervised'"
            width="800"
            height="450"
            src="https://www.youtube.com/embed/UdO8E1d57qc?autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <div class="timeline">
            <h3>⏱ Тайминги:</h3>
            <ul v-if="currentVideo === 'gradient'">
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=0" target="_blank">0:00 — Введение</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=90" target="_blank">1:30 — Что такое градиент?</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=195" target="_blank">3:15 — Как работает спуск</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=405" target="_blank">6:45 — Пример с функцией</a></li>
              <li><a href="https://youtu.be/s-DriB7Kyq0?t=620" target="_blank">10:20 — Заключение</a></li>
            </ul>

            <ul v-if="currentVideo === 'unsupervised'">
              <li><a href="https://youtu.be/UdO8E1d57qc?t=0" target="_blank">00:00 — Вступление</a></li>
              <li><a href="https://youtu.be/UdO8E1d57qc?t=468" target="_blank">07:48 — Функция активации</a></li>
              <li><a href="https://youtu.be/UdO8E1d57qc?t=907" target="_blank">15:07 — softargmax</a></li>
              <li><a href="https://youtu.be/UdO8E1d57qc?t=1161" target="_blank">19:21 — softmax</a></li>
              <li><a href="https://youtu.be/UdO8E1d57qc?t=1705" target="_blank">28:25 — momentum</a></li>
              <li><a href="https://youtu.be/UdO8E1d57qc?t=2441" target="_blank">40:41 — Adam</a></li>
              <li><a href="https://youtu.be/UdO8E1d57qc?t=3003" target="_blank">50:03 — Языковые нюансы</a></li>
            </ul>
            <p><small>💡 Клик по таймингу откроет видео с этого места</small></p>
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
const currentVideo = ref<string>('')

interface Topic {
  id: number;
  name: string;
}

const topics: Topic[] = [
  { id: 1, name: 'Лекция 1' },
  { id: 2, name: 'Лекция 2' },
  { id: 3, name: 'Лекция 3' },
  { id: 4, name: 'Лекция 4' },
]

const showVideo = (id: number) => {
  if (id === 1) {
    currentVideo.value = 'gradient'
    showModal.value = true
  } else if (id === 2) {
    currentVideo.value = 'unsupervised'
    showModal.value = true
  }
  // можно расширить для id === 3, 4…
}

const hideModal = () => {
  showModal.value = false
  currentVideo.value = ''
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

/* 🚀 БЕГУЩАЯ СТРОКА */
.marquee-full-width {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #90CAF9; /* ← светлее на 2 тона: Light Blue 200 */
  color: white;
  overflow: hidden;
  white-space: nowrap;
  padding: 24px 0;
  font-weight: bold;
  font-size: 1.3rem;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); /* ещё легче тень */
}

.marquee-content {
  display: inline-block;
  animation: marquee 30s linear infinite;
}

.marquee-text {
  display: inline-block;
  padding-right: 100%;
  letter-spacing: 0.5px; /* чуть шире буквы */
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
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
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-width: 100%;
}

.timeline {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  width: 280px;
  text-align: left;
  border: 1px solid #e9ecef;
}

.timeline h3 {
  margin-top: 0;
  color: #1976d2;
  font-size: 1.2rem;
}

.timeline ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline li {
  margin: 10px 0;
  font-size: 0.95rem;
}

.timeline a {
  color: #1565c0;
  text-decoration: none;
  transition: color 0.2s;
}

.timeline a:hover {
  text-decoration: underline;
  color: #0d47a1;
}

.close-btn {
  margin-top: 24px;
  padding: 12px 32px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #0d47a1;
}
</style>