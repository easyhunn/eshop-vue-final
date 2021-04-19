<template>
  <div id="app">
    <Menu />
    <Header />
    <Content />
  </div>
</template>

<script>

import "./assets/css/icon.css";
import "./assets/css/table.css";
import "./assets/css/button.css";
import "./assets/css/common.css";
import "./assets/css/font.css";
import "./assets/css/input.css";
import "./assets/css/main.css";
import "./assets/css/footer.css";

import Menu from "../src/components/layout/Menu.vue";
import Header from "../src/components/layout/Header.vue";
import Content from "../src/components/layout/Content.vue";
export default {
  name: "App",
  components: {
    Menu,
    Header,
    Content
  },
};
</script>

