<template>
  <!-- Multiple tbody tag is valid -->
  <tbody>
    <tr :class="{'editMode': editFormVisible}">
      <td> 
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="checked" :id="checkboxId">
          <label class="form-check-label" :for="checkboxId">Add to store</label>
        </div>          
      </td>
      <td> {{ user.name }} </td>
      <td> {{ user.username }} </td>
      <td> <a :href="`mailto: ${user.email}`">{{ user.email }}</a> </td>
      <td>
        <button class="btn btn-primary" @click="editFormVisible = true">Edit user</button>
      </td>
      <td>
        <router-link :user="user" :to="`/user-details/${user.id}`" class="btn btn-primary">User Details</router-link>
      </td>
    </tr>
    <tr class="edit-block" v-if="editFormVisible">
      <td colspan="6">
        <user-form :editMode="true" :user="userCopy" />
      </td>
    </tr>
  </tbody>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'
import UserForm from '@/components/UserForm'

export default {
  name: 'users-list-item',
  components: {
    UserForm
  },
  data() {
    return {
      checked: false,
      editFormVisible: false
    }
  },
  props: {
    user: Object,
    selectedAll: Boolean
  },
  methods: {
    ...mapMutations([
      'checkUser', 'uncheckUser'
    ]),
  },
  watch: {
    selectedAll() {
      this.checked = this.selectedAll;
    },
    checked(val) {
      if (val && !this.itemInStore) {
        this.checkUser(this.user);
      }
      if (!val) {
        this.uncheckUser(this.user);
      }
    }
  }, 
  computed: {
    ...mapGetters(['checkedUsersId']),
    checkboxId() {
      return 'flexCheckDefault' + this.user.id;
    },
    itemInStore() {
      return this.checkedUsersId.includes(this.user.id);
    },
    userCopy() {
      return JSON.parse(JSON.stringify(this.user))
    }
  },
  created() {
    if (this.itemInStore) this.checked = true;
  }
}
</script>


<style lang="scss" scoped>
  .users-table {
    td {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .editMode td {
      border: 0;
    }

    .edit-block td {
      padding: 0
    }

    .user-form {
      margin-top: 0px;
    }
  }
</style>