<template>
  <router-link v-bind:to="`/projets/tag/${encodeURI(name)}`" class="router-link">
    <div class="tag" v-bind:style="{ 'background-color': this.$props.color || this.$data.Color }">
      <img v-if="logo" v-bind:src="logo" alt="Tag logo" class="logo" />
      <p>
        {{ name.toUpperCase() }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "TagCard",
  data() {
    return {
      Color: "#ff8000",
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
  },
  connected: () => {
    if (this.$props.color) {
      this.$data.Color = this.$props.color;
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

  img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    border-radius: 1em;
  }

  p {
    margin-right: 10px;
    margin-left: 10px;
    font-family: 'Nunito', sans-serif;
    color: white;
  }

  .router-link {
    text-decoration: none;
  }

  .tag {
    display: flex;
    border-radius: 1em;
    align-items: center;
    padding: 5px;
    height: 35px;
    margin-top: 10px;
    /*width: 175px;*/
  }

  .tag:hover {
    filter: opacity(0.8);
  }
</style>