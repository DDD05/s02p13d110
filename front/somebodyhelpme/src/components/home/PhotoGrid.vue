<template>
  <div id="PhotoGrid" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <header>
      <div class="w3-container">
        <h1 style="padding-top:10px;">
          <b>Some8ody</b>
        </h1>
        <div class="w3-section w3-bottombar w3-padding-16">
          <span class="w3-opacity" style="text-shadow:1px 1px 0 #444;">태그 목록 </span
          ><span class="w3-margin-right" style="font-family:jjl;text-shadow:1px 1px 0 #444;"
            >&gt;&gt;&gt;</span
          >
          <button
            :class="{ 'w3-button w3-white': flag_all != 1, 'w3-button w3-black': flag_all == 1 }"
            @click="changeFlag('All')"
            id="All"
          >
            ALL
          </button>

          <button
            class="w3-button w3-white"
            v-for="tagItem in tag_select"
            :key="tagItem.id"
            :id="tagItem"
            @click="changeFlag(tagItem)"
          >
            {{ tagItem }}
          </button>

          <button class="w3-button w3-lime" @click="addTag()" id="add">EDIT</button>
        </div>
        <div class="w3-section w3-hide" id="tag_wrap">
          <div class="w3-text-indigo"><b>
            추가할 태그 선택해주세요...
          </b>
          <button class="w3-button w3-indigo w3-right" @click="changeFlag('All')" id="add">완료</button>
          </div><br>
          <button
            class="w3-button w3-white"
            v-for="tagItem in tag_all"
            :key="tagItem.id"
            :id="tagItem"
            @click="chooseTag(tagItem)"
          >
            {{ tagItem }}
          </button>
        </div>
      </div>
    </header>
    <!-- First Photo Grid-->
    <div class="w3-row-padding">
      <div class="w3-third w3-container w3-margin-bottom" v-for="page in page_view" :key="page.id">
        <div v-if="auctionData[(pageNum - 1) * page_view + page - 1]">
          <div class="auction_thumbnail_wrap">
            <div class="auction_thumbnail" >
              <img
                :src="auctionData[(pageNum - 1) * page_view + page - 1].thumbnail"
                class="w3-hover-opacity auction_thumbnail_img"
                @click="auctionDetail(auctionData[(pageNum - 1) * page_view + page - 1].auctionId)"
              />
            </div>
            <div>
              <p class="auction_title_wrap">
                <b>{{ auctionData[(pageNum - 1) * page_view + page - 1].title }}</b>
              </p>
              <p class="w3-right w3-text-indigo">
                {{ auctionData[(pageNum - 1) * page_view + page - 1].name }}
              </p>
              <p class="auction_tag_wrap w3-left w3-text-green">
                {{ auctionData[(pageNum - 1) * page_view + page - 1].tag.split("|").join(", ") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="w3-center w3-padding-32">
      <div class="w3-bar">
        <a @click="prevPage" class="w3-bar-item w3-button w3-hover-black">«</a>
        <a
          class="w3-bar-item w3-button"
          :class="{ 'w3-white': changeColor(pageIdx) == -1, 'w3-black': changeColor(pageIdx) == 1 }"
          v-for="pageIdx in this.pageTotal"
          :key="pageIdx.id"
          @click="changePage(pageIdx)"
          >{{ pageIdx }}</a
        >
        <a @click="nextPage" class="w3-bar-item w3-button w3-hover-black">»</a>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";

export default {
  name: "PhotoGrid",
  components: {},
  data: () => {
    return {
      //aution tag->binding
      tag_all: [],
      tag_select: [],
      tag_select_array: [],
      tag_bind: [],
      flag_all: 1,
      flag_list: [],

      keyword: "",
      tag_keyword: "",
      page_list: [],
      page_view: 6,
      pageNum: 1,
      pageTotal: 1,
      auctionData: {}
    };
  },
  mounted() {
    this.$store.commit("enableLoading");
    this.tag_array_select = [];
    http
      .get("auction/searchAll")
      .then(res => {
        this.auctionData = res.data;
        let tag_array_all = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["tag"].includes("|")) {
            let arr = res.data[i]["tag"].split("|");
            for (let j = 0; j < arr.length; j++) {
              tag_array_all.push(arr[j]);
            }
          } else if (res.data[i]["tag"].includes("/")) {
            let arr = res.data[i]["tag"].split("/");
            for (let j = 0; j < arr.length; j++) {
              tag_array_all.push(arr[j]);
            }
          } else if (res.data[i]["tag"] != "") {
            tag_array_all.push(res.data[i]["tag"]);
          }
        }
        tag_array_all.sort();

        //reduce duplication
        this.tag_all = tag_array_all.filter((item, idx, array) => {
          return array.indexOf(item) === idx;
        });

        this.pageTotal = Math.ceil(res.data.length / 6);
        for (let i = 0; i < this.pageTotal; i++) {
          this.page_list.push(i);
        }
      })
      .catch(res => {
        console.log(res);
      })
      .finally(() => {
        this.$store.commit("disableLoading");
        this.bindTagState();
        this.tag_select = this.tag_bind.filter((item, idx, array) => {
          return array.indexOf(item) === idx;
        });
      });
  },
  methods: {
    saveTagToSession() {
      sessionStorage.setItem("tagString", this.tag_keyword);
    },
    bindTagState() {
      var tagString = sessionStorage.getItem("tagString");
      var tagStringList = tagString.split("|");

      // reduce duplication
      this.tag_bind = tagStringList.filter((item, idx, array) => {
        return array.indexOf(item) === idx;
      });
      // console.log(this.tag_bind);
    },
    changeFlag(item) {
      if (item == "All") {
        for (let idx in this.flag_list) {
          let data = this.flag_list[idx];
          document.getElementById(data).classList.remove("w3-black");
        }
        this.flag_list = [];
        this.flag_all *= -1;
        this.keyword = "All";
      }

      if (!this.flag_list.includes(item) && item != "All") {
        this.flag_list.push(item);
        document.getElementById(item).classList.add("w3-black");
      } else if (this.flag_list.includes(item) && item != "All") {
        let index = this.flag_list.indexOf(item);
        this.flag_list.splice(index, 1);
        document.getElementById(item).classList.remove("w3-black");
      }
      if (this.flag_list.length > 0) {
        this.flag_all = -1;
        this.keyword = this.flag_list.join("|");
      }
      if (this.flag_list.length == 0) {
        this.flag_all = 1;
        this.keyword = "All";
      }

      var url = "";
      if (this.keyword == "All") {
        url = "auction/searchAll/";
      } else {
        url = "auction/searchByTag/" + this.keyword;
      }
      this.$store.state.preloader = true;
      http
        .get(url)
        .then(res => {
          this.auctionData = res.data;
          this.pageTotal = Math.ceil(res.data.length / 6);
        })
        .catch(res => {
          console.log(res);
        })
        .finally(() => {
          this.$store.state.preloader = false;
          this.closeTag();
        });
    },
    changePage(pageIdx) {
      this.pageNum = pageIdx;
    },
    nextPage() {
      if (this.pageNum < this.pageTotal) this.pageNum += 1;
    },
    prevPage() {
      if (1 < this.pageNum) this.pageNum -= 1;
    },
    changeColor(currentPage) {
      if (currentPage == this.pageNum) {
        return 1;
      } else {
        return -1;
      }
    },
    auctionDetail(auctionId) {
      this.$router.push({
        name: "AuctionDetail",
        params: { auctionId: auctionId }
      });
    },
    addTag() {
      document.getElementById("tag_wrap").classList.remove("w3-hide");
    },
    closeTag() {
      document.getElementById("tag_wrap").classList.add("w3-hide");
    },

    chooseTag(tagItem) {
      this.tag_select_array = this.tag_bind;
      this.tag_select_array.push(tagItem);

      // reduce duplication
      this.tag_select = this.tag_select_array.filter((item, idx, array) => {
        return array.indexOf(item) === idx;
      });

      this.tag_keyword = this.tag_select.join("|");
      // console.log(this.tag_keyword);
      this.saveTagToSession();
    }
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
.auction_thumbnail_wrap {
  position: relative;
}
.auction_thumbnail {
  position: relative;
  height: 350px;
}

.auction_thumbnail_img {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

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
