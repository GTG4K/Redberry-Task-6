<template>
  <button v-if="props.size === 'small'" @click="redirectBack">-</button>
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

function redirectBack() {
  router.back();
}

const styling = computed(() => {
  return {
    dark: props.theme === 'dark',
  };
});
</script>

<style scoped lang="scss">
button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 60px;
  border: none;

  font-size: 20px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
.dark {
  background: #1a1a1a;
  padding: 14px 100px;
  &:hover {
    background: #1f1f1f;
  }
}
.small {
}
</style>
