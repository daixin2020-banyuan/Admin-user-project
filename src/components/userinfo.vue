<template>
  <div class="userinfo">
    <div class="img-container">
      <img :src="list.avatar" alt="" />
    </div>

    <div class="name-container">
      <div>
        <p>姓名:</p>
        {{ list.username }}
      </div>
      <div>
        <p>昵称:</p>
        {{ list.nickname }}
      </div>
      <div>
        <p>密码:</p>
        {{ password }}
        <span @click="changePassword">修改</span>
      </div>
    </div>
    <div class="school-container">
      <div>
        <p>学校:</p>
        {{ list.school }}
      </div>
      <div>
        <p>性别:</p>
        {{ list.gender == "1" ? "男" : "女" }}
      </div>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      @close="closeModel"
    >
      <el-form :model="form" :rules="passwordRules" ref="registForm">
        <el-form-item
          label="旧密码"
          :label-width="formLabelWidth"
          prop="oldpassword"
        >
          <el-input v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          :label-width="formLabelWidth"
          prop="newpassword"
        >
          <el-input v-model="form.newpassword"></el-input>
        </el-form-item>
        <el-form-item
          label="再次确认密码"
          :label-width="formLabelWidth"
          prop="checkpassword"
        >
          <el-input v-model="form.checkpassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button slot="reference" type="primary" plain @click="checkData"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userinfo",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldpassword: "",
        newpassword: "",
        checkpassword: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",

      passwordRules: {
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, message: "长度在6位以上", trigger: "blur" }
        ],
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "长度在6位以上", trigger: "blur" }
        ],
        checkpassword: [
          { min: 6, message: "长度在6位以上", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["list"]),
    password: function() {
      let j = "";
      for (let i = 0; i < this.list.password.length; i++) {
        j = j + "*";
      }
      return j;
    }
  },
  methods: {
    changePassword() {
      this.dialogFormVisible = true;
    },
    closeModel() {
      console.log("关闭了弹窗");
      this.form = {};
      this.dialogFormVisible = false;
      this.$refs.registForm.clearValidate();
    },
    checkData() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.save();
        } else {
          return false;
        }
      });
    },

    async save() {
      let params = {
        oldPassword: this.form.oldpassword,
        newPassword: this.form.newpassword
      };
      const data = await this.yPut("/user/changePassword", params);
      if (data) {
        this.closeModel();
        this.$message({
          message: "修改成功",
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.userinfo {
  display: flex;
  color: rgb(188, 188, 188);
  font-size: 16px;
  .img-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 150px;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .name-container {
    margin-right: 150px;

    div {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      p {
        margin-right: 20px;
      }
      span {
        margin-left: 20px;
        cursor: pointer;
        color: rgb(139, 139, 248);
      }
    }
  }
  .school-container {
    div {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
    }
    p {
      margin-right: 20px;
    }
  }
}
</style>
