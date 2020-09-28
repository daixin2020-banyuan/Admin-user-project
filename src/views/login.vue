<template>
  <div class="login-container">
    <div class="login-left">
      <img src="../assets/auth.png" alt="" />
    </div>
    <div class="login-right">
      <h1>欢迎登陆</h1>
      <div class="login-form-container">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              style="margin-top:25px"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="margin-top:25px"
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <div style=" text-align: center;margin-top:20px">
            <span>还没有账号?</span
            ><router-link to="regist">新用户注册</router-link>
          </div>
          <el-button type="primary" class="login-btn" @click="checkData"
            >登陆</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["setDataToLocal"]),

    checkData() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        } else {
          return;
        }
      });
    },
    async login() {
      const data = await this.yPost("/user/login", this.loginForm);
      if (data) {
        this.setDataToLocal(data.user);
        this.$router.push({
          name: "user"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  .login-left {
    width: 44%;
    padding-left: 50px;
    padding-top: 50px;

    img {
      width: 90%;
    }
  }
  .login-right {
    width: 56%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .login-form-container {
      width: 350px;
      font-size: 14px;
      span {
        color: rgb(175, 175, 175);
      }
      a {
        color: rgb(113, 83, 215);
      }
      .login-btn {
        width: 350px;
        background-color: rgb(113, 83, 215);
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        font-size: 18px;
        letter-spacing: 10px;
        margin-top: 34px;
        span {
          color: white !important;
        }
      }
    }
  }
}
</style>
