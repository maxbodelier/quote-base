<template>
  <div v-if="quoteDetails && quoteDetails.quote">
    <quote v-if="quoteDetails.author"
      :text="quoteDetails.quote"
      :author="quoteDetails.author"
      :has-favourite-remove-button="false"
    ></quote>
    <quote v-else
           :text="quoteDetails.quote"
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
          this.quoteDetails.quote = this.quoteDetails.quote === '' ? undefined : this.quoteDetails.quote;
          this.quoteDetails.author = this.quoteDetails.author === '' ? undefined : this.quoteDetails.author;
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped lang="scss"></style>