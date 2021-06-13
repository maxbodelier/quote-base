<template>
  <div v-if="quoteDetails && quoteDetails.quote">
    <quote
      :text="quoteDetails.quote"
      :author="quoteDetails.author"
      :has-favourite-remove-button="false"
    ></quote>
    <quote-button
      button-text="next quote"
      @fetch-new-quote="fetchQuote"
    ></quote-button>
  </div>
</template>

<script>
import quoteTypeFetcher from '../../mixins/quote-types-fetcher'
import Quote from "../quote";
import QuoteButton from "../quote-button";

export default {
  name: "programming-quotes",
  components: {QuoteButton, Quote},
  mixins: [quoteTypeFetcher],
  data() {
    return {
      quoteDetails: undefined
    }
  },
  created() {
    this.fetchQuote();
  },
  methods: {
    fetchQuote() {
      this.fetchProgrammingQuotes().then((res) => {
        if (res && res.data) {
          this.quoteDetails = res.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped lang="scss"></style>