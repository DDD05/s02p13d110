<template>
  <div id="AuctionCancel" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1>
      <b>진행중인 경매</b>
    </h1>
    <br />
    <carousel
      :per-page="1"
      :mouse-drag="true"
      :autoplay="true"
      :loop="true"
      :paginationEnabled="false"
    >
      <slide v-for="my_slide_page in my_page_Total" :key="my_slide_page.id">
        <div class="w3-row-padding">
          <div class="w3-third w3-margin-bottom" v-for="my_page in my_page_view" :key="my_page.id">
            <ul
              class="w3-ul w3-border w3-white w3-center w3-opacity w3-hover-opacity-off"
              v-if="my_attend_data[(my_slide_page - 1) * my_page_view + my_page - 1]"
            >
              <img
                :src="my_auction_data[(my_slide_page - 1) * my_page_view + my_page - 1].thumbnail"
                style="width:100%; height:350px"
                class="w3-hover-opacity"
              />
              <li class="w3-padding-16">
                <p class="auction_title_wrap">
                  {{ my_auction_data[(my_slide_page - 1) * my_page_view + my_page - 1].title }}
                </p>
              </li>
              <li class="w3-padding-16">
                <p class="auction_tag_wrap">
                  {{
                    my_auction_data[(my_slide_page - 1) * my_page_view + my_page - 1].tag
                      .split("|")
                      .join(", ")
                  }}
                </p>
              </li>
              <li class="w3-padding-16">
                <h2>
                  ₩ {{ my_attend_data[(my_slide_page - 1) * my_page_view + my_page - 1].price }}
                </h2>
              </li>

              <li class="w3-light-grey w3-padding-24">
                <button
                  class="w3-button w3-teal w3-padding-large w3-hover-black"
                  @click="
                    AuctionDetail(
                      my_attend_data[(my_slide_page - 1) * my_page_view + my_page - 1].auctionId
                    )
                  "
                >
                  조회하기
                </button>
              </li>
            </ul>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
// @ is an alias to /src
import { Carousel, Slide } from "vue-carousel";
import http from "@/utils/http-require.js";
import store from "@/store";

export default {
  name: "Auction",
  components: {
    Carousel,
    Slide
  },
  data: () => {
    return {
      //vuex part
      store,
      userInfoVo: {
        membersId: store.state.members.membersId
      },
      my_attend_data: [],
      my_auction_data: [],
      my_page_view: 3,
      my_page_num: 1,
      my_page_Total: 1
    };
  },
  mounted() {
    http
      .get("attend/searchByMemberId/" + this.userInfoVo.membersId)
      .then(res => {
        this.my_attend_data = res.data;
        let data_length = res.data.length;
        this.my_page_Total = Math.ceil(data_length / 3);

        //join
        for (let i = 0; i < data_length; i++) {
          this.getAuctionData(res.data[i].auctionId);
        }
      })
      .catch(res => {
        console.log(res);
      });

    console.log(this.my_auction_data);
  },
  methods: {
    AuctionDetail(auctionId) {
      this.$router.push("AuctionDetail/" + auctionId);
    },
    getAuctionData(auctionId) {
      http
        .get("auction/search/" + auctionId)
        .then(response => {
          this.my_auction_data.push(response.data);
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style>
.auction_title_wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2em;
  height: 1.2em;
}

.auction_tag_wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2em;
  height: 1.2em;
}
</style>
