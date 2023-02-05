<template>
  <div class="input-container">
    <h2>{{ props.title }}</h2>
    <textarea
      @input="updateValue"
      :placeholder="props.placeholder"
      :value="inputValue"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['title', 'placeholder', 'modelValue']);
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
  }
  h2 {
    font-weight: 700;
    font-size: 16px;
  }
  span {
    font-weight: 300;
    color: hsla(0, 0%, 18%, 1);
    font-size: 14px;
  }
}
</style>
