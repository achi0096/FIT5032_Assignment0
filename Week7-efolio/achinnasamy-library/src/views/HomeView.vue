<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    gender: '',
    password: '',
    confirmPassword: '',
    isAustralian: null,
    reason: ''
});

const submittedCards = ref([]);

const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateConfirmPassword(true);
    validateGender(true);
    validateReason(true);
    validateAustralian(true);

    if (!errors.value.username && !errors.value.password && !errors.value.gender && !errors.value.reason && !errors.value.isAustralian) {
        submittedCards.value.push({
            ...formData.value,
            reason: formData.value.reason?.trim() ? formData.value.reason.trim() : 'None'
        });
        clearForm();
    }
};
const clearForm =() => {
    formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: null,
        reason: '',
        gender: ''
    };

    errors.value = {
        username: null,
        password: null,
        confirmPassword: null,
        isAustralian: null,
        reason: null,
        gender: null
    };
};

const errors = ref({
    username: null,
    password: null,
    isAustralian: null,
    reason: null,
    gender: null,
});

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters"
    }
    else {
        errors.value.username = null;
    }
};
const validatePassword = (blur) =>  {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase =/[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length  < minLength) {
        if (blur)errors.value.password = `Password must be at least ${minLength} characters long`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = 'Password must contain at least one uppercase letter';
    } else if (!hasLowercase) {
        if (blur) errors.value.password = 'Password must contain at least one lowercase letter';
    } else if (!hasNumber) {
        if (blur) errors.value.password = 'Password must contain at least one number';
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = 'Password must contain at least one special character';
    } else {
        errors.value.password = null;
    }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
};

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = "please select an option";
    } else {
        errors.value.gender = null;
    }
};

const validateReason = (blur) => {
    const text = (formData.value.reason || '').trim();
    if (text.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters";
    } else if (text.length > 100) {
        if (blur) errors.value.reason = "Reason must not exceed 100 characters";
    } else {
        errors.value.reason = null;
    }
};

const validateAustralian = (blur) => {
    if (formData.value.isAustralian == null) {
        if (blur) errors.value.isAustralian = "Please select yes or no";
    } else {
        errors.value.isAustralian = null;
    }
};
</script>
<style scoped>

@media (max-width: 768px) {
  .row.mb-3 .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username" />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender"
              @blur="() => validateGender(true)"
              @change="() => validateGender(false)"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" 
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)" 
              v-model="formData.password" />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
                <label for="confirm-password" class="form-label">Confirm password</label>
                <input
                     type="password"
                     class="form-control"
                     id="confirm-password"
                     v-model="formData.confirmPassword"
                     @blur="() => validateConfirmPassword(true)"
                  />
                <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <label class="form-label d-block">Australian Resident?</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="australianyes"
                  :value="true"
                  v-model="formData.isAustralian"
                  @blur="() => validateAustralian(true)"
                  @change="() => validateAustralian(false)"
                />
                <label class="form-check-label" for="australianyes">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="australianno"
                  :value="false"
                  v-model="formData.isAustralian"
                  @blur="() => validateAustralian(true)"
                  @change="() => validateAustralian(false)"
                />
                <label class="form-check-label" for="australianno">No</label>
              </div>
              <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea class="form-control" id="reason" rows="3" v-model="formData.reason"
            @blur="() => validateReason(true)"
            @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>
          
        <div class="mb-3">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-12">
        <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
          <Column field="username" header="Username" headerClass="fw-bold"></Column>
          <Column field="password" header="Password" headerClass="fw-bold"></Column>
          <Column field="isAustralian" header="Australian Resident" headerClass="fw-bold">
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'True' : 'False' }}
            </template>
          </Column>
          <Column field="gender" header="Gender" headerClass="fw-bold"></Column>
          <Column field="reason" header="Reason" headerClass="fw-bold"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

