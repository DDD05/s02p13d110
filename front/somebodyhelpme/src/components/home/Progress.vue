<template>
  <div class="container">
    <h2>Working</h2>
    <hr />
    <div class="w3-container w3-light-grey w3-round-xlarge">
      <div class="w3-row-padding w3-round-xxlarge">
        <div class="w3-container w3-col m8">
          <div class="w3-third">
            <div>
              <img :src="auction.thumbnail" class="thumbnail" />
            </div>
          </div>
          <div class="w3-twothird">
            <div class="chip" @click="attendModal(member)">
              <img :src="member.image" alt="Person" width="45" height="45" />
              <b>{{member.name}}</b>
            </div>
            <div class="chip" @click="attendModal(attendMember)">
              <img :src="attendMember.image" alt="Person" width="45" height="45" />
              <b>{{attendMember.name}}</b>
            </div>
            <h3 class="w3-text-grey w3-padding-16">
              <i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>
              <b>{{auction.title}}</b>
            </h3>
            <p class="w3-text-grey w3-padding">
              <b>{{auction.contents}}</b>
            </p>
            <div class="w3-container w3-half">
              <h5 class="w3-opacity">
                <b>Deadline</b>
              </h5>
              <h6 class="w3-text-teal">
                <i class="fa fa-calendar fa-fw"></i>
                <span class="w3-tag w3-teal w3-round">{{auction.deadline}}</span>
              </h6>
              <br />
            </div>
            <div class="w3-container w3-half">
              <h5 class="w3-opacity">
                <b>Online/Offline</b>
              </h5>
              <h6 class="w3-text-teal">
                <i class="fa fa-whatsapp fa-fw"></i>
                <span class="w3-tag w3-teal w3-round" v-if="auction.online">Online</span>
                <span class="w3-tag w3-teal w3-round" v-else>Offline</span>
              </h6>
              <br />
            </div>
          </div>
        </div>
        <div class="w3-col m4">
          <div class="progress">
            <Progress
              :transitionDuration="2000"
              :radius="100"
              :strokeWidth="50"
              :value="progressValue"
              strokeColor="#FF9F00"
            >
              <template v-slot:footer>
                <b class="progressFooter">진행률</b>
              </template>
            </Progress>
          </div>
        </div>
      </div>
    </div>

    <div class="w3-row-padding" id="about">
      <div class="w3-center w3-padding-64">
        <span class="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Payment Detail</span>
      </div>
      <!-------------------------------Modal----------------------------->

      <div id="modal_attend" class="w3-modal">
        <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:500px">
          <div class="w3-center">
            <br />
            <span
              onclick="document.getElementById('modal_attend').style.display='none'"
              class="w3-button w3-xlarge w3-hover-red w3-display-topright"
              title="Close Modal"
            >&times;</span>
            <img
              :src="modalmember.image"
              alt="Avatar"
              style="width:35%"
              class="w3-circle w3-margin-top"
            />
            <h2>
              <img :src="current_tier" style="width:10%" />
              <b>{{modalmember.membersId}}</b>
            </h2>
            <hr />
          </div>
          <div class="w3-container">
            <p>
              <i class="fa fas fa-user fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
              {{modalmember.name}}
            </p>
            <p>
              <i class="fa fa-envelope fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
              {{modalmember.email}}
            </p>
            <p>
              <i class="fa fa-phone fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
              {{modalmember.phone}}
            </p>
            <p @click="modalPortfolio(memberModal.portfolio)">
              <i class="fa fa-file-text fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
              Portfolio
            </p>
            <hr />
            <p class="w3-large">
              <b>
                <i class="fa fa-star fa-fw w3-margin-right w3-text-teal"></i>Ranks
              </b>
            </p>
            <div class="w3-light-grey w3-round-xlarge w3-small">
              <div
                id="modalrank"
                class="w3-container w3-center w3-round-xlarge w3-teal"
                style="width:90%"
              >{{this.per}}</div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <!---------------------- modal ------------------->
      <div class="w3-row-padding-16">
        <div class="w3-container w3-card w3-white">
          <h2 class="w3-text-grey w3-padding-16">
            <i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>결제정보
          </h2>
          <hr />
          <div class="w3-half">
            <h5 class="w3-opacity">
              <b>결제일자</b>
            </h5>
            <h6 class="w3-text-teal">
              <i class="fa fa-calendar fa-fw w3-margin-right"></i>
              <b>{{payment.approvedAt}}</b>
            </h6>
            <hr />
          </div>
          <div class="w3-half">
            <h5 class="w3-opacity">
              <b>결제번호</b>
            </h5>
            <h6 class="w3-text-teal">
              <i class="fa fa-clipboard fa-fw w3-margin-right"></i>
              <b>{{payment.tid}}</b>
            </h6>
            <hr />
          </div>
          <div class="w3-container">
            <div class="w3-third">
              <h5 class="w3-opacity">
                <b>경매정보</b>
              </h5>
              <h6 class="w3-text-teal">
                <b>{{payment.itemName}}</b>
              </h6>
              <hr />
            </div>

            <div class="w3-third">
              <h5 class="w3-opacity">
                <b>금액</b>
              </h5>
              <h6 class="w3-text-teal">
                <b>{{payment.price}}원</b>
              </h6>
              <hr />
            </div>
            <div class="w3-third">
              <div class="w3-half">
                <h5 class="w3-opacity">
                  <b>구매자</b>
                </h5>
                <h6 class="w3-text-teal">
                  <b>{{payment.membersId}}</b>
                </h6>
                <hr />
              </div>
              <div class="w3-half">
                <h5 class="w3-opacity">
                  <b>진행상태</b>
                </h5>
                <h5 class="w3-text-green">
                  <b>결제완료</b>
                </h5>
                <hr />
              </div>
            </div>
          </div>
          <div class="w3-container">
            <div class="w3-twothird">
              <div class="w3-half">
                <h5 class="w3-opacity">
                  <b>결제금액정보</b>
                </h5>
                <h6 class="w3-text-teal">
                  <b>결제 방식 : {{payment.paymentMethodType}}</b>
                </h6>
              </div>
              <div class="w3-half">
                <h5 class="w3-opacity">
                  <b>환불계좌</b>
                </h5>
                <h6 class="w3-text-teal">
                  <b>{{member.account}}</b>
                </h6>
              </div>
            </div>
            <div class="w3-third">
              <div class="w3-half">
                <h6 class="w3-opacity">
                  <span>상품 금액</span>
                </h6>
                <h6 class="w3-opacity">
                  <span>포인트</span>
                </h6>
                <h5 class="w3-opacity">
                  <span>결제금액</span>
                </h5>

                <br />
              </div>
              <div class="w3-half">
                <h5 class="w3-opacity">
                  <b>{{payment.price}}원</b>
                </h5>
                <h5 class="w3-opacity">
                  &nbsp;
                  <b>(-)0원</b>
                </h5>
                <h4 class="w3-text-teal">
                  <b>{{payment.price}}원</b>
                </h4>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        <button
          class="w3-button w3-red w3-padding-large w3-large w3-hover-opacity-off w3-right"
          onclick="document.getElementById('updateRankModal').style.display='block'"
          v-if="progressValue == 100 && auction.end == 0 && store.state.members.membersId == auction.membersId"
        >점수 등록하기</button>
      </div>

      <div id="updateRankModal" class="w3-modal w3-animate-opacity">
        <div class="w3-modal-content" style="padding:3%">
          <div class="w3-container w3-white">
            <i
              onclick="document.getElementById('updateRankModal').style.display='none'"
              class="fa fa-remove w3-transparent w3-button w3-xlarge w3-right"
            ></i>
            <h2 class="w3-wide">점수 등록</h2>
            <p>판매자의 만족도는 어떠셨나요?</p>
            <p>판매자의 만족도 점수를 작성해주세요. (1~10)</p>
            <p>만족도 점수를 평가하시면 자동으로 구매 확정이 완료됩니다.</p>
            <p>
              <select v-model="applyRank">
                <option value="10" selected="selected">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
                <option value="7">7</option>
                <option value="6">6</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </p>
            <button
              type="button"
              class="w3-button w3-block w3-padding-large w3-red w3-margin-bottom"
              @click="apply()"
            >Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";
import Progress from "easy-circular-progress";
import store from "@/store";

export default {
  components: {
    Progress
  },
  data() {
    return {
      auction: {},
      payment: {},
      attendMember: {},
      member: {},
      attend: {},
      progressValue: 0,
      modalmember: {},
      min_point: 0,
      max_point: 0,
      per: 0,
      current_tier: "",
      applyRank: 10,
      store
    };
  },
  props: ["auctionId"],
  mounted() {
    this.init();
  },
  methods: {
    attendModal(member) {
      document.getElementById("modal_attend").style.display = "block";
      this.modalmember = member;
      this.per = 0;
      let point = this.modalmember.rank;
      if (600 <= point) {
        this.current_tier = this.getTier("grandmaster");
        this.per = 100;
      } else if (500 <= point) {
        this.current_tier = this.getTier("master");
        this.per = 100;
      } else if (400 <= point) {
        this.current_tier = this.getTier("diamond");
        this.min_point = 400;
        this.max_point = 500;
      } else if (300 <= point) {
        this.current_tier = this.getTier("platinum");
        this.min_point = 300;
        this.max_point = 400;
      } else if (200 <= point) {
        this.current_tier = this.getTier("gold");
        this.min_point = 200;
        this.max_point = 300;
      } else if (100 <= point) {
        this.current_tier = this.getTier("silver");
        this.min_point = 100;
        this.max_point = 200;
      } else {
        this.current_tier = this.getTier("bronze");
        this.min_point = 0;
        this.max_point = 100;
      }
      this.per =
        ((point - this.min_point) / (this.max_point - this.min_point)) * 100;
      if (this.per == "Infinity" || this.per > 100) this.per = 100;
      document.getElementById("modalrank").style.width = this.per + "%";
      if (this.per == 100) this.per = "max";
      else this.per = this.per + "%";
    },
    getTier(tier_name) {
      // eslint-disable-next-line no-undef
      return require(`@/assets/img/tier/icon_${tier_name}.png`);
    },
    async init() {
      await http
        .get("/auction/search/" + this.auctionId)
        .then(res => {
          this.$data.auction = res.data;
          this.progress();
          http
            .get("/member/search/" + this.$data.auction.membersId)
            .then(res1 => {
              this.$data.member = res1.data;
            });
          http
            .get(
              "/attend/searchPickByAuctionId/" + this.$data.auction.auctionId
            )
            .then(res2 => {
              this.$data.attend = res2.data;
              http
                .get("/member/search/" + this.$data.attend.membersId)
                .then(res3 => {
                  this.$data.attendMember = res3.data;
                });
            });
        })
        .catch(res => {
          console.log(res);
        });

      http.get("/pay/searchByAuctionId/" + this.auctionId).then(res => {
        this.$data.payment = res.data;
      });
    },
    progress() {
      var deadline = this.$data.auction.deadline;
      var year = parseInt(deadline.substring(0, 4));
      var month = parseInt(deadline.substring(5, 7));
      var day = parseInt(deadline.substring(8, 10));
      var hour = parseInt(deadline.substring(11, 13));
      var minute = parseInt(deadline.substring(14, 16));
      var second = parseInt(deadline.substring(17, 19));
      var salestime = this.$data.auction.salesTime;
      var year1 = parseInt(salestime.substring(0, 4));
      var month1 = parseInt(salestime.substring(5, 7));
      var day1 = parseInt(salestime.substring(8, 10));
      var hour1 = parseInt(salestime.substring(11, 13));
      var minute1 = parseInt(salestime.substring(14, 16));
      var second1 = parseInt(salestime.substring(17, 19));
      var d1 = new Date();
      var d2 = new Date(year, month - 1, day, hour, minute, second);
      var d3 = new Date(year1, month1 - 1, day1, hour1, minute1, second1);
      var minus = d1.getTime() - d3.getTime();
      var minus1 = d2.getTime() - d3.getTime();
      var d111 = minus / (1000 * 60 * 60 * 24);
      var d222 = minus1 / (1000 * 60 * 60 * 24);
      if (minus >= 0)
        this.$data.progressValue = ((d111 / d222) * 100).toFixed(2);
      if (this.$data.progressValue > 100.0) {
        this.$data.progressValue = 100.0;
      }
    },
    apply() {
      http
        .put("/member/updateRank", {
          membersId: this.attendMember.membersId,
          rank: this.applyRank
        })
        .then(response => {
          http.put("/auction/updateEnd", {
            auctionId: this.auction.auctionId,
            title: this.auction.title
          });
          console.log(response);
          alert("등록되었습니다.");
          document.getElementById("updateRankModal").style.display = "none";
          this.$router.go();
        });
    }
  }
};
</script>

<style>
.chip {
  display: inline-block;
  padding: 0 25px;
  margin-left: 20px;
  height: 50px;
  font-size: 16px;
  color: aliceblue;
  line-height: 50px;
  border-radius: 25px;
  background-color: gray;
}

.chip:hover {
  background-color: lightgray;
}

.chip img {
  float: left;
  margin: 0 10px 0 -25px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.container {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 30px;
  transition-duration: 1000ms;
}
.imgBox {
  float: left;
  height: 90%;
  width: 90%;
  overflow: hidden;
}
.thumbnail {
  width: 100%;
  max-height: 260px;
  z-index: -1;
  margin: 0px 0px 0px -9%;
}
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.progress {
  float: right;
  padding: 0;
}
.progressFooter {
  margin: 40%;
  font-size: 20px;
}

.auctionPhone {
  float: left;
  width: 49%;
  height: 250px;
  padding: 25px;
  margin-right: 2%;
}
.attendPhone {
  float: left;
  width: 49%;
  height: 250px;
  padding: 25px;
}
.profile {
  max-width: 100px;
  max-height: 100px;
}
.payInfo {
  height: 500px;
  width: 100%;
}
</style>