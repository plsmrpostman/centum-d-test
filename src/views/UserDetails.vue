<template>
  <div class="container">
    <div class="row"  v-if="usersLoaded">
      <div class="col-lg-12">

        <button class="btn btn-primary back-btn" @click="$router.push('/')">
          &#x2190;
          Back
        </button>

        <h1> {{ user.name }}'s profile </h1>

        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"> {{ user.name }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Username</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"> {{ user.username }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"><a :href="`mailto: ${user.email}`">{{ user.email }}</a> </p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">
                  {{ address }}
                </p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">
                  <a :href="`tel:${phone}`"> {{ phone }}</a>
                </p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Website</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">
                  <a :href="`${user.website}`"> {{ user.website }}</a>
                </p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Company</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">
                  {{ company }} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <button class="btn btn-primary back-btn" @click="editFormVisible = true">Update user data</button>

        <user-form v-if="editFormVisible" :editMode="true" :user="userCopy" />
      </div>
    </div>
    
    <div class="spinner-border" role="status" v-else>
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import UserForm from '@/components/UserForm'

export default {
  components: {
    UserForm
  },
  data() {
    return {
      userId: +this.$route.params.id,
      editFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['userById', 'usersLoaded']),
    user() {
      return this.userById(this.userId) || {}
    },
    phone () {
      return this.user.phone.split(' ')[0];
    },
    company() {
      if ('company' in this.user) {
        return `${this.user.company.name}, 
                ${this.user.company.catchPhrase}, 
                ${this.user.company.bs}`
      } else {
        return '–'
      }
    },
    address() {
      if ('address' in this.user) {
        return `${this.user.address.street}, 
                ${this.user.address.suite}, 
                ${this.user.address.city},
                ${this.user.address.zipcode}`
      } else {
        return '–'
      }
    },
    userCopy() {
      return JSON.parse(JSON.stringify(this.user))
    }
  }
}
</script>

<style scoped>
  .card {
    margin-top: 30px;
  }

  .back-btn {
    margin-bottom: 30px;
  }
</style>