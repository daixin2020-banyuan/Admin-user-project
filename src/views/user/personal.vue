<template>
  <div>
    <div class="setting-nav">
      <h1 @click="fun('userinfo')">
        个人信息
        <span
          class="span1"
          :style="{ display: componentId == 'userinfo' ? 'block' : 'none' }"
        ></span>
      </h1>
      <h1 @click="fun('exchange')">
        兑换记录
        <span
          class="span2"
          :style="{ display: componentId == 'exchange' ? 'block' : 'none' }"
        ></span>
      </h1>
    </div>

    <div class="setting-per">
      <keep-alive>
        <component :is="componentId"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import userinfo from "../../components/userinfo";
import exchange from "../../components/exchange";
export default {
  name: "personal",
  components: {
    userinfo,
    exchange
  },
  data() {
    return {
      componentId: "userinfo"
    };
  },
  methods: {
    fun(name) {
      this.flag = name;
      this.componentId = name;
    }
  }
};
</script>

<style>
.setting-nav {
  display: flex;
}
.setting-nav h1 {
  font-size: 20px;
  font-weight: 400;
  color: #707070;
  line-height: 28px;
  padding-right: 55px;
  padding-bottom: 23px;
  cursor: pointer;
}
.setting-per {
  width: 100%;
  min-height: 500px;
  overflow: hidden;
}
.setting-nav h1:hover {
  text-decoration: cat;
}
.span1 {
  display: block;
  width: 80px;
  height: 4px;
  background-color: #6964d1;
}
.span2 {
  display: none;
  width: 80px;
  height: 4px;
  background-color: #6964d1;
}
.userInfo-container {
  padding-top: 50px;
}
</style>
