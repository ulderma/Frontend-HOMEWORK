<template>
  <main>
    <h1>Давай начнём учить ML!</h1>

    <div class="button-group">
      <button @click="$router.push('/gradient-descent')" class="btn">Градиентный спуск</button>
      <button @click="$router.push('/about')" class="btn">Обучение без учителя</button>
      <button @click="$router.push('/')" class="btn">Классификация</button>
      <button @click="$router.push('/')" class="btn">Обучение с учителем</button>
    </div>
  </main>
</template>

<script setup lang="ts">
// Ничего не импортируем — все кнопки работают через $router
</script>

<style scoped>
main {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  background: #ff5757;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: #e04a4a;
}
</style> 