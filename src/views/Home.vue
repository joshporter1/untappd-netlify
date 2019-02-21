<template>
  <div class="home">
    <h1>{{ users[0].name }}: {{ users[0].count }}</h1>
    <h1>{{ users[1].name }}: {{ users[1].count }}</h1>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      users: [
        {
          name: null,
          count: null
        },
        {
          name: null,
          count: null
        }
      ]
    };
  },
  watch: {
    "$route.params": {
      immediate: true,
      handler(val) {
        this.users[0].name = val.user1;
        this.users[0].count = null;
        this.users[1].name = val.user2;
        this.users[1].count = null;
        this.updateUsers();
      }
    }
  },
  computed: {
    base() {
      if (process.env.NODE_ENV === "development")
        return "http://localhost:8010/proxy";
      return "/proxy";
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
            let unique = doc.querySelector(".stats > a:nth-child(2) > span")
              .innerText;
            this.users[i].count = unique;
          })
          .catch(function(err) {
            console.log("Failed to fetch page: ", err);
          });
      });
    }
  }
};
</script>
