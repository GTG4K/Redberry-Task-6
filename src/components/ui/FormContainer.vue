<template>
  <div class="form">
    <base-button id="back" size="small"></base-button>
    <div class="form-main">
      <div class="form-header">
        <h2>{{ props.title }}</h2>
        <p>{{ props.step }}/3</p>
      </div>
      <div class="form-inputs">
        <slot name="inputs"></slot>
      </div>
    </div>
    <div class="form-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'step']);
</script>

<style scoped lang="scss">
#back {
  position: fixed;
  top: 35px;
  left: 25px;
}
.form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #f3f3f3;
  min-height: 100vh;
  padding: 35px 100px;
}
.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  height: 70vh;
  overflow-y: auto;
  padding-right: 5px;
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 15px 0;
  margin: 0 0 55px 0;
  border-bottom: solid 1px hsla(0, 0%, 10%, 1);

  h2 {
    font-size: 22px;
    font-weight: 700;
  }
  p {
    font-size: 19px;
    color: hsla(0, 0%, 10%, 1);
  }
}

.form-action {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
</style>
