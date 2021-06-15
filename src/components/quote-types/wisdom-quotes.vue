<template>
  <div v-if="quoteDetails && quoteDetails.text">
    <quote v-if="quoteDetails.author"
           :text="quoteDetails.text"
           :author="quoteDetails.author"
           :has-favourite-remove-button="false"
    ></quote>
    <quote v-else
           :text="quoteDetails.text"
           :has-favourite-remove-button="false"
    ></quote>
    <quote-button
      button-text="next quote"
      @fetch-new-quote="fetchQuote"
    ></quote-button>
  </div>
</template>

<script>
import quoteTypeFetcher from "../../mixins/quote-types-fetcher";
import Quote from "../quote";
import QuoteButton from "../quote-button";

export default {
  name: "wisdom-quotes",
  components: {QuoteButton, Quote},
  mixins: [quoteTypeFetcher],
  data() {
    return {
      quotes: undefined,
      quoteDetails: undefined
    }
  },
  created() {
    this.fetchQuote();
  },
  methods: {
    getRandomQuote(quotes){
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
    fetchQuote() {
      this.fetchWisdomQuotes().then((res) => {
        if(res && res.data) {
          this.quotes = res.data
          console.log(this.quotes.length)
          this.quoteDetails = this.getRandomQuote(this.quotes)
          this.quoteDetails.text = this.quoteDetails.text === '' ? undefined : this.quoteDetails.text;
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