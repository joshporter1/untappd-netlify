<template>
  <v-layout flex justify-space-around wrap>
    <v-flex xs4 pa-2 v-for="user in users" :key="user.name">
      <user-card
        :user="user"
        :highest="highest"
        :secondHighest="secondHighest"
      ></user-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
export default {
  name: "home",
  components: { UserCard },
  data() {
    return {
      users: []
    };
  },
  watch: {
    "$route.params": {
      immediate: true,
      handler(val) {
        this.users = [];
        Object.keys(val).map(key => {
          var i = parseInt(key.replace("user", "")) - 1;
          this.users[i] = {};
          this.users[i].name = val[key];
          this.users[i].count = null;
        });
        if (this.users.length) this.updateUsers();
      }
    }
  },
  computed: {
    base() {
      if (process.env.NODE_ENV === "development")
        return "http://localhost:8010/proxy";
      return "/untappd";
    },
    highest() {
      return Math.max(
        ...this.users.map(user => parseInt(user.unique.replace(",", "")))
      );
    },
    secondHighest() {
      var arr = this.users.map(user => parseInt(user.unique.replace(",", "")));
      arr.splice(arr.indexOf(this.highest), 1);
      return Math.max.apply(null, arr);
    }
  },
  methods: {
    updateUsers() {
      this.users.map((user, i) => {
        let url = `${this.base}/user/${user.name}`;
        fetch(url)
          .then(response => {
            return response.text();
          })
          .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let fields = {
              name: user.name,
              fullName: doc
                .querySelector(".info > h1")
                .innerText.replace(/\r?\n|\r/g, ""),
              avatar: doc.querySelector(".user-avatar img").src,
              unique: doc.querySelector(".stats > a:nth-child(2) > span")
                .innerText
            };
            this.$set(this.users, i, fields);
          })
          .catch(function(err) {
            console.log("Failed to fetch page: ", err);
          });
      });
    }
  }
};
</script>
