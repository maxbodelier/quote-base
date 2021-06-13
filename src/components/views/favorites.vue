<template>
  <div v-if="favouriteQuotes && favouriteQuotes.length > 0">
    <div v-for="(quote, quoteIndex) in favouriteQuotes" :key="quoteIndex">
      <quote
        v-if="quote && quote.text"
        :text="quote.text"
        :author="quote.author"
        :hasFavouriteAddButton="false"
        @delete-favourite-quote="getAllQuotesFromSession"
      ></quote>
    </div>
  </div>
  <div v-else class="quote-message">
    <h3 class="heading-3">You have No Favorite Quotes :(</h3>
  </div>

</template>

<script>
import Quote from "../quote";

export default {
  name: "favorites",
  components: {Quote},
  data() {
    return {
      favouriteQuotes: []
    }
  },
  created() {
    this.getAllQuotesFromSession();
  },
  methods: {
    getAllQuotesFromSession() {
      let favouriteQuotes = []
      const session = this.$session.getAll();
      for (const key in session) {
        if (Object.prototype.hasOwnProperty.call(session, key)) {
          favouriteQuotes.push(session[key])
        }
      }
      //remove session ID
      favouriteQuotes.splice(0, 1);
      this.favouriteQuotes = favouriteQuotes
    }
  }
}
</script>

<style scoped lang="scss">
.quote-message {
  text-align: center;
}
</style>