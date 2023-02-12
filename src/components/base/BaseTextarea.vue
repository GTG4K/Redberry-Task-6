<template>
  <div class="input-container">
    <h2 :class="validation">{{ props.title }}</h2>
    <textarea
      @input="updateValue"
      :placeholder="props.placeholder"
      :value="inputValue"
      :class="validation"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['title', 'placeholder', 'validation', 'modelValue']);
const emit = defineEmits(['update:modelValue', 'textInput']);

const inputValue = ref(props.modelValue);

function updateValue(e) {
  inputValue.value = e.target.value;
  emit('update:modelValue', inputValue.value);
  emit('textInput');
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  gap: 0.4rem;
  flex-direction: column;

  textarea {
    resize: none;
    height: 80px;
    border-radius: 4px;
    background: white;
    border: 1px solid #bcbcbc;

    &.passed {
      border: 1px solid hsla(105, 64%, 69%, 1);
    }
    &.failed {
      border: 1px solid hsla(0, 83%, 63%, 1);
    }
  }
  h2 {
    font-weight: 700;
    font-size: 16px;
    &.failed {
      color: hsla(0, 78%, 54%, 1);
    }
  }
  span {
    font-weight: 300;
    color: hsla(0, 0%, 18%, 1);
    font-size: 14px;
  }
}
</style>
