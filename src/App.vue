<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getAllUsers');
  }
}
</script>

<style lang="scss">
  body {
    padding: 30px 0;
  }
  .spinner-border {
    display: block;
    margin: 30px auto;
  }

</style>
