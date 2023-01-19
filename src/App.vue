<template>
  <nav>
    <router-link to="/" class="router-link">Acceuil</router-link>
    <router-link to="/projets" class="router-link">Projets</router-link>
    <a href="https://github.com/Nonolanlan1007" class="router-link" target="_blank">GitHub</a>
  </nav>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed&display=swap');

body {
  background: linear-gradient(270deg, #04354e, #0082ab);
  background-size: 400% 400%;
  font-family: 'Nunito', sans-serif;

  -webkit-animation: AnimationName 19s ease infinite;
  -moz-animation: AnimationName 19s ease infinite;
  -o-animation: AnimationName 19s ease infinite;
  animation: AnimationName 19s ease infinite;
}

@-webkit-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
@-o-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
@keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

/*body {
  background: linear-gradient(to right bottom, #0082AB, #04354E) fixed no-repeat
}*/
nav {
  text-align: center;
  margin-top: 25px;
  font-family: 'Sofia Sans Condensed', sans-serif;
  font-size: 1.5em;
}

.router-link {
  color: #bbb2b2;
  text-decoration: none;
  margin: 0 25px;
  transition: all 0.3s;
}

.router-link:hover {
  color: #fff;
  text-decoration: underline;
}

h1 {
  font-family: 'Sofia Sans Condensed', sans-serif;
  font-size: 2em;
}
</style>
