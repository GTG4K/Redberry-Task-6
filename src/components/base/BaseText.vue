<template>
  <div class="input-container">
    <h2>{{ props.title }}</h2>
    <input
      type="text"
      :value="inputValue"
      :placeholder="props.placeholder"
      @input="updateValue"
    />
    <span>{{ props.hint }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['title', 'placeholder', 'hint', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

function updateValue(e) {
  inputValue.value = e.target.value;
  emit('update:modelValue', inputValue.value);
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  gap: 0.4rem;
  flex-direction: column;

  input {
    background: #ffffff;
    border: 1px solid #bcbcbc;
    border-radius: 4px;
    padding: 14px 7px;
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
