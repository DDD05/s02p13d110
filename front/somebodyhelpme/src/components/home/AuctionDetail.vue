<template>
  <div id="auctionDetail" class="w3-light-gray">
    <!-- w3-content defines a container for fixed size centered content, 
    and is wrapped around the whole page content, except for the footer in this example-->
    <div class="w3-content" style="max-width:1600px">
      <!-- Grid -->
      <div class="w3-row w3-padding w3-border">
        <!-- Blog entries -->
        <div class="w3-col l8 s12">
          <!-- Blog entry -->
          <div class="w3-container w3-white w3-margin w3-padding-large w3-round-xlarge">
            <div class="w3-justify">
              <div class="w3-container w3-card w3-white w3-margin-bottom">
                <h2 class="w3-text-grey w3-padding-16">
                  <i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>
                  <b>{{auction.title}}</b>
                </h2>
                <div class="w3-container">
                  <h5 class="w3-opacity">
                  </h5>
                  <p>{{auction.contents}}</p>
                  <hr />
                </div>

                <div class="w3-container w3-half">
                  <h5 class="w3-opacity">
                    <b>업무 마감 일자</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    <i class="fa fa-calendar fa-fw w3-margin-right"></i>
                    <span class="w3-tag w3-teal w3-round">{{auction.deadline}}</span>
                  </h6>
                  <br />
                </div>
                <div class="w3-container w3-half">
                  <h5 class="w3-opacity">
                    <b>업무 진행 방식</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    <i class="fa fa-calendar fa-fw w3-margin-right"></i>
                    <span class="w3-tag w3-teal w3-round" v-if="auction.online">온라인</span>
                    <span class="w3-tag w3-teal w3-round" v-else>오프라인</span>
                  </h6>
                  <br />
                </div>
                <div class="w3-container w3-half">
                  <h5 class="w3-opacity">
                    <b>명세서</b>
                  </h5>
                  <h6 class="w3-text-teal">
                    <button
                      class="w3-button w3-light-grey w3-round w3-padding-large"
                      @click="gogo()"
                      v-if="auction.detail != ''"
                    >
                      <i class="fa fa-download"></i> Download
                    </button>
                  </h6>
                  <br />
                </div>
              </div>
              <hr />

              <div class="w3-row w3-center w3-padding w3-section w3-light-grey w3-card-2">
                <div class="w3-third w3-section">
                  <span class="w3-xlarge" v-if="partcipantCount>0">{{partcipantCount}}+</span>
                  <span class="w3-xlarge" v-else>---</span>
                  <br />
                  <h5 class="w3-opacity">
                    <b>참가자 수</b>
                  </h5>
                </div>
                <div class="w3-third w3-section">
                  <span class="w3-xlarge">{{auction.maxPrice | addComma}}</span>
                  <h5 class="w3-opacity">
                    <b>상한가</b>
                  </h5>
                </div>
                <div class="w3-third w3-section">
                  <span class="w3-xlarge" v-if="partcipantCount>0">{{Partcipants[0].price}}</span>
                  <span class="w3-xlarge" v-else>---</span>
                  <h5 class="w3-opacity">
                    <b>최저가</b>
                  </h5>
                </div>
              </div>
              <p class="w3-right">
                <button class="w3-button w3-black" @click="myFunction('demo1')" id="myBtn">
                  <b>작성자 프로필 보기</b>
                </button>
              </p>
              <p class="w3-clear"></p>
              <div class="w3-row w3-margin-bottom" id="demo1" style="display:none">
                <hr />
                <div class="w3-col l2 m3">
                  <img :src="imageData" style="width:90px;" />
                </div>
                <div class="w3-col l8 m6">
                  <h4>
                    <span>
                      <b>
                        <img :src="Mcurrent_tier" style="width:7%" />
                        {{members.name}}
                      </b>
                    </span>
                    <br />
                    <span class="w3-opacity w3-large">{{members.email}}</span>
                  </h4>
                  <p>{{members.phone}}</p>
                </div>
              </div>
            </div>
            <h6>
              <button
                class="w3-button w3-red w3-padding-large w3-large w3-hover-opacity-off w3-right"
                onclick="document.getElementById('subscribe').style.display='block'"
                v-if="auction.membersId!=store.state.members.membersId"
              >APPLY</button>
            </h6>
          </div>
          <hr />
          <!-- END BLOG ENTRIES -->
        </div>

        <!-- About/Information menu -->
        <div class="w3-col l4">
          <!-- About Card -->
          <div class="w3-white w3-margin">
            <div class="w3-container w3-black">
              <h2 id="cnt" style="text-align:center;"></h2>
            </div>
          </div>
          <hr />
          <div class="w3-white w3-margin" id="scrollmenu">
            <div class="w3-container w3-padding w3-black" id="scrollHeader">
              <h4>경매 참가자 목록</h4>
            </div>
            <ul class="w3-ul w3-hoverable w3-white">
              <li class="w3-padding-16" v-if="partcipantCount==0">
                <img
                  :src="'http://i02d110.p.ssafy.io:80/image/profile.png'"
                  alt="Image"
                  class="w3-left w3-margin-right w3-circle"
                  style="width:50px"
                />
                <span class="w3-large">anonymous</span>
                <br />
                <span>참가자가 없습니다</span>
              </li>
              <li
                style="padding: 0"
                v-else
                v-for="p in Partcipants"
                v-bind:key="p.attendId"
                @click="partcipantModal(p.membersId,p.attendId)"
              >
                <div
                  class="w3-padding-16"
                  style="background-color: palegreen;
                 padding-left:30px;"
                  v-if="p.membersId == pick.membersId"
                >
                  <img
                    :src="p.image"
                    alt="Image"
                    class="w3-left w3-circle w3-margin-right"
                    style="width:60px; height:60px;"
                  />
                  <span class="w3-large">{{p.membersId}}</span>
                  <br />
                  <span>{{p.price}}</span>
                </div>
                <div class="w3-padding-16" style="padding-left:30px;" v-else>
                  <img
                    :src="p.image"
                    alt="Image"
                    class="w3-left w3-circle w3-margin-right"
                    style="width:60px; height:60px;"
                  />
                  <span class="w3-large">{{p.membersId}}</span>
                  <br />
                  <span>{{p.price}}</span>
                </div>
              </li>
            </ul>
          </div>
          <hr />

          <!-- Advertising -->
          <div
            class="w3-white w3-margin"
            v-if="ispick && (auction.membersId==store.state.members.membersId || pick.membersId == store.state.members.membersId)"
          >
            <div class="w3-container w3-padding w3-black">
              <h4>Process</h4>
            </div>
            <div class="w3-container w3-white">
              <div
                class="process w3-container w3-display-container w3-light-grey w3-section"
                @click="goProgress()"
              >
                <h3>
                  <b>착수페이지 바로가기</b>
                </h3>
              </div>
            </div>
          </div>
          <hr />

          <!-- Tags -->
          <div class="w3-white w3-margin">
            <div class="w3-container w3-padding w3-black">
              <h4>태그</h4>
            </div>
            <div class="w3-container w3-white">
              <br />
              <span class="w3-tag w3-black w3-midium w3-margin-bottom" v-if="tag==null">태그없음</span>
              <span
                class="w3-tag w3-black w3-midium w3-margin-bottom w3-round"
                v-else
                v-for="t in tag"
                v-bind:key="t.num"
              >#{{t}}</span>
            </div>
          </div>
          <hr />

          <!-- END About/Intro Menu -->
        </div>

        <!-- END GRID -->
      </div>

      <!-- END w3-content -->
    </div>

    <!-- Subscribe Modal -->
    <div id="subscribe" class="w3-modal w3-animate-opacity">
      <div class="w3-modal-content" style="padding:3%">
        <div class="w3-container w3-white">
          <i
            onclick="document.getElementById('subscribe').style.display='none'"
            class="fa fa-remove w3-transparent w3-button w3-xlarge w3-right"
          ></i>
          <h2 class="w3-wide">Apply</h2>
          <p>경매에 지원하시려면 금액을 작성해주세요</p>
          <p>
            <input
              class="w3-input w3-border"
              type="text"
              placeholder="지원할 금액을 작성해주세요"
              v-model="applyPrice"
            />
          </p>
          <button
            type="button"
            class="w3-button w3-block w3-padding-large w3-red w3-margin-bottom"
            @click="apply()"
            v-if="auction.membersId!=store.state.members.membersId"
          >Apply</button>
        </div>
      </div>
    </div>

    <div id="partcipant" class="w3-modal">
      <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:500px">
        <div class="w3-center">
          <br />
          <span
            onclick="document.getElementById('partcipant').style.display='none'"
            class="w3-button w3-xlarge w3-hover-red w3-display-topright"
            title="Close Modal"
          >&times;</span>
          <img
            :src="memberModal.image"
            alt="Avatar"
            style="width:35%"
            class="w3-circle w3-margin-top"
          />
          <h2>
            <img :src="current_tier" style="width:10%" />
            <b>{{memberModal.membersId}}</b>
          </h2>
          <hr />
        </div>
        <div class="w3-container">
          <p>
            <i class="fa fas fa-user fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
            {{memberModal.name}}
          </p>
          <p>
            <i class="fa fa-envelope fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
            {{memberModal.email}}
          </p>
          <p>
            <i class="fa fa-phone fa-fw w3-margin-right w3-xlarge w3-text-teal"></i>
            {{memberModal.phone}}
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
              style="width:100%"
            >{{this.per}}</div>
          </div>
          <br />
        </div>

        <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
          <button
            v-if="memberModal.membersId==store.state.members.membersId && !flag"
            type="button"
            class="w3-button w3-red"
            @click="attendCancel(memberModal.membersId)"
          >취소하기</button>
          <button
            v-if="auction.membersId==store.state.members.membersId && pick == '' && flag"
            @click="goAuction(memberModal.attendId, memberModal.membersId)"
            type="button"
            class="w3-button w3-green w3-right"
          >낙찰하기</button>
          <span class="w3-right w3-padding w3-hide-small"></span>
        </div>
      </div>
    </div>
    <a
      href="#"
      class="w3-button w3-black w3-padding-large w3-margin-bottom w3-margin-right w3-right"
    >
      <i class="fa fa-arrow-up"></i>
    </a>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";
import store from "@/store";
export default {
  data() {
    return {
      store,
      auction: "",
      members: "",
      pick: "",
      ispick: false,
      flag: false,
      imageData: "",
      Partcipants: [{}],
      partcipantCount: "",
      tag: [{}],
      memberModal: "",
      applyPrice: 0,
      pageOut: false,
      timer: "",
      Mcurrent_tier: "",
      current_tier: "",
      min_point: 0,
      max_point: 0,
      per: 0
    };
  },
  props: ["auctionId"],

  mounted() {
    http
      .get("/auction/search/" + this.auctionId)
      .then(Response => {
        this.auction = Response.data;
        http
          .get("/member/search/" + this.auction.membersId)
          .then(Response => {
            this.members = Response.data;
            this.imageData = this.members.image;
            let point = this.members.rank;
            if (600 <= point) {
              this.Mcurrent_tier = this.getTier("grandmaster");
            } else if (500 <= point) {
              this.Mcurrent_tier = this.getTier("master");
            } else if (400 <= point) {
              this.Mcurrent_tier = this.getTier("diamond");
            } else if (300 <= point) {
              this.Mcurrent_tier = this.getTier("platinum");
            } else if (200 <= point) {
              this.Mcurrent_tier = this.getTier("gold");
            } else if (100 <= point) {
              this.Mcurrent_tier = this.getTier("silver");
            } else {
              this.Mcurrent_tier = this.getTier("bronze");
            }
            http
              .get("/attend/searchByAuctionId/" + this.auction.auctionId)
              .then(Response => {
                console.log(Response.data);
                this.Partcipants = Response.data;
                this.partcipantCount = this.Partcipants.length;
                this.tag = this.auction.tag.split("|");
              });
            http
              .get("/attend/searchPickByAuctionId/" + this.auction.auctionId)
              .then(Response => {
                if (Response.data != "") {
                  this.ispick = true;
                  this.pick = Response.data;
                }
              });
          })
          .catch(error => console.log(error))
          .finally(() => window.console.log("auction members axios"));
      })
      .catch(error => console.log(error))
      .finally(() => {
        window.console.log("auctionDetail axios");
        this.count();
      });
  },
  destroyed() {
    clearInterval(this.$data.timer);
  },
  watch: {
    applyPrice: function() {
      if (this.applyPrice > this.auction.maxPrice) {
        this.applyPrice = this.auction.maxPrice;
      }
      if (this.applyPrice < 0) {
        this.applyPrice = 0;
      }
    }
  },
  methods: {
    getTier(tier_name) {
      // eslint-disable-next-line no-undef
      return require(`@/assets/img/tier/icon_${tier_name}.png`);
    },
    goAuction(attendId, membersId) {
      if (confirm("낙찰하시겠습니까?")) {
        http
          .put("/attend/pickAttend", {
            auctionId: this.auction.auctionId,
            attendId: attendId,
            membersId: membersId
          })
          .then(response => {
            this.$router.push("/Payment/" + this.auction.auctionId);
            console.log(response);
          });
      }
    },
    apply() {
      if (this.applyPrice > this.auction.maxPrice) {
        alert("상한가보다 가격이 높습니다");
      }
      http
        .post("/attend/attend", {
          membersId: store.state.members.membersId,
          auctionId: this.auction.auctionId,
          price: this.applyPrice
        })
        .then(response => {
          console.log(response);
          alert("지원되었습니다.");
          document.getElementById("subscribe").style.display = "none";
          this.$router.go();
        });
    },
    modalPortfolio(portfolio) {
      window.open(portfolio, "portfolio");
    },
    partcipantModal(membersId, attendId) {
      document.getElementById("partcipant").style.display = "block";
      http
        .get("/member/search/" + membersId)
        .then(Response => {
          this.memberModal = Response.data;
          this.memberModal.attendId = attendId;
          this.per = 0;
          let point = this.memberModal.rank;
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
            ((point - this.min_point) / (this.max_point - this.min_point)) *
            100;
          if (this.per == "Infinity" || this.per > 100) this.per = 100;
          document.getElementById("modalrank").style.width = this.per + "%";
          if (this.per == 100) this.per = "max";
          else this.per = this.per + "%";
        })
        .catch(error => window.console.log(error))
        .finally(() => window.console.log("searchmemberModal axios"));
    },
    gogo() {
      window.open(this.auction.detail, "portfolio");
    },
    myFunction(id) {
      var x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    },
    count() {
      var salestime = this.$data.auction.salesTime;
      var year = parseInt(salestime.substring(0, 4));
      var month = parseInt(salestime.substring(5, 7));
      var day = parseInt(salestime.substring(8, 10));
      var hour = parseInt(salestime.substring(11, 13));
      var minute = parseInt(salestime.substring(14, 16));
      var second = parseInt(salestime.substring(17, 19));
      var countDownDate = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        second
      ).getTime();

      var initDistance = countDownDate - new Date().getTime();
      if (initDistance < 0) {
        this.flag = true;
      }
      // Update the count down every 1 second
      this.timer = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("cnt").innerHTML =
          days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초 ";

        // If the count down is over, write some text

        if (distance < 0) {
          clearInterval(this.timer);
          document.getElementById("cnt").innerHTML = "마감";
        }
      }, 1000);
    },
    goProgress() {
      this.$router.push("../Progress/" + this.auction.auctionId);
    },
    attendCancel(membersId) {
      var cancel = confirm("정말로 입찰을 취소하시겠습니까?");
      if (cancel) {
        http.delete("/attend/cancelByMembersId/" + membersId).then(res => {
          console.log(res);
          alert("입찰이 성공적으로 취소되었습니다.");
          document.getElementById("partcipant").style.display = "none";
          this.$router.go();
        });
      }
    }
  }, filters: {
    addComma(price) {
      return Number(price).toLocaleString()
    }
  }
};
</script>
<style>
div #scrollmenu {
  overflow: auto;
  white-space: nowrap;
  max-height: 310px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
}
.process {
  transition-duration: 300ms;
  background-color: gray;
  color: white;
  cursor: pointer;
  border-radius: 20px;
  height: 100px;
  text-align: center;
  padding: 20px;
}
</style>


