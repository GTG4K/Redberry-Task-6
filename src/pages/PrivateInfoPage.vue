<template>
  <main>
    <form-container title="პირადი ინფო" step="1">
      <template v-slot:inputs>
        <div class="duo">
          <base-text
            title="სახელი"
            hint="მინიმუმ 2 ასო, ქართული ასოები"
            placeholder="შოკო"
            :validation="nameIsValid"
            v-model="name"
          ></base-text>
          <base-text
            title="გვარი"
            hint="მინიმუმ 2 ასო, ქართული ასოები"
            placeholder="ნიშიმია"
            :validation="lastNameIsValid"
            v-model="lastName"
          ></base-text>
        </div>
        <base-file
          title="პირადი ფოტოს ატვირთვა"
          v-model="imgUrl"
          :validation="imgUrlIsValid"
        ></base-file>
        <base-textarea
          title="ჩემ შესახებ (არასავალდებულო)"
          placeholder="ზოგადი ინფო შენ შესახებ"
          v-model="description"
          :validation="descriptionIsValid"
        ></base-textarea>
        <base-text
          title="ელ.ფოსტა"
          hint="უნდა მთავრდებოდეს @redberry.ge-თი"
          placeholder="Shoko.Nishimiya@redberry.ge"
          v-model="mail"
          :validation="mailIsValid"
        ></base-text>
        <base-text
          title="მობილურის ნომერი"
          hint="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
          placeholder="+995 551 12 34 56"
          :number="true"
          v-model="mNumber"
          :validation="mNumberIsValid"
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
      :img="imgUrl"
    ></resume-container>
  </main>
</template>

<script setup>
import FormContainer from '../components/ui/FormContainer.vue';
import {
  checkLanguageValidity,
  checkMobileValidity,
  checkEmailValidity,
  checkEmptyValidity,
  checkPassed,
} from '../validator';
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

// sessionStorage
const sessionName = sessionStorage.getItem('name');
const sessionLastName = sessionStorage.getItem('lastName');
const sessionDescription = sessionStorage.getItem('description');
const sessionMail = sessionStorage.getItem('mail');
const sessionMNumber = sessionStorage.getItem('mNumber');
const sessionImgUrl = sessionStorage.getItem('imgUrl');

const name = ref(sessionName || '');
const lastName = ref(sessionLastName || '');
const description = ref(sessionDescription || '');
const mail = ref(sessionMail || '');
const mNumber = ref(sessionMNumber || '');
const imgUrl = ref(sessionImgUrl || '');

const nameIsValid = ref(null);
const lastNameIsValid = ref(null);
const descriptionIsValid = ref(null);
const mailIsValid = ref(null);
const mNumberIsValid = ref(null);
const imgUrlIsValid = ref(null);

// CHECK FOR INPUTS ON LOAD IN CASE OF REFRESH
checkLanguageValidity(name, nameIsValid);
checkLanguageValidity(lastName, lastNameIsValid);
checkEmptyValidity(description, descriptionIsValid);
checkEmailValidity(mail, mailIsValid);
checkMobileValidity(mNumber, mNumberIsValid);
checkEmptyValidity(imgUrl, imgUrlIsValid, false);

// CLEAR ALL ERRORS ON INITIAL PAGE LOAD
if (!sessionStorage.getItem('name')) {
  checkEmptyValidity(name, nameIsValid);
  checkEmptyValidity(lastName, lastNameIsValid);
  checkEmptyValidity(mail, mailIsValid);
  checkEmptyValidity(mNumber, mNumberIsValid);
  checkEmptyValidity(imgUrl, imgUrlIsValid);
}

// CHECK INPUT VALIDITY AND SAVE INPUTS ON CHANGES
watch(name, () => {
  checkLanguageValidity(name, nameIsValid);
  sessionStorage.setItem('name', name.value);
});
watch(lastName, () => {
  checkLanguageValidity(lastName, lastNameIsValid);
  sessionStorage.setItem('lastName', lastName.value);
});
watch(description, () => {
  checkEmptyValidity(description, descriptionIsValid);
  sessionStorage.setItem('description', description.value);
});
watch(mail, () => {
  checkEmailValidity(mail, mailIsValid);
  sessionStorage.setItem('mail', mail.value);
});
watch(mNumber, () => {
  checkMobileValidity(mNumber, mNumberIsValid);
  sessionStorage.setItem('mNumber', mNumber.value);
});
watch(imgUrl, () => {
  checkEmptyValidity(imgUrl, imgUrlIsValid, false);
  sessionStorage.setItem('imgUrl', imgUrl.value);
});

const router = useRouter();

function nextForm() {
  let passed = true;
  passed = checkPassed(nameIsValid);
  passed = checkPassed(lastNameIsValid);
  passed = checkPassed(mNumberIsValid);
  passed = checkPassed(mailIsValid);
  passed = checkPassed(imgUrlIsValid);

  if (passed) {
    router.push('/info/experience');
  }
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
