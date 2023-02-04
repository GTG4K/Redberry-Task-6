<template>
  <div class="resume">
    <div class="personal">
      <div class="details">
        <h1>{{ fullName }}</h1>
        <div class="extra" v-if="props.mail">
          <img src="../../assets/svg/at.svg" alt="" />
          <h3>{{ props.mail }}</h3>
        </div>
        <div class="extra" v-if="props.mNumber">
          <img src="../../assets/svg/phone.svg" alt="" />
          <h3>{{ props.mNumber }}</h3>
        </div>
        <h2 v-if="props.description">ჩემ შესახებ</h2>
        <p>
          {{ props.description }}
        </p>
      </div>
      <div class="img"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['name', 'lastName', 'mNumber', 'mail', 'description']);

const fullName = computed(() => {
  return `${props.name || ''} ${props.lastName || ''}`;
});
</script>

<style scoped lang="scss">
.resume {
  padding: 50px;
}
.personal {
  display: grid;
  grid-template-columns: 1fr 250px;
  .details {
    .extra {
      padding: 10px 0;
      display: flex;
      gap: 10px;
    }

    h1 {
      color: hsla(8, 95%, 55%, 1);
      font-size: 34px;
      font-weight: 700;
      line-height: 41.5px;
      padding: 0 0 10px 0;
    }

    h2 {
      color: hsla(8, 95%, 55%, 1);
      line-height: 22px;
      font-weight: 700;
      font-size: 18px;
      padding: 20px 0 15px 0;
    }

    h3 {
      font-weight: 500;
      font-size: 18px;
      color: hsla(0, 0%, 10%, 1);
    }

    p {
      line-height: 22px;
      font-size: 16px;
    }
  }
  .img {
    background: red;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
}
</style>
