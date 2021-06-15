<template>
  <div v-if="text" class="quote-container width-container">
    <div class="quote">
      <h2 class="quote-text heading-2">{{ text }}</h2>
      <p
        v-if="author"
        class="quote-author"
      >
        - {{ author }}
      </p>
      <p
        v-if="hasFavouriteAddButton"
        class="quote-add-favorites"
        @click="addToFavorites"
      >
        + add to favorites
      </p>
      <p
        v-if="hasFavouriteRemoveButton"
        class="quote-remove-favorites"
        @click="removeFromFavorites"
      >
        - remove from favorites
      </p>
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
      default: 'Unknown Author'
    },
    hasFavouriteAddButton: {
      type: Boolean,
      default: true
    },
    hasFavouriteRemoveButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addToFavorites() {
      const quoteObject = {
        'text': this.text,
        'author': this.author
      }

      window.sessionStorage.setItem(`${this.createdUniqueIdFromText()}`, JSON.stringify(quoteObject))
    },
    removeFromFavorites() {
      window.sessionStorage.removeItem(`${this.createdUniqueIdFromText()}`)
      this.$emit('delete-favourite-quote')
    },
    createdUniqueIdFromText() {
      let uniqueId = this.text.replace(/ /g, '').substr(0, 20).toUpperCase();
      return `favourite_quote_${uniqueId}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.quote-container {
  display: flex;
  justify-content: center;
  margin: 64px auto;

  .quote {
    width: 50%;
    padding: 64px 64px 32px 64px;
    border: 1px solid $background-color-accent-white;
    border-radius: 32px;
    box-shadow: 0 10px 16px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);

    .quote-author {
      text-align: right;
    }

    .quote-add-favorites, .quote-remove-favorites {
      cursor: pointer;
      width: fit-content;
      text-align: center;

      &:hover {
        color: $icon-color-accent-yellow;
      }
    }

    @media only screen and (max-width: 768px) {
      padding: 32px 32px 16px 32px;
    }
  }
}

</style>