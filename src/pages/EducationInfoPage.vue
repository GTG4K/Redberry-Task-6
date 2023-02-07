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
            v-model="education.school.value"
            :validation="education.school.isValid.value"
            @textInput="updateSchool(education)"
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
              @selectInput="updateDegree(education)"
              :validation="education.degree.isValid.value"
              v-model="education.degree.value"
            ></base-select>
            <base-date
              title="დამთავრების რიცხვი"
              @dateInput="updateDate(education)"
              v-model="education.completionDate.value"
              :validation="education.completionDate.isValid.value"
            ></base-date>
          </div>
          <base-textarea
            title="აღწერა"
            placeholder="განათლების აღწერა"
            @textInput="updateDescription(education)"
            v-model="education.description.value"
            :validation="education.description.isValid.value"
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
import { checkEmptyValidity, checkSelectValidity } from '../validator';
const router = useRouter();

const sessionEducations = JSON.parse(sessionStorage.getItem('educations'));
const sessionCurrentId = sessionStorage.getItem('eduCurrentId');

const currentId = ref(sessionCurrentId || 1);
const educations = ref(
  sessionEducations || [
    {
      id: currentId,
      school: { value: null, isValid: { value: null } },
      degree: { value: null, isValid: { value: null } },
      completionDate: { value: null, isValid: { value: null } },
      description: { value: null, isValid: { value: null } },
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

function updateSchool(education) {
  checkEmptyValidity(education.school, education.school.isValid, false, 2);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}
function updateDegree(education) {
  checkSelectValidity(education.degree, education.degree.isValid, false);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}
function updateDate(education) {
  checkEmptyValidity(education.completionDate, education.completionDate.isValid, false);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}
function updateDescription(education) {
  checkEmptyValidity(education.description, education.description.isValid, false);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}

function addEducation() {
  currentId.value++;
  const newEducation = {
    id: currentId.value,
    school: { value: null, isValid: { value: null } },
    degree: { value: null, isValid: { value: null } },
    completionDate: { value: null, isValid: { value: null } },
    description: { value: null, isValid: { value: null } },
  };
  educations.value.push(newEducation);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
  sessionStorage.setItem('eduCurrentId', currentId.value);
}
function nextForm() {
  let passed = true;
  educations.value.forEach((education) => {
    if (
      education.school.isValid.value === null ||
      education.school.isValid.value === 'failed'
    ) {
      education.school.isValid.value = 'failed';
      passed = false;
    }
    if (
      education.degree.isValid.value === null ||
      education.degree.isValid.value === 'failed'
    ) {
      education.degree.isValid.value = 'failed';
      passed = false;
    }
    if (
      education.completionDate.isValid.value === null ||
      education.completionDate.isValid.value === 'failed'
    ) {
      education.completionDate.isValid.value = 'failed';
      passed = false;
    }
    if (
      education.description.isValid.value === null ||
      education.description.isValid.value === 'failed'
    ) {
      education.description.isValid.value = 'failed';
      passed = false;
    }
  });

  if (passed) {
    router.push('/resume');
  }
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
