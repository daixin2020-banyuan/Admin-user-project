<template>
  <div class="exchange-container">
    <div v-for="item in exchangeList" :key="item.index" class="ex-list-style">
      <p>{{ item.name }}</p>
      <p>{{ item.createdAt | formatTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "exchange",
  data() {
    return {
      exchangeList: {}
    };
  },
  filters: {
    formatTime(time) {
      let value = new Date(time);
      let y = value.getFullYear();
      var m = value.getMonth() + 1;
      var d = value.getDate();
      var h = value.getHours();
      var mm = value.getMinutes();
      return y + "-" + m + "-" + d + "\n" + h + ":" + mm;
    }
  },
  created() {
    this.getExchangeList();
  },

  methods: {
    async getExchangeList() {
      let details = {
        id: JSON.parse(localStorage.getItem("userInfo"))._id
      };
      const data = await this.yGet("/shop/exchangedRecord", {
        params: details
      });

      if (data) {
        this.exchangeList = data;
      }
    }
  }
};
</script>

<style lang="scss">
.exchange-container {
  width: 99%;
  height: 100vh;
  border: 1px solid rgb(219, 213, 213);
  padding: 15px;
  box-sizing: border-box;
  overflow: scroll;
  .ex-list-style {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgb(223, 217, 217);
  }
}
</style>
