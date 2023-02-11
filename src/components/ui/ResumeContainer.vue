<template>
  <div class="resume">
    <div class="private">
      <div class="private-details">
        <div class="private-info">
          <h2>{{ fullName }}</h2>
          <div class="marked-details">
            <div class="marked-detail">
              <img v-if="mail" src="../../assets/svg/at.svg" alt="" />
              <p class="large">{{ mail }}</p>
            </div>
            <div class="marked-detail">
              <img v-if="mNumber" src="../../assets/svg/phone.svg" alt="" />
              <p class="large">{{ mNumber }}</p>
            </div>
          </div>
        </div>
        <div class="description">
          <h3 v-if="description">ჩემ შესახებ</h3>
          <p>{{ description }}</p>
        </div>
      </div>
      <img v-if="img" id="profile-img" :src="img" alt="" />
    </div>
    <div v-if="experiences" class="separator"></div>
    <div v-if="experiences" class="experiences">
      <h3 class="title">გამოცდილება</h3>
      <div v-for="experience in experiences" :key="experience.id" class="experience">
        <div class="duo-holder">
          <div class="duo">
            <h4>{{ experience.position.value }}</h4>
            <h4
              class="coma"
              v-if="experience.position.value && experience.employer.value"
            >
              ,
            </h4>
            <h4>{{ experience.employer.value }}</h4>
          </div>
          <div class="duo">
            <h4 class="faded">{{ experience.start_date.value }}</h4>
            <h4
              v-if="experience.start_date.value && experience.due_date.value"
              class="faded dash"
            >
              -
            </h4>
            <h4 class="faded">{{ experience.due_date.value }}</h4>
          </div>
        </div>
        <p>{{ experience.description.value }}</p>
        <div
          v-if="
            experience.position.value ||
            experience.employer.value ||
            experience.start_date.value ||
            experience.due_date.value ||
            experience.description.value
          "
          class="separator"
        ></div>
      </div>
    </div>
    <div v-if="educations" class="experiences">
      <h3 class="title">განათლება</h3>
      <div v-for="education in educations" :key="education.id" class="experience">
        <div class="duo">
          <h4>{{ education.institute.value }}</h4>
          <h4
            class="coma"
            v-if="education.institute.value && education.degree.value?.title"
          >
            ,
          </h4>
          <h4>{{ education.degree.value?.title || null }}</h4>
        </div>
        <h4 class="faded">{{ education.due_date.value }}</h4>
        <p>{{ education.description.value }}</p>
        <div
          v-if="
            education.institute.value ||
            education.degree.value?.title ||
            education.due_date.value ||
            education.description.value
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
#profile-img {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
}
.resume {
  padding: 50px;
}

h2 {
  font-weight: 700;
  font-size: 34px;
  line-height: 42px;
  color: #f93b1d;
}

h3 {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #f93b1d;
}

h4 {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #1a1a1a;
  &.coma {
    padding: 0 8px 0 0;
  }
  &.faded {
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #919191;
    &.dash {
      padding: 0 8px;
    }
  }
}

p {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  &.large {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #1a1a1a;
  }
}

.duo {
  display: flex;
}
.separator {
  margin: 1.2rem 0;
  height: 1px;
  background: #c8c8c8;
}
.duo-holder {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.private {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 250px;

  .private-details {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }
  .private-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .marked-details {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .marked-detail {
    display: flex;
    gap: 0.7rem;
  }
  .description {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
}

.experiences {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  .experience {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
}
</style>
