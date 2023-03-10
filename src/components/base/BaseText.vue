<template>
  <div class="input-container">
    <h2 :class="validation">{{ props.title }}</h2>
    <input
      type="text"
      :value="inputValue"
      :placeholder="props.placeholder"
      :class="validation"
      @input="updateValue"
    />
    <img
      v-if="props.validation === 'passed'"
      id="pass"
      src="../../assets/svg/pass.svg"
      alt=""
    />
    <img
      v-if="props.validation === 'failed'"
      id="error"
      src="../../assets/svg/error.svg"
      alt=""
    />
    <span>{{ props.hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps([
  'title',
  'placeholder',
  'hint',
  'validation',
  'number',
  'modelValue',
]);
const emit = defineEmits(['update:modelValue', 'textInput']);

const inputValue = ref(props.modelValue);

const validation = computed(() => {
  return { passed: props.validation === 'passed', failed: props.validation === 'failed' };
});

function updateValue(e) {
  let input = e.target.value;
  if (props.number) {
    if (
      input.length === 4 ||
      input.length === 8 ||
      input.length === 11 ||
      input.length === 14
    ) {
      input += ' ';
    }
  }
  inputValue.value = input;
  emit('update:modelValue', inputValue.value);
  emit('textInput');
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  position: relative;

  input {
    background: #ffffff;
    border: 1px solid #bcbcbc;
    border-radius: 4px;
    padding: 14px 7px;
    &.failed {
      border: 1px solid hsla(0, 83%, 63%, 1);
    }
    &.passed {
      border: 1px solid hsla(105, 64%, 69%, 1);
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

#pass {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 12px;
  top: 36.5px;
}

#error {
  width: 18px;
  height: 18px;
  position: absolute;
  right: -29px;
  top: 36.5px;
}
</style>
