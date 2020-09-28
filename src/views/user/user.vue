<template>
  <div class="user-container">
    <div class="user-dashbord">
      <!-- icon -->
      <div>
        <div class="user-avatar">
          <img :src="list.avatar" class="user-avatar-icon" />
        </div>
        <div class="user-info">{{ list.nickname }}</div>
      </div>

      <!-- selection -->
      <div class="mine">
        <router-link to="/user/personal">
          <div
            class="chos-bg"
            @click="change('个人中心')"
            :style="{
              backgroundColor: title == '个人中心' ? 'rgb(134,0,155)' : ''
            }"
          >
            <p>个人中心</p>
          </div>
        </router-link>

        <router-link to="/user/mall">
          <div
            class="chos-bg"
            @click="change('兑换商城')"
            :style="{
              backgroundColor: title == '兑换商城' ? 'rgb(134,0,155)' : ''
            }"
          >
            <p>积分商城</p>
          </div>
        </router-link>

        <div
          class="chos-bg"
          @click="change('退出')"
          :style="{
            backgroundColor: title == '退出' ? 'rgb(134,0,155)' : ''
          }"
        >
          <el-button type="text" class="quit-btn" @click="open">
            <p style="font-size:15px">退出</p></el-button
          >
        </div>
      </div>
    </div>
    <div class="center">
      <div class="nav-title">
        {{ title }}
      </div>
      <router-view class="component"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",

  data() {
    return {
      title: "个人中心",
      list: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    change(title) {
      this.title = title;
    },
    async getUserInfo() {
      let userinfo = {
        id: JSON.parse(localStorage.getItem("userInfo"))._id
      };
      const data = await this.yGet("/user/userinfo", {
        params: userinfo
      });
      if (data) {
        this.list = data;
      }
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "退出",
        message: h("p", null, [h("span", null, "确定退出吗？ ")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "请稍等...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 2000);
          } else {
            done();
          }
        }
      }).then(action => {
        console.log(action);
        localStorage.removeItem("userInfo");
        this.$router.replace({
          name: "login"
        });
        this.$message({
          type: "success",
          message: "退出成功 "
        });
      });
    }
  }
};
</script>

<style lang="scss">
.user-container {
  display: flex;
  width: 100%;
  height: 100vh;
  a {
    text-decoration: none;
    color: white;
  }
}
.user-dashbord {
  display: inline-block;
  vertical-align: top;
  width: 250px;
  height: 100vh;
  min-height: 768px;
  background-color: rgb(51, 51, 51);
  position: fixed;
  left: 0;
  top: 0;
  min-width: 160px;
  z-index: 2;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  color: white;
}
.user-center {
  vertical-align: top;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  padding-left: 15.6vw;
  position: relative;
}
.logo-container {
  text-align: center;
  padding: 2vh 0 8.16vh;
}
.logo-container img {
  width: 146px;
  height: 43px;
  cursor: pointer;
}
.user-avatar {
  height: 78px;
  text-align: center;
  margin-top: 100px;
}
.user-avatar-icon {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.user-info {
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  padding: 0.51vh 0 8.16vh;
  color: white;
  margin-top: 20px;
}
.user-info h2 {
  font-size: 14px;
  font-weight: 300;
  color: white;
  line-height: 25px;
  margin: 0;
  padding: 1px 0;
}
.chos-bg {
  display: flex;
  align-items: center;
  height: 54px;
  justify-content: center;
  cursor: pointer;
}
.chos-bg img {
  width: 22px;
  height: 22px;
  margin-right: 9px;
}
.chos-bg p {
  color: white;
  font-weight: 300;
  line-height: 54px;
  width: 70px;
}
.menu-bom {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 108px;
}
.chos-bg:hover {
  background-color: rgb(167, 159, 194);
}
.center {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 250px;
  padding-top: 56px;

  .nav-title {
    height: 56px;
    padding: 0 40px;
    background: #fff;
    box-shadow: 5px 6px 4px rgba(213, 209, 209, 0.5);
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    z-index: 9999;
    display: flex;
    color: #707070;
    line-height: 56px;
    cursor: pointer;
    overflow: hidden;
  }
  .component {
    padding: 50px 100px;
  }
}
</style>
