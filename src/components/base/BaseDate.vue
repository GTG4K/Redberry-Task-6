<template>
  <div class="input-container">
    <h2>სახელი</h2>
    <input type="date" />
  </div>
</template>

<script setup></script>

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
