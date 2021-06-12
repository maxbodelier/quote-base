<template>
  <div id="app">
    <navigation @active-quote-type-changed="changeActiveQuoteType" :navigation-items="quoteTypes" :active-quote-type="activeQuoteType"></navigation>
    <router-view :key="`${$route.fullPath}`" :quoteTypes="quoteTypes" :active-quote-type="activeQuoteType"></router-view>
  </div>
</template>

<script>


import Navigation from "./components/navigation/navigation";
export default {
  name: 'App',
  components: {Navigation},
  data() {
    return {
      quoteTypes: ['programming', 'wisdom'],
      activeQuoteType: 'programming'
    }
  },
  created() {
    this.$session.start();
  },
  methods: {
    changeActiveQuoteType(type) {
      this.activeQuoteType = type
    }
  },
  destroyed() {
    console.log('destroying')
    this.$session.clear();
    this.$session.destroy();
  }
}
</script>

<style lang="scss">
@import "styles/fonts";
@import "styles/colors";
@import "styles/typography";

body {
  margin: 0;
  background-color: $background-color-default;
}

#app {
  font-family: inter, sans-serif;
  color: $font-color-normal;
}


</style>
