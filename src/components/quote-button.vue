<template>
  <div class="button-container width-container">
    <button
      class="button heading-3"
      @click="$emit('fetch-new-quote')"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  name: "quote-button",
  props: {
    buttonText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.button-container {
  margin: 64px auto;
  display: flex;
  justify-content: center;

  .button {
    cursor: pointer;
    padding: 16px 32px;
    background-color: $background-color-accent-green;
    border-radius: 16px;
    border: none;
    color: $font-color-normal;
    text-transform: capitalize;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>