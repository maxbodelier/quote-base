<template>
  <div class="quote-container">
    <div class="quote">
      <h2 class="quote-text heading-2">{{ text }}</h2>
      <p v-if="author" class="quote-author">- {{ author }}</p>
      <p v-if="hasFavouriteButton" class="quote-favourites" @click="addToFavourites">+ add to favourites</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "quote",
  props: {
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Unkown Author'
    },
    hasFavouriteButton: {
      type: Boolean,
      default: true
    }
  },
  created() {
  },
  methods: {
    addToFavourites() {
      this.$session.set(`${this.getUniqueId()}`, {
        'text': this.text,
        'author': this.author
      })
    },
    getUniqueId(){
      let textToRandomize = this.text.substr(0, 20);
      textToRandomize = textToRandomize.replace(/ /g,'')
      const uniqueId = textToRandomize.toUpperCase();
      return `favourite_quote_${uniqueId}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.quote-container {
  max-width: 1280px;
  display: flex;
  justify-content: center;
  margin: 64px auto;

  .quote {
    width: 50%;
    padding: 64px 64px 32px 64px;
    border: 1px solid $background-color-accent;
    border-radius: 32px;
    box-shadow: 0 10px 16px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);

    .quote-author{
      text-align: right;
    }

    .quote-favourites {
      cursor: pointer;
      width: fit-content;
      text-align: center;

      &:hover {
        color: #ffc107;
      }
    }

    @media only screen and (max-width: 768px){
      padding: 32px 32px 16px 32px;
    }
  }
}

</style>