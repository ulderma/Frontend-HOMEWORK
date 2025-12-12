<template>
  <div class="main-container">
    <!-- БЕГУЩАЯ СТРОКА -->
    <div class="marquee-full-width">
      <div class="marquee-track" aria-hidden="true">
        <span class="marquee-text">
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span class="marquee-text">
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ML-learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </div>

    <div class="content-shift">
      <h1>Давай начнём учить ML!</h1>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по таймингам (например: Adam, softmax, ResNet...)"
        @input="handleSearch"
      />

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
    </div>

    <!-- Модалка -->
    <div v-if="showModal" class="modal-overlay" @click.self="hideModal">
      <div class="modal-content">
        <div class="video-container">
          <!-- ВМЕСТО iframe: контейнер под YouTube Player API -->
          <div class="yt-box">
            <div ref="playerEl" class="yt-player"></div>
          </div>

          <div class="timeline" v-if="current">
            <h3>Тайминги:</h3>
            <ul>
              <li v-for="t in current.timings" :key="t.sec">
                <a href="#" @click.prevent="seekTo(t.sec)">
                  {{ t.label }}
                </a>
              </li>
            </ul>
            <p><small>Клик по таймингу перемотает видео здесь же</small></p>
          </div>
        </div>

        <button @click="hideModal" class="close-btn">← Назад</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

/* ----------------- STATE ----------------- */
const showModal = ref(false)
const currentKey = ref<'lec1' | 'lec2' | 'lec3' | 'lec4' | ''>('')
const openedBySearch = ref(false)
const searchQuery = ref('')

/* ----------------- DATA ----------------- */
type Timing = { sec: number; label: string }
type VideoConfig = {
  key: 'lec1' | 'lec2' | 'lec3' | 'lec4'
  title: string
  embedId: string
  watchId: string
  timings: Timing[]
}

interface Topic {
  id: number
  name: string
}

const topics: Topic[] = [
  { id: 1, name: 'Лекция 1' },
  { id: 2, name: 'Лекция 2' },
  { id: 3, name: 'Лекция 3' },
  { id: 4, name: 'Лекция 4' },
]

const videos: Record<'lec1' | 'lec2' | 'lec3' | 'lec4', VideoConfig> = {
  lec1: {
    key: 'lec1',
    title: 'Лекция 1',
    embedId: 's-DriB7Kyq0',
    watchId: 's-DriB7Kyq0',
    timings: [
      { sec: 0, label: '0:00 — Введение' },
      { sec: 90, label: '1:30 — Что такое градиент?' },
      { sec: 195, label: '3:15 — Как работает спуск' },
      { sec: 405, label: '6:45 — Пример с функцией' },
      { sec: 620, label: '10:20 — Заключение' },
    ],
  },
  lec2: {
    key: 'lec2',
    title: 'Лекция 2',
    embedId: 'UdO8E1d57qc',
    watchId: 'UdO8E1d57qc',
    timings: [
      { sec: 0, label: '00:00 — вступление' },
      { sec: 468, label: '07:48 — функция активации' },
      { sec: 907, label: '15:07 — softargmax' },
      { sec: 1161, label: '19:21 — softmax' },
      { sec: 1705, label: '28:25 — momentum' },
      { sec: 2441, label: '40:41 — Adam' },
      { sec: 3003, label: '50:03 — языковые нюансы' },
    ],
  },
  lec3: {
    key: 'lec3',
    title: 'Лекция 3',
    embedId: 'sV-R5fiQ1rw',
    watchId: 'sV-R5fiQ1rw',
    timings: [
      { sec: 0, label: '00:00 — вступление' },
      { sec: 367, label: '06:07 — ResNet' },
      { sec: 1740, label: '29:00 — dropout' },
      { sec: 1869, label: '31:09 — batch normalisation' },
    ],
  },
  lec4: {
    key: 'lec4',
    title: 'Лекция 4',
    embedId: 'X6BQ6GEE0eo',
    watchId: 'X6BQ6GEE0eo',
    timings: [
      { sec: 0, label: '00:00 — вступление' },
      { sec: 399, label: '06:39 — пример линейной регрессии' },
      { sec: 3597, label: '59:57 — padding' },
    ],
  },
}

const current = computed(() => {
  if (!currentKey.value) return null
  return videos[currentKey.value]
})

/* ----------------- OPEN/CLOSE ----------------- */
const showVideo = (id: number) => {
  openedBySearch.value = false

  if (id === 1) currentKey.value = 'lec1'
  if (id === 2) currentKey.value = 'lec2'
  if (id === 3) currentKey.value = 'lec3'
  if (id === 4) currentKey.value = 'lec4'

  showModal.value = true
}

const hideModal = () => {
  showModal.value = false
  currentKey.value = ''
  openedBySearch.value = false
  destroyPlayer()
}

/* ----------------- YOUTUBE IFRAME API ----------------- */
/* global types */
declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

const playerEl = ref<HTMLDivElement | null>(null)
let player: any = null
let apiPromise: Promise<void> | null = null
let pendingSeek: number | null = null

const loadYouTubeApi = () => {
  if (window.YT && window.YT.Player) return Promise.resolve()

  if (apiPromise) return apiPromise

  apiPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-yt-iframe-api="1"]')
    if (existing) {
      // если скрипт уже есть — ждём готовности
      if (window.YT && window.YT.Player) resolve()
      else {
        const prev = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = () => {
          prev?.()
          resolve()
        }
      }
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.async = true
    tag.dataset.ytIframeApi = '1'
    document.head.appendChild(tag)

    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
  })

  return apiPromise
}

const createOrLoad = async (videoId: string) => {
  await loadYouTubeApi()
  await nextTick()

  if (!playerEl.value) return

  // если плеер уже создан — просто переключаем видео
  if (player && player.loadVideoById) {
    player.loadVideoById({ videoId, startSeconds: 0 })
    return
  }

  player = new window.YT.Player(playerEl.value, {
    width: '800',
    height: '450',
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: () => {
        // если кликнули тайминг пока плеер грузился
        if (pendingSeek !== null) {
          player.seekTo(pendingSeek, true)
          pendingSeek = null
        }
      },
    },
  })
}

const destroyPlayer = () => {
  try {
    if (player && player.destroy) player.destroy()
  } catch {}
  player = null
  pendingSeek = null
}

const seekTo = (sec: number) => {
  if (player && player.seekTo) {
    player.seekTo(sec, true)
    return
  }
  pendingSeek = sec
}

/* следим за открытием модалки и сменой лекции */
watch(
  [showModal, currentKey],
  async ([isOpen, key]) => {
    if (!isOpen) return
    if (!key) return
    const v = videos[key]
    await createOrLoad(v.embedId)
  },
  { immediate: false }
)

/* ----------------- SEARCH (оставляю твой текущий, можешь менять отдельно) ----------------- */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replaceAll('ё', 'е')
    .replace(/[^\p{L}\p{N}\s-]+/gu, '')
    .replace(/\s+/g, ' ')
    .trim()

const extractRightPart = (label: string) => {
  const parts = label.split('—')
  if (parts.length >= 2) return parts.slice(1).join('—').trim()
  return label.trim()
}

const buildTermsForVideo = (v: VideoConfig) => {
  const terms = new Set<string>()
  terms.add(normalize(v.title))
  for (const t of v.timings) {
    const phrase = normalize(extractRightPart(t.label))
    if (phrase) terms.add(phrase)
    for (const w of phrase.split(' ')) {
      if (w.length >= 2) terms.add(w)
    }
  }
  return [...terms]
}

const searchIndex: Record<'lec1' | 'lec2' | 'lec3' | 'lec4', string[]> = {
  lec1: buildTermsForVideo(videos.lec1),
  lec2: buildTermsForVideo(videos.lec2),
  lec3: buildTermsForVideo(videos.lec3),
  lec4: buildTermsForVideo(videos.lec4),
}

const findVideoByQuery = (q: string): ('lec1' | 'lec2' | 'lec3' | 'lec4') | null => {
  const order: Array<'lec1' | 'lec2' | 'lec3' | 'lec4'> = ['lec1', 'lec2', 'lec3', 'lec4']
  for (const key of order) {
    const terms = searchIndex[key]
    if (terms.some((term) => term.includes(q))) return key
  }
  return null
}

const handleSearch = () => {
  const q = normalize(searchQuery.value)
  if (!q) {
    if (openedBySearch.value) hideModal()
    return
  }
  const match = findVideoByQuery(q)
  if (!match) {
    if (openedBySearch.value) hideModal()
    return
  }
  openedBySearch.value = true
  currentKey.value = match
  showModal.value = true
}
</script>

<style scoped>
.main-container {
  --content-shift: 240px;

  min-height: calc(100vh - 90px);
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.content-shift {
  margin-left: var(--content-shift);
}

@media (max-width: 900px) {
  .content-shift {
    margin-left: 0;
  }
}

h1 {
  font-size: 2.6rem;
  font-weight: 800;
  white-space: nowrap;
  margin-bottom: 1.3rem;
  color: #ffffff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.55);
}

input {
  font-size: 1.1rem;
  padding: 0.9rem 1rem;
  margin-bottom: 1.3rem;
  width: 90%;
  max-width: 1500px;
  border: 2px solid #cfd6df;
  border-radius: 10px;
}

.topics {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 900px) {
  .topics {
    flex-wrap: wrap;
  }
}

.topic-btn {
  font-size: 1.15rem;
  padding: 1rem 2.2rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.28);
  white-space: nowrap;
}

.topic-btn:hover {
  background-color: #ff1a1a;
  transform: scale(1.04);
}

/* Бегущая строка */
.marquee-full-width {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #6f86a6;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  padding: 22px 0;
  font-weight: 800;
  font-size: 1.3rem;
  z-index: 1000;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  isolation: isolate;
}

.marquee-full-width::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.98) 0 2.2px, transparent 3.2px),
    radial-gradient(circle, rgba(255,255,255,0.85) 0 1.3px, transparent 2.3px),
    radial-gradient(circle, rgba(255,255,255,0.65) 0 1px, transparent 2px),
    radial-gradient(circle, rgba(255,255,255,0.95) 0 1.8px, transparent 2.8px);
  background-size: 110px 65px, 170px 105px, 90px 55px, 240px 140px;
  background-position: 0 0, 40px 20px, 15px 10px, 80px 30px;
  opacity: 0.65;
  animation: glitterDrift 4.2s linear infinite;
}

.marquee-full-width::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle, rgba(255,255,255,1) 0 1.2px, transparent 2.2px),
    radial-gradient(circle, rgba(255,255,255,0.98) 0 1.2px, transparent 2.2px),
    radial-gradient(circle, rgba(255,255,255,0.9) 0 2.4px, transparent 3.4px);
  background-size: 140px 90px, 110px 70px, 220px 140px;
  background-position: 10px 12px, 70px 26px, 120px 18px;
  opacity: 0.4;
  animation: glitterPulse 1.05s ease-in-out infinite alternate;
}

.marquee-track {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 70px;
  width: max-content;
  will-change: transform;
  animation: marqueeMove 16s linear infinite;
}

.marquee-text {
  display: inline-block;
  padding-right: 70px;
  letter-spacing: 0.45px;
}

@keyframes marqueeMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes glitterDrift {
  0% { transform: translateX(0); }
  100% { transform: translateX(-150px); }
}

@keyframes glitterPulse {
  0% { opacity: 0.18; filter: blur(0px); }
  100% { opacity: 0.62; filter: blur(0.35px); }
}

/* Модалка */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
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
  max-width: 980px;
  width: 95%;
  text-align: center;
  color: #111;
}

.video-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
}

/* контейнер под плеер */
.yt-box {
  width: 800px;
  max-width: 100%;
}

.yt-player {
  width: 100%;
}

/* Тайминги */
.timeline {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  width: 320px;
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
  font-size: 0.98rem;
}

.timeline a {
  color: #1565c0;
  text-decoration: none;
}

.timeline a:hover {
  text-decoration: underline;
  color: #0d47a1;
}

.close-btn {
  margin-top: 20px;
  padding: 12px 32px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #0d47a1;
}
</style>



