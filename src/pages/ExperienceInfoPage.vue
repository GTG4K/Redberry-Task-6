<template>
  <main>
    <form-container title="გამოცდილება" step="2">
      <template v-slot:inputs>
        <div
          class="experience-container"
          v-for="experience in experiences"
          :key="experience.id"
        >
          <base-text
            title="თანამდებობა"
            hint="მინიმუმ 2 სიმბოლო"
            placeholder="Full-stack developer"
            v-model="experience.position.value"
            :validation="experience.position.isValid.value"
            @textInput="updatePosition(experience)"
          ></base-text>
          <base-text
            title="დამსაქმებელი"
            hint="მინიმუმ 2 სიმბოლო"
            placeholder="Redberry"
            v-model="experience.employer.value"
            :validation="experience.employer.isValid.value"
            @textInput="updateEmployer(experience)"
          ></base-text>
          <div class="duo">
            <base-date
              title="დაწყების რიცხვი"
              v-model="experience.start_date.value"
              :validation="experience.start_date.isValid.value"
              @dateInput="updateStartDate(experience)"
            ></base-date>
            <base-date
              title="დამთავრების რიცხვი"
              v-model="experience.due_date.value"
              :validation="experience.due_date.isValid.value"
              @dateInput="updateEndDate(experience)"
            ></base-date>
          </div>
          <base-textarea
            title="აღწერა"
            placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
            v-model="experience.description.value"
            :validation="experience.description.isValid.value"
            @textInput="updateDescription(experience)"
          ></base-textarea>
          <div class="separator"></div>
        </div>
        <base-button @click="addExperience" theme="blue" class="margin-bot">
          მეტი გამოცდილების დამატება
        </base-button>
      </template>
      <template v-slot:action>
        <base-button @click="nextForm">შემდეგი</base-button>
        <base-button @click="previousForm">უკან</base-button>
      </template>
    </form-container>
    <resume-container :experiences="experiences"></resume-container>
  </main>
</template>

<script setup>
import FormContainer from '../components/ui/FormContainer.vue';
import { useRouter } from 'vue-router';
import { checkEmptyValidity, checkPassed } from '../validator';
import { ref } from 'vue';

const sessionExperiences = JSON.parse(sessionStorage.getItem('experiences'));
const sessionCurrentId = sessionStorage.getItem('currentId');

const currentId = ref(sessionCurrentId || 1);
const experiences = ref(
  sessionExperiences || [
    {
      id: currentId.value,
      position: { value: null, isValid: { value: null } },
      employer: { value: null, isValid: { value: null } },
      start_date: { value: null, isValid: { value: null } },
      due_date: { value: null, isValid: { value: null } },
      description: { value: null, isValid: { value: null } },
    },
  ]
);

function addExperience() {
  currentId.value++;
  const newExperience = {
    id: currentId,
    id: currentId.value,
    position: { value: null, isValid: { value: null } },
    employer: { value: null, isValid: { value: null } },
    start_date: { value: null, isValid: { value: null } },
    due_date: { value: null, isValid: { value: null } },
    description: { value: null, isValid: { value: null } },
  };
  experiences.value.push(newExperience);
  sessionStorage.setItem('experiences', JSON.stringify(experiences.value));
  sessionStorage.setItem('currentId', currentId.value);
}

// CHECK INPUT VALIDITY AND SAVE INPUTS ON CHANGES
function updatePosition(experience) {
  checkEmptyValidity(experience.position, experience.position.isValid, false, 2);
  sessionStorage.setItem('experiences', JSON.stringify(experiences.value));
}
function updateEmployer(experience) {
  checkEmptyValidity(experience.employer, experience.employer.isValid, false, 2);
  sessionStorage.setItem('experiences', JSON.stringify(experiences.value));
}
function updateStartDate(experience) {
  checkEmptyValidity(experience.start_date, experience.start_date.isValid, false);
  sessionStorage.setItem('experiences', JSON.stringify(experiences.value));
}
function updateEndDate(experience) {
  checkEmptyValidity(experience.due_date, experience.due_date.isValid, false);
  sessionStorage.setItem('experiences', JSON.stringify(experiences.value));
}
function updateDescription(experience) {
  checkEmptyValidity(experience.description, experience.description.isValid, false);
  sessionStorage.setItem('experiences', JSON.stringify(experiences.value));
}

const router = useRouter();

function nextForm() {
  let passed = true;
  experiences.value.forEach((experience) => {
    passed = checkPassed(experience.position.isValid);
    passed = checkPassed(experience.employer.isValid);
    passed = checkPassed(experience.start_date.isValid);
    passed = checkPassed(experience.due_date.isValid);
    passed = checkPassed(experience.description.isValid);
  });

  if (passed) {
    router.push('/info/education');
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

.experience-container {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}

.margin-bot {
  margin-bottom: 70px;
}
</style>
