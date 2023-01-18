<template>
  <router-link v-bind:to="`/projects/tag/${encodeURI(name)}`" class="router-link">
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
      required: true,
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
    max-width: 30px;
    max-height: 30px;
    margin-left: 10px;
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
    justify-content: center;
    align-content: center;
    padding: 5px;
    max-height: 35px;
    margin-left: 10px;
  }
</style>