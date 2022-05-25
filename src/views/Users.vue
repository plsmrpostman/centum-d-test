<template>
  <div>
    <div class="container users-list-page">
      <div class="row">
        <h1>Users List</h1>
        
        <div class="spinner-border" role="status" v-if="!usersLoaded">
          <span class="visually-hidden">Loading...</span>
        </div>

        <table class="table users-table" v-else>
          <thead>
            <tr>
              <th scope="col">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="selectAll" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    Add all
                  </label>
                </div>                  
              </th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

            <users-list-item v-for="user in users" :key="user.id" :selectedAll="selectAll" :user="user" />
        </table>

        <nav class="pagination-wrap" v-if="pagesCount !== 0 && usersLoaded">
          <ul class="pagination">
            <li class="page-item" :class="{disabled: currentPage === 0}">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="currentPage -= 1">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" :class="{active: currentPage === page-1}" v-for="page in pagesCount" :key="page">
              <a class="page-link" href="#" @click.prevent="currentPage = page-1"> {{ page }} </a>
            </li>
            <li class="page-item" :class="{disabled: currentPage === pagesCount-1}">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="currentPage += 1">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="container add-user-wrap">
      <h2>Add new user</h2>
      <user-form />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import UsersListItem from '@/components/UsersListItem'
import UserForm from '@/components/UserForm'

export default {
  name: 'Users',
  components: {
    UsersListItem,
    UserForm
  },
  data: function() {
    return {
      currentPage: 0,
      itemsPerPage: 4,
      selectAll: false
    }
  },
  computed: {
    ...mapGetters(['checkedUsersId', 'allUsers', 'usersLoaded']),
    pageOffset() {
      return this.currentPage * this.itemsPerPage
    },
    pagesCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    totalItems() {
      return this.allUsers.length
    },
    users() {
      return this.allUsers.slice(this.pageOffset, this.pageOffset+this.itemsPerPage);
    },
    usersIds() {
      return this.users.map((item) => item.id);
    }
  },
  watch: {
    currentPage() {

      for (let id of this.usersIds) {
        if (!this.checkedUsersId.includes(id)) {
          this.selectAll = false;
          return;
        }
      }

      this.selectAll = true;
    }
  }
}
</script>


<style lang="scss">
  .users-list-page {
    .pagination-wrap {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .users-table {
      margin-top: 30px;
    }

    .add-user-wrap {
      margin-top: 30px;
    }

    .user-form {
      margin-top: 20px;
    }
  }
</style>