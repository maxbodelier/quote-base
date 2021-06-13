<template>
  <div v-if="navigationItems && navigationItems.length > 0 && $route.path === '/'" class="mobile-navigation">
    <navigation-item
      :navigation-item="navigationItem"
      class="mobile-navigation-item heading-1"
    ></navigation-item>
    <div @click="openMobileDropdown" class="mobile-navigation-icon">
      <mobile-navigation-arrow-svg></mobile-navigation-arrow-svg>
    </div>

    <div v-if="showDropdown" class="mobile-navigation-dropdown">
      <navigation-item
        v-for="(notActiveNavigationItem, notActiveNavigationIndex) in notActiveNavigationItems"
        :navigation-item="notActiveNavigationItem"
        :key="notActiveNavigationIndex"
        class="mobile-navigation-dropdown-item heading-2"
        @click.native.prevent.stop="changeActiveItem(notActiveNavigationItem)"
      ></navigation-item>
    </div>
  </div>
  <div v-else class="mobile-navigation">
    <navigation-item :navigation-item="getRouteName()" class="mobile-navigation-item heading-1"></navigation-item>
  </div>
</template>

<script>
import NavigationItem from "./navigation-item";
import MobileNavigationArrowSvg from "../../assets/svg/mobile-navigation-arrow-svg";

export default {
  name: "mobile-navigation",
  components: {MobileNavigationArrowSvg, NavigationItem},
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
      activeNavigationItem: undefined,
      showDropdown: false
    }
  },
  created() {
    this.activeNavigationItem = this.activeQuoteType
  },
  computed: {
    availableNavigationItems () {
      return this.navigationItems;
    },
    navigationItem() {
      return this.activeNavigationItem;
    },
    notActiveNavigationItems() {
      let items = this.availableNavigationItems;
      items = items.filter(item => {
        return item !== this.activeNavigationItem
      })
      return items
    }
  },
  methods: {
    openMobileDropdown() {
      this.showDropdown = this.showDropdown === false;
    },
    closeMobileDropdown() {
      this.showDropdown = !(this.showDropdown === true);
    },
    changeActiveItem(newActiveItem) {
      this.activeNavigationItem = newActiveItem;
      this.$emit('active-quote-type-changed', this.activeNavigationItem);
      this.closeMobileDropdown();
    },
    getRouteName() {
      return this.$route.path.replace('/','')
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.mobile-navigation {
  height: 100px;
  background-color: $background-color-default;
  display: flex;
  justify-content: center;

  .mobile-navigation-item {
    margin: auto 8px;
    font-weight: bold;
    color: #55cd96;
  }

  .mobile-navigation-icon {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: auto 0;
  }

  .mobile-navigation-dropdown {
    position: absolute;
    margin-top: 50px;
    height: fit-content;
    width: fit-content;
    padding: 16px;

    .mobile-navigation-dropdown-item {
      text-align: center;
      padding: 16px 0;
      cursor: pointer;
    }
  }
}

</style>