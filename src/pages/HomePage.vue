<template>
  <div class="header">
    <img id="logo" src="../assets/img/redberry.png" alt="" />
    <div class="divider"></div>
  </div>
  <img id="background" src="../assets/img/homeColors.png" alt="" />
  <img id="stamp" src="../assets/img/homeStamp.png" alt="" />
  <base-button id="mainbtn" theme="dark" redirect="/info/private">
    რეზიუმეს დამატება
  </base-button>
</template>

<script setup></script>

<style scoped lang="scss">
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.header {
  position: relative;
  z-index: 2;
  padding: 20px 60px;
}
.divider {
  width: 100%;
  height: 1px;
  margin: 18px 0 0 0;
  background-color: hsla(0, 0%, 10%, 1);
}
#stamp {
  position: fixed;
  top: 45%;
  left: 55%;
}
#mainbtn {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
