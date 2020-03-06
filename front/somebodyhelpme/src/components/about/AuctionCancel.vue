<template>
  <div id="AuctionCancel" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <div>
      <h2>
        <b>진행 중인 경매</b>
      </h2>
      <div class="w3-row-padding" style="padding-top:30px">
        <span
          :key="index"
          v-for="(auction, index) in ongoingauctions.slice().reverse() "
          class="w3-third"
        >
          <ul class="w3-ul w3-border w3-white w3-center w3-opacity w3-hover-opacity-off">
            <div class="auction-thumbnail">
              <div class="tablecell">
                <img :src="getThumb(auction)" class="w3-hover-opacity auction-thumbnail_img" />
              </div>
            </div>
            <li class="w3-padding-16 title-over">{{ auction.title }}</li>
            <li class="w3-padding-16 contents-over">{{auction.contents}}</li>
            <li class="w3-padding-16">
              <i class="fa fa-star font-size-h6 color-dark-yellow-400" />
              마감일 : {{auction.deadline}}
              <br />
              <i class="fa fa-star font-size-h6 color-dark-yellow-400" />
              경매끝 : {{auction.salesTime}}
            </li>
            <li class="price-over">
              <h2>₩ {{auction.maxPrice}}</h2>
            </li>
            <li class="w3-light-grey w3-padding-24">
              <button
                class="w3-button w3-teal w3-padding-large w3-hover-black"
                @click="AuctionDetail(auction.auctionId)"
              >조회하기</button> &nbsp;
              <button
                class="w3-button w3-red w3-padding-large w3-hover-black"
                @click="deletedata(auction)"
              >경매 파기</button>
            </li>
          </ul>
        </span>
      </div>
    </div>

    <div>
      <h2>
        <b>종료된 경매</b>
      </h2>
      <div class="w3-row-padding" style="padding-top:30px">
        <span
          :key="index"
          v-for="(auction, index) in expiredauctions.slice().reverse() "
          class="w3-third"
        >
          <ul class="w3-ul w3-border w3-white w3-center w3-opacity w3-hover-opacity-off">
            <div class="auction-thumbnail">
              <div class="tablecell">
                <img :src="getThumb(auction)" class="w3-hover-opacity auction-thumbnail_img" />
              </div>
            </div>
            <li class="w3-padding-16 title-over">{{ auction.title }}</li>
            <li class="w3-padding-16 contents-over">{{auction.contents}}</li>
            <li class="w3-padding-16">
              <i class="fa fa-star font-size-h6 color-dark-yellow-400" />
              마감일 : {{auction.deadline}}
              <br />
              <i class="fa fa-star font-size-h6 color-dark-yellow-400" />
              경매끝 : {{auction.salesTime}}
            </li>
            <li class="price-over">
              <h2>₩ {{auction.maxPrice}}</h2>
            </li>
            <li class="w3-light-grey w3-padding-24">
              <button
                class="w3-button w3-teal w3-padding-large w3-hover-black"
                @click="AuctionDetail(auction.auctionId)"
              >조회하기</button> &nbsp;
              <button
                class="w3-button w3-red w3-padding-large w3-hover-black"
                @click="deletedata(auction)"
              >경매 파기</button>
            </li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";

import store from "@/store";
export default {
  data() {
    return {
      auctions: [],
      ongoingauctions: [],
      expiredauctions: [],
      my_auction_data: {},
      my_page_view: 3,
      my_view_count: 0,
      my_page_num: 1,
      my_page_Total: 1,
      page_view: 6,
      ongoing: {
        pageList: [],
        pageNum: 1,
        pageTotal: 1
      },
      expired: {
        pageList: [],
        pageNum: 1,
        pageTotal: 1
      }
    };
  },
  methods: {
    deletedata(auction, index) {
      var deleteFlag = confirm(`${auction.title}을 삭제하시겠습니까?`);
      if (deleteFlag) {
        http
          .delete(`auction/delete/${auction.auctionId}`)
          .then(
            alert(`${auction.title} 삭제됨`),
            this.auctions.splice(index, 1)
          )
          .catch(console.log("Fail"));
      }
    },
    getThumb(auction) {
      if (auction.thumbnail.length > 16) {
        return auction.thumbnail;
      } else {
        // eslint-disable-next-line no-undef
        return require(`@/assets/img/frontPageLogo/6.png`);
      }
    },
    AuctionDetail(auctionId) {
      this.$router.push("AuctionDetail/" + auctionId);
    },
    // 시간이 남으면 true , 지나면 false
    equalscurTimeVsAuctionTime(at) {
      var cd = new Date();
      var pd = new Date(at);
      if (cd < pd) return true;
      return false;
    }
  },
  mounted() {
    http
      .get(`auction/searchByMembers/${store.state.members.membersId}`)
      .then(res => {
        this.auctions = res.data;
        // console.log(res);
        // console.log(this.auctions);
        // console.log(this.auctions.length);
        for (var i = 0; i < this.auctions.length; i++) {
          // console.log(i);
          if (
            this.equalscurTimeVsAuctionTime(this.auctions[i].deadline) == true
          ) {
            // console.log(this.auctions[i]);
            this.ongoingauctions.push(this.auctions[i]);
          } else {
            // console.log(this.auctions[i]);
            this.expiredauctions.push(this.auctions[i]);
          }
        }
        console.log(this.ongoingauctions);
        console.log(this.expiredauctions);
        this.ongoing.pageTotal = Math.ceil(this.ongoingauctions.length / 6);
        for (let i = 0; i < this.ongoing.pageTotal; i++) {
          this.ongoing.pageList.push(i);
        }
        this.expired.pageTotal = Math.ceil(this.expiredauctions.length / 6);
        for (let i = 0; i < this.expired.pageTotal; i++) {
          this.expired.pageList.push(i);
        }
      });
  },
  components: {}
};
</script>

<style>
#auction-list {
  list-style: none;
}
#AuctionCancel > table {
  border: 1px solid;
  border-collapse: separate;
  width: 100%;
  border-radius: 6px;
  border-spacing: 0;
  text-align: center;
}
td,
th {
  border: 1px solid;
}
table tr:first-child th:first-child {
  border-top-left-radius: 6px;
}

table tr:first-child th:last-child {
  border-top-right-radius: 6px;
}

table tr:last-child td:first-child {
  border-bottom-left-radius: 6px;
}

table tr:last-child td:last-child {
  border-bottom-right-radius: 6px;
}

thead {
  background-color: darkgray;
}

.contents-over {
  margin-top: 1px;
  min-height: 20vh;
  max-height: 20vh;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  font-size: 2vh;
}
.title-over {
  border-top: 1px solid #ddd;
  display: -webkit-box;
  font-size: 2vh;
  min-height: 8.2vh;
  max-height: 8.2vh;
  padding-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.price-over {
  font-size: 10vh;
  min-height: 10vh;
  max-height: 10vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.auction-thumbnail {
  vertical-align: middle;
  min-height: 40vh;
  max-height: 40vh;
  padding-top: 5%;
}
.tablecell {
  vertical-align: middle;
  text-align: center;
}
.auction-thumbnail_img {
  max-height: 35vh;
  width: auto;
  max-width: 100%;
  position: relative;
}
</style>
