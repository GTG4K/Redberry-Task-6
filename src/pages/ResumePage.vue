<template>
  <base-button id="back" size="small"></base-button>
  <div class="resume-page">
    <div class="filler"></div>
    <div class="resume-container">
      <h1 v-if="!dataLoaded">Fetching data...</h1>
      <resume-container
        v-if="dataLoaded"
        :name="fetchedData.name"
        :lastName="fetchedData.surname"
        :mNumber="fetchedData.phone_number"
        :mail="fetchedData.email"
        :img="fetchedData.image"
        :description="fetchedData.about_me"
        :experiences="resumeExperiences"
        :educations="resumeEducations"
      ></resume-container>
    </div>
    <div class="message">
      <h1>რეზიუმე წარმატებით გაიგზავნა 🎉</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// redirect to home page, if data is not loaded properly or page has been refreshed
const router = useRouter();

if (!sessionStorage.getItem('name')) {
  router.replace({ path: '/' });
}

// resume page variables
const dataLoaded = ref(false);
const fetchedData = ref(null);
const id = ref(0);
const resumeExperiences = ref([]);
const resumeEducations = ref([]);

//get Stored form data
const sessionName = sessionStorage.getItem('name');
const sessionLastName = sessionStorage.getItem('lastName');
const sessionDescription = sessionStorage.getItem('description');
const sessionMail = sessionStorage.getItem('mail');
const sessionMNumber = sessionStorage.getItem('mNumber');
const sessionImgUrl = sessionStorage.getItem('imgUrl');
const sessionExperiences = JSON.parse(sessionStorage.getItem('experiences'));
const sessionEducations = JSON.parse(sessionStorage.getItem('educations'));

// format data correctly
let formatedFile = null;
const formatedNumber = sessionMNumber.replace(/ /g, '');

// set up education and experience arrays properly
const formatedExperiences = [];
const formatedEducations = [];
sessionExperiences.forEach((experience) => {
  const formatedExperience = {
    position: experience.position.value,
    employer: experience.employer.value,
    start_date: experience.start_date.value.replaceAll('-', '/'),
    due_date: experience.due_date.value.replaceAll('-', '/'),
    description: experience.description.value,
  };
  formatedExperiences.push(formatedExperience);
});
sessionEducations.forEach((education) => {
  const formatedEducation = {
    institute: education.institute.value,
    degree_id: education.degree.value.id,
    due_date: education.due_date.value.replaceAll('-', '/'),
    description: education.description.value,
  };
  formatedEducations.push(formatedEducation);
});

//turn base64 file into a blob for post request
fetch(sessionImgUrl)
  .then((res) => res.blob())
  .then((blob) => {
    formatedFile = blob;

    // final data object for POST
    const data = {
      name: sessionName,
      surname: sessionLastName,
      email: sessionMail,
      phone_number: sessionMNumber.replace(/ /g, ''),
      experiences: formatedExperiences,
      educations: formatedEducations,
      image: formatedFile,
      about_me: sessionDescription || '',
    };

    // sending the post request
    axios
      .post('https://resume.redberryinternship.ge/api/cvs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        fetchedData.value = response.data;
        dataLoaded.value = true;
        console.log(fetchedData.value);

        // clear old data
        sessionStorage.clear();

        // format data so resumeContainer can read it
        fetchedData.value.experiences.forEach((experience) => {
          id.value++;
          const newExperience = {
            id: id.value,
            position: { value: experience.position, isValid: { value: null } },
            employer: { value: experience.employer, isValid: { value: null } },
            start_date: { value: experience.start_date, isValid: { value: null } },
            due_date: { value: experience.due_date, isValid: { value: null } },
            description: { value: experience.description, isValid: { value: null } },
          };
          resumeExperiences.value.push(newExperience);
        });
        fetchedData.value.educations.forEach((education) => {
          id.value++;
          const newEducation = {
            id: id.value,
            institute: { value: education.institute, isValid: { value: null } },
            degree: { value: education.degree, isValid: { value: null } },
            due_date: { value: education.due_date, isValid: { value: null } },
            description: { value: education.description, isValid: { value: null } },
          };
          resumeEducations.value.push(newEducation);
        });
      })
      .catch((error) => console.log(error));
  });
</script>

<style scoped lang="scss">
* {
  font-family: 'HelveticaNeue';
}
.resume-page {
  display: grid;
  grid-template-columns: 450px 1fr 450px;
  padding: 50px;
}
.resume-container {
  width: 850px;
  border: solid 0.8px black;
}

.message {
  border: 0.8px solid hsla(0, 0%, 90%, 1);
  box-shadow: 0 0 10px hsla(0, 0%, 10%, 0.5);
  height: 160px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  h1 {
    color: hsl(0, 0%, 10%);
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 43px;
  }
}

#back {
  position: fixed;
  top: 35px;
  left: 25px;
  background: #f3f3f3;
  &:hover {
    background: #e0e0e0;
  }
  &:focus {
    background: #cecece;
  }
}
</style>
