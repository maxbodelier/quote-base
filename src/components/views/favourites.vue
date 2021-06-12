<template>
  <div v-if="favouriteQuotes.length > 0">
    <quote
      v-for="(quote, quoteIndex) in favouriteQuotes"
      :key="quoteIndex"
      :text="quote.text"
      :author="quote.author"
      :hasFavouriteButton="false"
    >
    </quote>
  </div>
  <div v-else class="quote-message">
    <h3 class="heading-3">You have No Favorite Quotes :(</h3>
  </div>

</template>

<script>
import Quote from "../quote";
export default {
  name: "favourites",
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
        if(Object.prototype.hasOwnProperty.call(session, key)){
          favouriteQuotes.push(session[key])
        }
      }
      favouriteQuotes.splice(0,1);
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