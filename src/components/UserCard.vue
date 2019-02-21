<template>
  <v-card :color="color" class="white--text">
    <v-layout row>
      <v-flex xs7>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ user.fullName }}</div>
            <div class="title">
              {{ user.unique }}
              <span class=" font-weight-light">unique check-ins</span>
            </div>
            <div>({{ difference }} )</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs5>
        <v-img :src="user.avatar" :aspect-ratio="1" contain></v-img>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: Object,
    highest: Number,
    secondHighest: Number
  },
  computed: {
    unique() {
      console.log(this.user.unique);
      return parseInt(this.user.unique.replace(",", ""));
    },
    color() {
      if (this.unique > this.secondHighest) {
        return "green lighten-2";
      } else {
        return "red lighten-2";
      }
    },
    difference() {
      if (this.unique > this.secondHighest) {
        return Math.abs(this.unique - this.secondHighest) + " ahead";
      } else {
        return Math.abs(this.unique - this.highest) + " behind";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
