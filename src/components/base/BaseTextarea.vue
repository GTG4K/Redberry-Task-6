<template>
  <div class="input-container">
    <h2>სახელი</h2>
    <textarea></textarea>
    <span>მინიმუმ 2 ასო ბრო</span>
  </div>
</template>

<script setup></script>

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
