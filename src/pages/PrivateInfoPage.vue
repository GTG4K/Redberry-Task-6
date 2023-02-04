<template>
  <main>
    <form-container title="პირადი ინფო" step="1">
      <template v-slot:inputs>
        <div class="duo">
          <base-text
            title="სახელი"
            hint="მინიმუმ 2 ასო, ქართული ასოები"
            placeholder="შოკო"
            v-model="name"
          ></base-text>
          <base-text
            title="გვარი"
            hint="მინიმუმ 2 ასო, ქართული ასოები"
            placeholder="ნიშიმია"
            v-model="lastName"
          ></base-text>
        </div>
        <base-file title="პირადი ფოტოს ატვირთვა"></base-file>
        <base-textarea
          title="ჩემ შესახებ (არასავალდებულო)"
          placeholder="ზოგადი ინფო შენ შესახებ"
          v-model="description"
        ></base-textarea>
        <base-text
          title="ელ.ფოსტა"
          hint="უნდა მთავრდებოდეს @redberry.ge-თი"
          placeholder="Shoko.Nishimiya@redberry.ge"
          v-model="mail"
        ></base-text>
        <base-text
          title="მობილურის ნომერი"
          hint="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
          placeholder="+995 551 12 34 56"
          v-model="mNumber"
        ></base-text>
      </template>
      <template v-slot:action>
        <base-button @click="nextForm">შემდეგი</base-button>
      </template>
    </form-container>
    <resume-container
      :name="name"
      :lastName="lastName"
      :mNumber="mNumber"
      :mail="mail"
      :description="description"
    ></resume-container>
  </main>
</template>

<script setup>
import FormContainer from '../components/ui/FormContainer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const lastName = ref('');
const description = ref('');
const mail = ref('');
const mNumber = ref('');

const router = useRouter();

function nextForm() {
  router.push('/info/experience');
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
.resume {
  background: rgb(255, 255, 255);
}
</style>
