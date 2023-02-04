<template>
  <main>
    <form-container>
      <template v-slot:inputs>
        <div
          class="experience-container"
          v-for="experience in experiences"
          :key="experience.id"
        >
          <base-text
            title="ელ.ფოსტა"
            hint="უნდა მთავრდებოდეს @redberry.ge-თი"
            placeholder="Shoko.Nishimiya@redberry.ge "
          ></base-text>
          <base-text
            title="მობილურის ნომერი"
            hint="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
            placeholder="+995 551 12 34 56"
          ></base-text>
          <div class="duo">
            <base-date></base-date>
            <base-date></base-date>
          </div>
          <base-textarea
            title="აღწერა"
            placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
          ></base-textarea>
          <div class="separator"></div>
        </div>
        <base-button @click="addExperience" theme="blue">
          მეტი გამოცდილების დამატება
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

let CurrentId = 1;
const experiences = ref([
  {
    id: CurrentId,
    email: null,
    mNumber: null,
    startDate: null,
    endDate: null,
    description: null,
  },
]);

function addExperience() {
  CurrentId++;
  const newExperience = {
    id: CurrentId,
    email: null,
    mNumber: null,
    startDate: null,
    endDate: null,
    description: null,
  };
  experiences.value.push(newExperience);
}

const router = useRouter();

function nextForm() {
  router.push('/info/experience');
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
</style>
