<template>
  <div v-if="navigationItems && navigationItems.length > 0 && $route.path === '/'" class="mobile-navigation">
    <navigation-item
      :navigation-item="navigationItem"
      class="mobile-navigation-item heading-1"></navigation-item>
    <div @click="openMobileDropdown" class="mobile-navigation-icon">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           fill="#FFFFFF"
           x="0px"
           y="0px"
           viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
				c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
				z"/>
      <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17
				l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17
				C369.42,189.917,355.913,189.917,347.582,198.248z"/>
		</g>
	</g>
</g>
</svg>
    </div>

    <div v-if="showDropdown" class="mobile-navigation-dropdown">
      <navigation-item
        v-for="(notActiveNavigationItem, notActiveNavigationIndex) in notActiveNavigationItems"
        :navigation-item="notActiveNavigationItem"
        :key="notActiveNavigationIndex"
        class="dropdown-item heading-2"
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


export default {
  name: "mobile-navigation",
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

    .dropdown-item {
      text-align: center;
      padding: 16px 0;
      cursor: pointer;
    }
  }
}

</style>