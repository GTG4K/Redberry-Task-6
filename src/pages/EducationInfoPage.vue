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
            v-model="education.school"
            @textInput="updateEducation"
          ></base-text>
          <div class="duo">
            <base-select
              v-if="!degreesLoaded"
              loading="true"
              title="ხარისხი"
            ></base-select>
            <base-select
              v-else
              title="ხარისხი"
              :options="degrees"
              @selectInput="updateEducation"
              v-model="education.degree"
            ></base-select>
            <base-date
              title="დამთავრების რიცხვი"
              @dateInput="updateEducation"
              v-model="education.completionDate"
            ></base-date>
          </div>
          <base-textarea
            title="აღწერა"
            placeholder="განათლების აღწერა"
            @textInput="updateEducation"
            v-model="education.description"
          ></base-textarea>
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
    <resume-container :educations="educations"></resume-container>
  </main>
</template>

<script setup>
import FormContainer from '../components/ui/FormContainer.vue';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
const router = useRouter();

const sessionEducations = JSON.parse(sessionStorage.getItem('educations'));
const sessionCurrentId = sessionStorage.getItem('eduCurrentId');

const currentId = ref(sessionCurrentId || 1);
const educations = ref(
  sessionEducations || [
    {
      id: currentId,
      school: null,
      degree: null,
      completionDate: null,
      description: null,
    },
  ]
);
const degrees = ref([]);
const degreesLoaded = ref(false);

fetch('https://resume.redberryinternship.ge/api/degrees')
  .then((response) => response.json())
  .then((data) => {
    degrees.value = data;
    degreesLoaded.value = true;
  });

function updateEducation() {
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}

function addEducation() {
  currentId.value++;
  const newEducation = {
    id: currentId.value,
    school: null,
    degree: null,
    completionDate: null,
    description: null,
  };
  educations.value.push(newEducation);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
  sessionStorage.setItem('eduCurrentId', currentId.value);
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
