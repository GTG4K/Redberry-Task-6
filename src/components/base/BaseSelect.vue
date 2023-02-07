<template>
  <!-- if loading -->
  <div v-if="props.loading" class="select-container">
    <h2>{{ props.title }}</h2>
    <div class="select-body">
      <span>Loading...</span>
    </div>
  </div>

  <!-- if loaded -->
  <div v-else class="select-container">
    <h2>{{ props.title }}</h2>
    <div class="select-body" :class="validation" @click="toggleSelect">
      <span>{{ selectedDegree?.title || 'აირჩიეთ ხარისხი' }}</span>
      <img src="../../assets/svg/arrow-down.svg" alt="" />
    </div>
    <div class="select-options" :class="selectStyling">
      <div
        class="option"
        v-for="option in options"
        :key="option.id"
        @click="changeSelect(option)"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['title', 'loading', 'options', 'modelValue', 'validation']);
const emit = defineEmits(['update:modelValue', 'selectInput']);

const selectedDegree = ref(props.modelValue || null);
const isSelected = ref(false);

function toggleSelect() {
  isSelected.value = !isSelected.value;
}

function changeSelect(option) {
  selectedDegree.value = option;
  isSelected.value = !isSelected.value;
  emit('update:modelValue', selectedDegree.value);
  emit('selectInput');
}

const validation = computed(() => {
  return { passed: props.validation === 'passed', failed: props.validation === 'failed' };
});

const selectStyling = computed(() => {
  return { selected: isSelected.value };
});
</script>

<style scoped lang="scss">
.select-container {
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  position: relative;

  h2 {
    font-weight: 700;
    font-size: 16px;
  }
}

.select-body {
  background: #ffffff;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  padding: 14px;

  display: flex;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;

  &.passed {
    border: 1px solid hsla(105, 64%, 69%, 1);
  }
  &.failed {
    border: 1px solid hsla(0, 83%, 63%, 1);
  }

  &:hover {
    background: rgb(230, 230, 230);
  }
  img {
    user-select: none;
  }
}
.select-options {
  position: absolute;
  background: white;
  width: 100%;
  top: 70px;
  border-radius: 4px;
  user-select: none;
  max-height: 0;
  overflow: hidden;
  transition: all 0.2s linear;

  &.selected {
    max-height: 500px;
    overflow: hidden;
    border: 1px solid #bcbcbc;
  }
}
.option {
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease;
  &:hover {
    background: rgb(200, 200, 200);
    transition: all 0.2s ease;
  }
}
</style>
