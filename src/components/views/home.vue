<template>
  <component :is="activeQuoteType"></component>
</template>

<script>
import Navigation from "../../components/navigation/navigation";
import ProgrammingQuotes from "../../components/quote-types/programming-quotes";
import WisdomQuotes from "../../components/quote-types/wisdom-quotes";

export default {
  name: "home",
  components: {
    'programming': ProgrammingQuotes,
    'wisdom': WisdomQuotes,
    Navigation
  },
  props: {
    quoteTypes: {
      type: Array,
      required: true
    },
    activeQuoteType: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>

</style>