<template>
  <div class="container">
    <h2>주문/결제</h2>
    <hr />
    <div class="orderInfo w3-light-gray">
      <!-- 주문 정보 -->
      <div class="payimgBox">
        <img :src="auction.thumbnail" class="paythumbnail" />
      </div>
      <div>
        <h4>{{auction.title}}</h4>
        <p>{{auction.membersId}}</p>
        <br />
        <br />
        <br />
        <p>작업 마감일 : {{auction.deadline}}</p>
      </div>
    </div>
    <br />
    <div class="payInfo w3-light-gray">
      <div>
        <h4>결제 정보</h4>
      </div>
      <hr />
      <span>총 결제금액 :</span>
      <strong class="price">{{attend.price}}</strong>
    </div>
    <br />
    <div class="payType w3-light-gray">
      <div>
        <h4>결제 방법</h4>
      </div>
      <hr />
      <input type="radio" value="kakaopay" v-model="payType" checked="checked" />&nbsp;
      <img src="../../assets/img/payment_icon_yellow_small.png" />
    </div>
    <br />
    <div class="goPay" value @click="goPay()">
      <b>결제하기</b>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import http from "@/utils/http-require.js";

export default {
  data() {
    return {
      auction: {},
      attend: {},
      payment: {
        membersId: 1,
        itemName: "",
        price: "",
        auctionId: 1
      },
      payType: "kakaopay"
    };
  },
  props: ["auctionId"],
  mounted() {
    this.init();
  },
  methods: {
    init() {
      http
        .get("/auction/search/" + this.auctionId)
        .then(res => {
          this.$data.auction = res.data;
          this.$data.payment.auctionId = res.data.auctionId;
          http
            .get("/attend/searchPickByAuctionId/" + res.data.auctionId)
            .then(res2 => {
              this.$data.attend = res2.data;
              this.$data.payment.membersId = res.data.membersId;
              this.$data.payment.itemName = res.data.title;
              this.$data.payment.price = res2.data.price;
            });
        })
        .catch(res => {
          console.log(res);
        });
    },
    goPay() {
      if (this.$data.payType == "kakaopay") {
        http.post("/pay/paykakao", this.$data.payment).then(response => {
          window.location.href = response.data;
        });
      }
    }
  }
};
</script>

<style>
.container {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 30px;
  min-height: 1300px;
  transition-duration: 1000ms;
}
.container > div {
  margin: 0 auto;
  padding: 25px;
}
.orderInfo {
  height: 250px;
}
.payimgBox {
  float: left;
  height: 200px;
  width: 200px;
  overflow: hidden;
  margin-right: 25px;
}
.paythumbnail {
  max-height: 200px;
  z-index: -1;
  left: 200px;
  margin: 0px 0px 0px -30%;
}
.price {
  color: orangered;
  font-size: 30px;
}
.goPay {
  text-align: center;
  width: 200px;
  background-color: #f1f1f1;
  float: right;
  font-size: 18px;
  margin-bottom: 100px;
}
.goPay:hover {
  transition-duration: 300ms;
  background-color: darkgray;
  color: white;
  cursor: pointer;
}
</style>