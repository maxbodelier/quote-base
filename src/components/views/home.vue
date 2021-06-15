<template>
  <component :is="activeQuoteType"></component>
</template>

<script>
import ProgrammingQuotes from "../../components/quote-types/programming-quotes";
import WisdomQuotes from "../../components/quote-types/wisdom-quotes";

export default {
  name: "home",
  components: {
    'programming': ProgrammingQuotes,
    'wisdom': WisdomQuotes
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

<style scoped lang="scss"></style>