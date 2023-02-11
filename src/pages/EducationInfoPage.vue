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
            v-model="education.institute.value"
            :validation="education.institute.isValid.value"
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
              v-model="education.due_date.value"
              :validation="education.due_date.isValid.value"
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
import { checkEmptyValidity, checkSelectValidity, checkPassed } from '../validator';
const router = useRouter();

// Private info page data
const sessionName = sessionStorage.getItem('name');
const sessionLastName = sessionStorage.getItem('lastName');
const sessionDescription = sessionStorage.getItem('description');
const sessionMail = sessionStorage.getItem('mail');
const sessionMNumber = sessionStorage.getItem('mNumber');
const sessionImgUrl = sessionStorage.getItem('imgUrl');
// experience data
const sessionExperiences = JSON.parse(sessionStorage.getItem('experiences'));

const sessionEducations = JSON.parse(sessionStorage.getItem('educations'));
const sessionCurrentId = sessionStorage.getItem('eduCurrentId');

const currentId = ref(sessionCurrentId || 1);
const educations = ref(
  sessionEducations || [
    {
      id: currentId,
      institute: { value: null, isValid: { value: null } },
      degree: { value: null, isValid: { value: null } },
      due_date: { value: null, isValid: { value: null } },
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
  checkEmptyValidity(education.institute, education.institute.isValid, false, 2);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}
function updateDegree(education) {
  checkSelectValidity(education.degree, education.degree.isValid, false);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
}
function updateDate(education) {
  checkEmptyValidity(education.due_date, education.due_date.isValid, false);
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
    institute: { value: null, isValid: { value: null } },
    degree: { value: null, isValid: { value: null } },
    due_date: { value: null, isValid: { value: null } },
    description: { value: null, isValid: { value: null } },
  };
  educations.value.push(newEducation);
  sessionStorage.setItem('educations', JSON.stringify(educations.value));
  sessionStorage.setItem('eduCurrentId', currentId.value);
}

function nextForm() {
  let passed = true;
  educations.value.forEach((education) => {
    passed = checkPassed(education.institute.isValid);
    passed = checkPassed(education.degree.isValid);
    passed = checkPassed(education.due_date.isValid);
    passed = checkPassed(education.description.isValid);
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
