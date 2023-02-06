<template>
  <div class="resume">
    <div class="personal">
      <div class="details">
        <h1>{{ fullName }}</h1>
        <div class="extra" v-if="mail">
          <img src="../../assets/svg/at.svg" alt="" />
          <h3>{{ mail }}</h3>
        </div>
        <div class="extra" v-if="mNumber">
          <img src="../../assets/svg/phone.svg" alt="" />
          <h3>{{ mNumber }}</h3>
        </div>
        <h2 v-if="description">ჩემ შესახებ</h2>
        <p>
          {{ description }}
        </p>
      </div>
      <img id="profile" v-if="img" :src="img" alt="surati" />
    </div>
    <div class="experience">
      <div class="separator"></div>
      <h2>გამოცდილება</h2>
      <div
        class="experience-block"
        v-for="experience in experiences"
        :key="experience.id"
      >
        <div class="exp-details">
          <h2 class="black" v-if="experience.position || experience.employer">
            {{ experience.position }}, {{ experience.employer }}
          </h2>
          <h2 class="grey" v-if="experience.startDate || experience.endDate">
            {{ experience.startDate }} - {{ experience.endDate }}
          </h2>
        </div>
        <p v-if="experience.description">
          {{ experience.description }}
        </p>
        <div
          v-if="
            experience.position ||
            experience.employer ||
            experience.startDate ||
            experience.endDate ||
            experience.description
          "
          class="separator"
        ></div>
      </div>
    </div>
    <div class="education">
      <h2>განათლება</h2>
      <div class="experience-block" v-for="education in educations" :key="education.id">
        <div class="exp-details">
          <h2 class="black" v-if="education.school">
            {{ education.school }}, {{ education.degree.title || '' }}
          </h2>
          <h2 class="grey" v-if="education.completionDate">
            {{ education.completionDate }}
          </h2>
        </div>
        <p v-if="education.description">
          {{ education.description }}
        </p>
        <div
          v-if="
            education.school ||
            education.degree ||
            education.completionDate ||
            education.description
          "
          class="separator"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps([
  'name',
  'lastName',
  'mNumber',
  'mail',
  'img',
  'description',
  'experiences',
  'educations',
]);

const sessionName = sessionStorage.getItem('name');
const sessionLastName = sessionStorage.getItem('lastName');
const sessionDescription = sessionStorage.getItem('description');
const sessionMail = sessionStorage.getItem('mail');
const sessionMNumber = sessionStorage.getItem('mNumber');
const sessionImgUrl = sessionStorage.getItem('imgUrl');
const sessionExperiences = JSON.parse(sessionStorage.getItem('experiences'));
const sessionEducations = JSON.parse(sessionStorage.getItem('educations'));

const fullName = computed(() => {
  return `${props.name || sessionName || ''} ${props.lastName || sessionLastName || ''}`;
});
const mail = computed(() => {
  return `${props.mail || sessionMail || ''}`;
});
const description = computed(() => {
  return `${props.description || sessionDescription || ''}`;
});
const mNumber = computed(() => {
  return `${props.mNumber || sessionMNumber || ''}`;
});
const img = computed(() => {
  return `${props.img || sessionImgUrl || ''}`;
});
const experiences = computed(() => {
  return props.experiences || sessionExperiences;
});
const educations = computed(() => {
  return props.educations || sessionEducations;
});
</script>

<style scoped lang="scss">
.resume {
  padding: 50px;
}
.personal {
  display: grid;
  grid-template-columns: 1fr 250px;
  .details {
    .extra {
      padding: 10px 0;
      display: flex;
      gap: 10px;
    }
  }
  #profile {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
  }
  h1 {
    padding: 0 0 10px 0;
  }
  h2 {
    padding: 20px 0 15px 0;
  }
}
.experience {
  & > h2 {
    padding: 0 0 10px 0;
  }
}
.experience-block {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.exp-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
h2.black {
  color: hsla(0, 0%, 10%, 1);
  font-weight: 500;
}
h2.grey {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-style: italic;
  color: hsla(0, 0%, 57%, 1);
}

h1 {
  color: hsla(8, 95%, 55%, 1);
  font-size: 34px;
  font-weight: 700;
  line-height: 41.5px;
}

h2 {
  color: hsla(8, 95%, 55%, 1);
  line-height: 22px;
  font-weight: 700;
  font-size: 18px;
}

h3 {
  font-weight: 500;
  font-size: 18px;
  color: hsla(0, 0%, 10%, 1);
}

p {
  line-height: 22px;
  font-size: 16px;
}
.separator {
  height: 1px;
  background: hsla(0, 0%, 78%, 1);
  margin: 20px 0;
}
</style>
