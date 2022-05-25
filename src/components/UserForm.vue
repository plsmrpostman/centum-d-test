<template>
  <form @submit.prevent="formSubmit" class="user-form" ref="userForm">
    <div class="row">
      <div class="col mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model.trim="formData.name" required>
      </div>
      <div class="col mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model.trim="formData.username" required>
      </div>
      <div class="col mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model.trim="formData.email" required>
      </div>
    </div>
    <div class="row">
      <div class="col mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input type="text" class="form-control" id="phone" v-model.trim="formData.phone" required>
      </div>
      <div class="col mb-3">
        <label for="website" class="form-label">Website</label>
        <input type="text" class="form-control" id="website" v-model.trim="formData.website" required>
      </div>
    </div>
    
    <button type="submit" class="btn btn-primary submit-btn" :class="{'disact': requestIsPending}">
      <span v-if="requestIsPending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-else>{{ submitText }}</span>
    </button>
    <button v-if="editMode" class="btn btn-danger cancel-btn" @click.prevent="$parent.editFormVisible = false">Cancel</button>

  </form>
    
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'user-form',
    data() {
      return {
        formData: {}
      }
    },
    props: {
      user: Object,
      editMode: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['requestIsPending']),
      submitText() {
        return this.editMode ? "Edit user data" : "Add User"
      }
    },
    watch: {
      requestIsPending(pending) {
        if (this.editMode && !pending) this.$parent.editFormVisible = false;
        if (!this.editMode && !pending) {
          this.formData = {};
          this.$parent.currentPage = 0;
        }  
      }
    },
    methods: {
      ...mapActions(['createNewUser', 'editUserData']),

      formSubmit() {
        this.$store.commit('changeRequestStatus', true);

        if (!this.editMode) {
          this.createNewUser(this.formData);
        } else {
          this.editUserData(this.formData);
        }
      }
    },
    created() {
      if (this.editMode) {
        this.formData = this.user;
      }
    }
  }
</script>

<style lang="scss">
  .user-form {
    margin: 30px 0;

    .submit-btn {
      &.disact {
        pointer-events: none;
        opacity: 0.5
      }

      .spinner-border {
        margin: 0
      }
    }

    .cancel-btn {
      margin-left: 10px;
    }

    /* .btns-block {
      display: flex;
      justify-content: flex-end;
      flex-direction: row-reverse;
    } */

    /* .submit-btn {
      margin-left: 20px;
    } */
  }

  
</style>