<template>
  <div>
      <div v-if="loading">
      <div class="succText">
        <img src="../../assets/img/pay.png" width="100" height="100">
        <h1>결제가 완료되었습니다.</h1>
      </div>
      <div class="succInfo w3-light-gray">
      <p>결제번호 : {{payment.paymentId}}</p>
      <p>결제시각 : {{payment.approvedAt}}</p>
      <p>상품명 : {{payment.itemName}}</p>
      <p>가격 : {{payment.price}}</p>
      <p>결제수단 : {{payment.paymentMethodType|engToKr}}</p>
      </div>
      <br/><br/>
      <div class="btnArea w3-light-gray" @click="goProgress">
      <h4>착수 페이지로 이동</h4>
      </div>
      </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";

export default {
    data() {
        return {
            payment: {},
            loading: false
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            var pg_token = this.$route.query.pg_token
            var membersId = this.$route.query.membersId
            var auctionId = this.$route.query.auctionId
            await http
            .get('pay/succPaykakao/'+membersId+'/'+auctionId+'/'+pg_token)
            .then(response => {
                this.$data.payment = response.data
                this.loading = true
            })
            
        },
        goProgress() {
          this.$router.push("/Progress/"+this.$data.payment.auctionId);
        }
    }, filters: {
        engToKr(str) {
            if(str == 'MONEY') return "현금"
            else if(str == 'CARD') return "카드"
        }
    }
}
</script>

<style>
.succText {
  text-align: center;
  height: 400px;
  padding: 110px;
}
.succInfo {
width: 450px;
margin: auto;
padding: 30px;
}
.btnArea {
  width: 20%;
  height: 70px;
  margin: auto;
  padding: 14px;
  text-align: center;
  cursor: pointer;
}
.btnArea:hover {
  transition-duration: 300ms;
  background-color: darkgray; 
  color: white;
}
</style>