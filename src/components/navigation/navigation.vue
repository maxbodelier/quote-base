<template>
  <div class="navigation">
    <router-link to="/" class="home">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
           y="0px"
           viewBox="0 0 460.298 460.297"
           style="enable-background:new 0 0 460.298 460.297;"
           xml:space="preserve">
<g>
	<g>
		<path d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041
			c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629
			c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939
			z"/>
    <path d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816
			c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245
			c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136
			c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998
			L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125
			c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"/>
	</g>
</g>
</svg>
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
    <router-link to="/favourites" class="favourites">
      <svg viewBox="0 -10 511.98685 511" xmlns="http://www.w3.org/2000/svg">
        <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/>
      </svg>
    </router-link>
  </div>
</template>

<script>
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

export default {
  name: "navigation",
  components: {MobileNavigation, DesktopNavigation},
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
.navigation {
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  margin: auto;

  .home {
    padding: 32px;
    width: 36px;
    height: 36px;
    fill: #FFFFFF;
    cursor: pointer;

    &.router-link-exact-active{
      fill: #55cd96;
    }

    &:hover{
      fill: #55cd96;
    }
  }

  .favourites {
    padding: 32px;
    width: 36px;
    height: 36px;
    fill: #FFFFFF;
    cursor: pointer;

    &.router-link-exact-active{
      fill: #ffc107;
    }

    &:hover {
      fill: #ffc107;
    }
  }
}
</style>