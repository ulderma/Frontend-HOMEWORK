<style scoped>
:global(html, body, #app) {
  height: 100%;
}

:global(body) {
  margin: 0;
  background-image: url("/image.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* сам контейнер делаем прозрачным, чтобы фон был видно позади */
.main-container {
  min-height: 100vh;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: white;

  /* убери фон отсюда, чтобы не дублировать */
  background: transparent;

  /* чтобы контент не залезал под бегущую строку */
  padding-top: 110px;
}
</style>
