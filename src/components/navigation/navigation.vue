<template>
  <div class="navigation width-container">
    <router-link to="/" class="home">
      <home-svg></home-svg>
    </router-link>
    <desktop-navigation
      v-if="isDesktopNavigation"
      :navigation-items="navigationItems"
      :active-quote-type="activeQuoteType"
      @active-quote-type-changed="changeActiveQuoteType"
    ></desktop-navigation>
    <mobile-navigation
      v-else
      :navigation-items="navigationItems"
      :active-quote-type="activeQuoteType"
      @active-quote-type-changed="changeActiveQuoteType"
    ></mobile-navigation>
    <router-link to="/favorites" class="favorites">
      <favorites-svg></favorites-svg>
    </router-link>
  </div>
</template>

<script>
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import HomeSvg from "../../assets/svg/home-svg";
import favoritesSvg from "../../assets/svg/favorites-svg";

export default {
  name: "navigation",
  components: {favoritesSvg, HomeSvg, MobileNavigation, DesktopNavigation},
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
  computed: {
    isDesktopNavigation() {
      if (this.$mq) {
        return this.$mq === 'xLarge' | this.$mq === 'large';
      } else {
        return true
      }
    }
  },
  methods: {
    changeActiveQuoteType(item) {
      this.$emit('active-quote-type-changed', item);
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.navigation {
  display: flex;
  justify-content: space-between;
  margin: auto;

  .home, .favorites {
    margin: 32px;
    width: 36px;
    height: 36px;
    fill: $icon-color-default;
    cursor: pointer;
  }

  @media only screen and (max-width: 420px) {
    .home {
      margin-left: 16px;
      margin-right: 8px;
    }
    .favorites {
      margin-left: 8px;
      margin-right: 16px;
    }
  }

  .home {
    &.router-link-exact-active, &:hover{
      fill: $icon-color-accent-green;
    }
  }

  .favorites {
    &.router-link-exact-active, &:hover{
      fill: $icon-color-accent-yellow;
    }
  }
}
</style>