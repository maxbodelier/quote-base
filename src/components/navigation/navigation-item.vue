<template>
  <div class="navigation-item">
    {{ navigationItem.replace('-',' ') }}
  </div>

</template>

<script>
export default {
  name: "navigation-item",
  props: {
    navigationItem: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.navigation-item {
  text-transform: capitalize;
}

</style>