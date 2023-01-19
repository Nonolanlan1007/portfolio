<template>
  <router-link v-bind:to="`/projets/contributeur/${encodeURI(name)}`" class="router-link">
    <div class="tag" v-bind:style="{ 'background-color': this.$data.color }">
      <img v-if="logo" v-bind:src="logo" alt="Tag logo" class="logo" />
      <p>
        {{ name.toUpperCase() }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ContributorCard",
  data() {
    return {
      color: "#009dff",
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>
  img {
    max-width: 30px;
    max-height: 30px;
    margin-left: 10px;
    border-radius: 100%;
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
    height: 35px;
    margin-left: 10px;
    /*width: 175px;*/
  }

  .tag:hover {
    filter: opacity(0.8);
  }
</style>