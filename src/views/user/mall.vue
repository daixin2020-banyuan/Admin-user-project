<template>
  <div class="mall">
    <div class="point-container">
      <p>当前积分:{{ list.integration }}</p>
    </div>
    <div class="goods-container">
      <p>商品列表</p>
      <div class="item-list">
        <div v-for="item in mallList" :key="item._id">
          <div class="item-container">
            <img :src="item.image" alt="" />
            <p>{{ item.name }}</p>
            <div class="priceDetail">
              <span style="display:flex">
                <img src="../../assets/img5.png" alt="" />
                <p>{{ item.price + "积分" }}</p>
              </span>
              <button @click="exchange(item)">兑换</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "mall",
  data() {
    return {
      mallList: {}
    };
  },
  computed: {
    ...mapState(["list"])
  },
  created() {
    this.getMallList();
  },
  methods: {
    ...mapActions(["setDataToLocal"]),

    async getMallList() {
      const data = await this.yGet("/shop/shopList");
      if (data) {
        this.mallList = data;
      }
    },
    async exchange(item) {
      console.log("商品列表", item);
      let params = {
        id: item._id
      };
      const data = await this.yPut("/shop/exchange", params);
      if (data) {
        this.$message({
          message: "兑换成功",
          type: "success"
        });
        await this.updateUser();
      }
    },
    async updateUser() {
      let userinfo = {
        id: JSON.parse(localStorage.getItem("userInfo"))._id
      };
      const data = await this.yGet("/user/userinfo", {
        params: userinfo
      });
      if (data) {
        console.log(data);
        this.setDataToLocal(data);
      }
    }
  }
};
</script>
<style lang="scss">
.mall {
  height: 100%;
  overflow: scroll;
}
.point-container {
  width: 100%;
  text-align: center;
  background-image: url("../../assets/jifen-background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 150px;
  line-height: 150px;
  font-size: 20px;
  color: white;
}
.goods-container {
  // width: 1050px;
  margin-top: 50px;
  font-size: 18px;
  .item-list {
    display: flex;
    flex-wrap: wrap;

    .item-container {
      width: 240px;
      height: 408px;
      margin-right: 20px;
      box-shadow: 1px 2px 10px #ccc;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      justify-content: space-between;
      img {
        width: 240px;
        height: 240px;
      }
      p {
        font-size: 16px;
        padding: 0 15px;
      }
      .priceDetail {
        width: 100%;
        padding: 0 15px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        p {
          margin: 0;
          padding: 0;
          padding-left: 10px;
          color: rgb(141, 124, 224);
        }
        img {
          width: 20px;
          height: 20px;
        }
        button {
          height: 20px;
          border: none;
          outline: none;
          border-radius: 5px;
          width: 80px;
          background-color: rgb(141, 124, 224);
          color: white;
        }
      }
    }
  }
}
</style>
