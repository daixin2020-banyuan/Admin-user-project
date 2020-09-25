<template>
  <div class="login-container">
    <div class="login-left">
      <img src="../assets/auth.png" alt="" />
    </div>
    <div class="login-right">
      <h2>注册新用户</h2>
      <div class="login-form-container">
        <el-form
          :model="registForm"
          :rules="registRules"
          ref="registForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              style="margin-top:15px"
              v-model="registRules.username"
              placeholder="用户名:6位以上数字和字母组成"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="margin-top:15px"
              v-model="registRules.password"
              placeholder="密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="school">
            <el-input
              style="margin-top:15px"
              v-model="registRules.school"
              placeholder="学校"
            ></el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input
              style="margin-top:15px"
              v-model="registRules.nickname"
              placeholder="昵称"
            ></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input
              style="margin-top:15px"
              v-model="registRules.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="gender" style="width:350px;margin-top:15px">
              <el-option
                v-for="item in options"
                :key="item.gender"
                :label="item.label"
                :gender="item.gender"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div style=" text-align: center;margin-top:20px">
            <span>已有账号?</span><router-link to="login">去登陆</router-link>
          </div>
          <el-button type="primary" class="login-btn" @click="checkRegistData"
            >注册</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "regist",
  components: {},
  data() {
    return {
      registForm: {
        username: "", //string
        password: "", //string
        school: "", //string
        nickname: "", //string
        age: null, //string || number
        gender: 1 //number
      },
      registRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            // type: Number,
            message: "请输入英文或者数字",
            trigger: "blur"
          },
          { min: 6, message: "长度在6位以上", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在6位以上", trigger: "blur" }
        ],
        school: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
          { message: "请输入数字", trigger: "blur" }
        ]
      },
      gender: 1,
      options: [
        {
          gender: 1,
          label: "男"
        },
        {
          gender: 0,
          label: "女"
        }
      ]
    };
  },
  methods: {
    checkRegistData() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.regist();
        } else {
          return;
        }
      });
    },
    async regist() {
      const data = await this.yPost("/user/regist", this.registForm);
      if (data) {
        let id = data.user._id;
        localStorage.setItem("user", id);
        this.$router.push({
          name: "login"
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
    padding-top: 50px;
    h2 {
      margin-top: 0;
    }
    .login-form-container {
      width: 350px;
      font-size: 14px;
      span {
        color: rgb(175, 175, 175);
      }
      a {
        color: rgb(113, 83, 215);
        text-decoration: none;
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
