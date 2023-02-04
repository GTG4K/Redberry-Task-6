<template>
  <main>
    <form-container title="განათლება" step="3">
      <template v-slot:inputs>
        <div
          class="education-container"
          v-for="education in educations"
          :key="education.id"
        >
          <base-text
            title="სასწავლებელი"
            hint="მინიმუმ 2 სიმბოლო"
            placeholder="შუჩიინ აკადემია"
          ></base-text>
          <div class="duo">
            <base-select
              v-if="!degreesLoaded"
              loading="true"
              title="ხარისხი"
            ></base-select>
            <base-select v-else title="ხარისხი" :options="degrees"></base-select>
            <base-date title="დამთავრების რიცხვი"></base-date>
          </div>
          <base-textarea title="აღწერა" placeholder="განათლების აღწერა"></base-textarea>
          <div class="separator"></div>
        </div>
        <base-button @click="addEducation" theme="blue">
          სხვა სასწავლებლის დამატება
        </base-button>
      </template>
      <template v-slot:action>
        <base-button @click="nextForm">შემდეგი</base-button>
        <base-button @click="previousForm">უკან</base-button>
      </template>
    </form-container>
    <div class="resume"></div>
  </main>
</template>

<script setup>
import FormContainer from '../components/ui/FormContainer.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

let CurrentId = 1;
const educations = ref([
  {
    id: CurrentId,
    school: null,
    degree: null,
    completionDate: null,
    description: null,
  },
]);
const degrees = ref([]);
const degreesLoaded = ref(false);

fetch('https://resume.redberryinternship.ge/api/degrees')
  .then((response) => response.json())
  .then((data) => {
    degrees.value = data;
    degreesLoaded.value = true;
  });

function addEducation() {
  CurrentId++;
  const newEducation = {
    id: CurrentId,
    school: null,
    degree: null,
    completionDate: null,
    description: null,
  };
  educations.value.push(newEducation);
}
function nextForm() {
  router.push('/resume');
}
function previousForm() {
  router.back();
}
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}
.duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.separator {
  height: 1px;
  background: hsla(0, 1%, 76%, 1);
}
.resume {
  background: rgb(255, 255, 255);
}

.education-container {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}
</style>
