<template>
  <button v-if="props.size === 'small'" class="small" @click="redirectHome">
    <img src="../../assets/svg/back.svg" alt="" />
  </button>
  <button v-else :type="props.type" :class="styling" @click="redirectTo">
    <h2>
      <slot></slot>
    </h2>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['type', 'size', 'theme', 'redirect']);

function redirectTo() {
  if (props.redirect) {
    router.push(props.redirect);
  }
}

function redirectHome() {
  sessionStorage.clear();
  router.push('/home');
}

const styling = computed(() => {
  return {
    dark: props.theme === 'dark',
    blue: props.theme === 'blue',
  };
});
</script>

<style scoped lang="scss">
button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 50px;
  border: none;

  font-size: 20px;
  color: white;
  background: hsla(256, 74%, 57%, 1);
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  &:hover {
    background: hsla(256, 100%, 64%, 1);
  }
  &:active {
    background: hsla(256, 57%, 44%, 1);
  }
}
.dark {
  background: #1a1a1a;
  padding: 14px 100px;
  &:hover {
    background: #1f1f1f;
  }
}

.blue {
  background: hsla(202, 86%, 40%, 1);

  &:hover {
    background: hsla(202, 86%, 50%, 1);
  }
  &:active {
    background: hsla(202, 86%, 30%, 1);
  }
}
.small {
  background-color: white;
  padding: 0;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  color: #1a1a1a;

  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgb(207, 207, 207);
  }
}
</style>
