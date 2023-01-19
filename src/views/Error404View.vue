<template>
  <h1>Tu es perdu ?</h1>
  <div class="buttons">
    <router-link class="router-link" to="/">
      <button class="button">Retour à l'accueil</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Error404View"
}
</script>

<style scoped>
  h1 {
    text-align: center;
    margin-top: 200px;
    font-size: 100px;
    color: white;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    align-items: center;
  }

  .button:hover {
    background-color: black;
    color: #bebebe;
  }

  .button {
    background-color: #bebebe;
    border: none;
    border-radius: 1em;
    padding: 10px 20px;
    font-size: 50px;
    cursor: pointer;
    transition: 0.3s;
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
</style>