<template>
  <base-button id="back" size="small"></base-button>
  <div class="resume-page">
    <div class="filler"></div>
    <div class="resume-container">
      <resume-container></resume-container>
    </div>
    <div class="message">
      <h1>რეზიუმე წარმატებით გაიგზავნა 🎉</h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.resume-page {
  display: grid;
  grid-template-columns: 450px 1fr 450px;
  padding: 50px;
}
.resume-container {
  width: 850px;
  border: solid 0.8px black;
}

.message {
  border: 0.8px solid hsla(0, 0%, 90%, 1);
  box-shadow: 0 0 10px hsla(0, 0%, 10%, 0.5);
  height: 160px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  h1 {
    color: hsl(0, 0%, 10%);
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 43px;
  }
}

#back {
  position: fixed;
  top: 35px;
  left: 25px;
  background: #f3f3f3;
  &:hover {
    background: #e0e0e0;
  }
  &:focus {
    background: #cecece;
  }
}
</style>
