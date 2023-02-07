<template>
  <div class="input-container">
    <h2>{{ props.title }}</h2>
    <input
      type="date"
      :value="inputValue"
      @input="updateValue"
      :class="props.validation"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['title', 'modelValue', 'validation']);
const emit = defineEmits(['update:modelValue', 'dateInput']);

const inputValue = ref(props.modelValue);

function updateValue(e) {
  inputValue.value = e.target.value;
  emit('update:modelValue', inputValue.value);
  emit('dateInput');
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  gap: 0.4rem;
  flex-direction: column;

  .passed {
    border: 1px solid hsla(105, 64%, 69%, 1);
  }
  .failed {
    border: 1px solid hsla(0, 83%, 63%, 1);
  }

  input {
    background: #ffffff;
    border: 1px solid #bcbcbc;
    border-radius: 4px;
    padding: 14px 7px;
    cursor: pointer;
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
