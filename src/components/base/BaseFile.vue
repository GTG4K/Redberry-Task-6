<template>
  <div class="input-container">
    <h2>{{ props.title }}</h2>
    <div>
      <label for="file">ატვირთვა</label>
      <input type="file" id="file" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title']);
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
