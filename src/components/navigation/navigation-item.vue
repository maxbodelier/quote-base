<template>
  <div class="navigation-item">
    {{ formattedNavigationItem }}
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
  },
  computed: {
    formattedNavigationItem() {
      return this.navigationItem.replace('-',' ')
    }
  }
}
</script>

<style scoped>
.navigation-item {
  text-transform: capitalize;
}
</style>