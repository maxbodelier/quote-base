<template>
  <div v-if="navigationItems && navigationItems.length > 0 && $route.path === '/'" class="desktop-navigation">
    <navigation-item
      v-for="(navigationItem, NavigationItemIndex) in navigationItems"
      :navigation-item="navigationItem" :key="NavigationItemIndex"
      :class="`desktop-navigation-item heading-1 ${isActiveStyle(navigationItem)}`"
      @click.native.prevent.stop="changeActiveNavigationItem(navigationItem)"
    ></navigation-item>
  </div>
  <div v-else class="desktop-navigation">
    <navigation-item :navigation-item="getRouteName()" class="desktop-navigation-item heading-1 is-active no-cursor"></navigation-item>
  </div>


</template>

<script>
import NavigationItem from "./navigation-item";

export default {
  name: "desktop-navigation",
  components: {NavigationItem},
  props: {
    navigationItems: {
      type: Array,
      required: true
    },
    activeQuoteType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeNavigationItem: undefined
    }

  },
  created() {
    this.activeNavigationItem = this.activeQuoteType
  },
  methods: {
    changeActiveNavigationItem(newActiveNavigationItem) {
      this.activeNavigationItem = newActiveNavigationItem;
      this.$emit('active-quote-type-changed', this.activeNavigationItem);
    },
    isActiveStyle(navigationItem) {
      return navigationItem === this.activeQuoteType ? 'is-active' : '';
    },
    getRouteName() {
      return this.$route.path.replace('/','')
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.desktop-navigation {
  height: 100px;
  background-color: $background-color-default;
  color: $font-color-normal;
  display: flex;
  justify-content: center;

  .desktop-navigation-item {
    margin: auto 16px;
    font-weight: bold;
    cursor: pointer;

    &.is-active {
      color: $font-color-accent;
    }

    &:hover {
      color: $font-color-accent;
    }

    &.no-cursor {
      cursor: initial;
    }
  }
}

</style>