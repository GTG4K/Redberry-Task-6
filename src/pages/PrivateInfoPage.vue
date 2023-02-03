<template>
  <main>
    <form-container>
      <template v-slot:inputs>
        <div class="duo">
          <base-text
            title="სახელი"
            hint="მინიმუმ 2 ასო, ქართული ასოები"
            placeholder="შოკო"
          ></base-text>
          <base-text
            title="გვარი"
            hint="მინიმუმ 2 ასო, ქართული ასოები"
            placeholder="ნიშიმია"
          ></base-text>
        </div>
        <base-file title="პირადი ფოტოს ატვირთვა"></base-file>
        <base-textarea></base-textarea>
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
      </template>
      <template v-slot:action>
        <base-button @click="nextForm">შემდეგი</base-button>
      </template>
    </form-container>
    <div class="resume"></div>
  </main>
</template>

<script setup>
import FormContainer from '../components/ui/FormContainer.vue';
import { useRouter } from 'vue-router';

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
