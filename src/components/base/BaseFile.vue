<template>
  <div class="input-container">
    <h2>{{ props.title }}</h2>
    <div>
      <label for="file">ატვირთვა</label>
      <input type="file" id="file" @change="updateInput" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['title', 'modelValue']);
const emit = defineEmits(['update:modelValue', 'fileInput']);

function updateInput(e) {
  const fr = new FileReader();
  fr.readAsDataURL(e.target.files[0]);

  fr.addEventListener('load', () => {
    const url = fr.result;
    emit('update:modelValue', url);
    emit('fileInput', e.target.files[0]);
  });
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h2 {
    font-weight: 700;
    font-size: 18px;
  }

  input {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    color: white;
    border-radius: 4px;
    background: hsla(202, 86%, 40%, 1);
    padding: 7px 10px;
    font-size: 15px;

    &:hover {
      background: hsla(202, 86%, 50%, 1);
    }
    &:active {
      background: hsla(202, 86%, 30%, 1);
    }
  }
}
</style>
