<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
        >
          Bobo careers
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else text="Sign in" @click="loginUser" />
        </div>
      </div>
      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "pinia"

import { useUserStore } from "@/stores/user"

import ActionButton from "@/components/Shared/ActionButton.vue"
import ProfileImage from "@/components/Navigation/ProfileImage.vue"
import TheSubnav from "@/components/Navigation/TheSubnav.vue"

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav
  },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "/" },
        { text: "Location", url: "/" },
        { text: "Life at Bobo Corp", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/jobs/results" }
      ]
    }
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]), //userStore
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"])
  }
}
</script>
