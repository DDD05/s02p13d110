<template>
  <div id="AuctionRegist" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1>
      <b>경매 등록</b>
    </h1>
    <form
      action="#"
      id="auctionRegist"
      method="post"
      @submit.prevent="auctionRegist"
      enctype="multipart/form-data"
    >
      <input type="hidden" name="membersId" :value="auction.membersId" />
      <div>
        <div>
          <label>썸네일 이미지</label>
          <input
            type="file"
            @change="previewImage"
            accept="image/*"
            name="thumbnailFile"
            class="w3-input w3-border"
          />
        </div>
        <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData" />
        </div>
      </div>
      <div class="w3-section">
        <label>경매 마감일</label>
        <input
          v-model="auction.salesTime"
          name="salesTime"
          id="sales_time"
          class="w3-input"
          type="datetime-local"
          style="max-width:250px;"
          required
        />
      </div>
      <div class="w3-section">
        <label>업무 마감일</label>
        <input
          name="deadline"
          id="deadline"
          class="w3-input w3-border"
          type="datetime-local"
          v-model="auction.deadline"
          style="max-width:250px;"
          placeholder="Deadline"
        />
      </div>
      <div class="w3-section">
        <label>경매 제목</label>
        <input
          v-model="auction.title"
          class="w3-input w3-border"
          type="text"
          name="title"
          placeholder="제목"
        />
      </div>
      <div class="w3-section">
        <label>상한가</label><br/>
        <input v-model="price" class="w3-input w3-border" type="text" name="maxPrice" 
        @keyup="addComma" style="max-width:200px; text-align:right; display:inline;"/> 원
      </div>
      <div class="w3-section">
        <label>내용</label>
        <br />
        <textarea
          style="resize:none"
          v-model="auction.contents"
          class="w3-input w3-border"
          id="contents"
          name="contents"
          rows="10"
          placeholder="내용"
        ></textarea>
      </div>

      <div class="w3-section">
        <label>업무 진행 방식</label>
        <br />
        <input class type="radio" v-model="auction.online" name="online" value="1" /> 온라인
        <input class type="radio" v-model="auction.online" name="online" value="0" /> 오프라인
      </div>

      <div class="w3-section">
        <label>업무 상세 명세서</label>
        <input class="w3-input w3-border" type="file" name="detailFile" />
      </div>
      <div class="w3-section">
        <label>태그</label>
        <vue-tags-input
          class="w3-input w3-border"
          name="tag"
          v-model="tag"
          :tags="tags"
          @tags-changed="newTags => tags = newTags"
        />
      </div>
       <button class="w3-button w3-teal w3-right">등록하기</button>
    </form>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import http from "@/utils/http-require.js";

import store from "@/store";

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      tag: "",
      tags: [],
      price: "",
      imageData: "",
      auction: {
        auctionId: "",
        contents: "",
        deadline: "",
        file: "",
        membersId: store.state.members.membersId,
        name: "",
        online: "1",
        salesTime: "",
        tag: "",
        title: "",
        maxPrice: ""
      }
    };
  },
  created() {},
  mounted() {
    console.log(new Date().toISOString().slice(0, 13)+":00:00")
    document.getElementById('sales_time').value= new Date().toISOString().slice(0, 13)+":00:00";
    document.getElementById('deadline').value= new Date().toISOString().slice(0, 13)+":00:00";
  },
  methods: {
    auctionRegist() {
      let formData = new FormData(document.getElementById("auctionRegist"));

      var dead1 = this.auction.deadline.slice(0, 10);
      var dead2 = this.auction.deadline.slice(11, 16);
      var sale1 = this.auction.salesTime.slice(0, 10);
      var sale2 = this.auction.salesTime.slice(11, 16);
      this.auction.salesTime = sale1 + " " + sale2;
      this.auction.deadline = dead1 + " " + dead2;

      if (!this.equalscurTimeVsAuctionTime(this.auction.salesTime)) {
        alert("경매마감날짜를 현재시간 이후로 등록해주세요");
        return;
      }

      if (
        !this.equalscurTimeVsDeadlineTime(
          this.auction.salesTime,
          this.auction.deadline
        )
      ) {
        alert("마감날짜를 경매마감날짜 뒤로 등록해주세요");
        return;
      }

      formData.set("salesTime", this.auction.salesTime);
      formData.set("deadline", this.auction.deadline);
      formData.set("price", this.price.replace(/,/gi, ""))

      let tag_temp = [];
      for (var i = 0; i < this.tags.length; i++) {
        tag_temp.push(this.tags[i].text);
      }
      var temp = tag_temp.join("|");
      formData.set("tag", temp);

      http
        .post("auction/insert", formData)
        .then(res => {
          alert("글 작성됨");
          // console.log(res.data.state);
          // console.log(this.price)
          this.$router.push({
            name: "AuctionDetail",
            params: { auctionId: res.data.state }
          });
        })
        .catch();
    },
    previewImage: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    equalscurTimeVsAuctionTime(at) {
      var cd = new Date();
      var pd = new Date(at);
      if (cd < pd) return true;
      return false;
    },
    equalscurTimeVsDeadlineTime(sales, dead) {
      var cd = new Date(sales);
      var pd = new Date(dead);
      if (cd < pd) return true;
      return false;
    },
    addComma() {
      if (isNaN(this.price.replace(/,/gi, ""))) 
        this.price = "0"
      else this.price = Number(this.price.replace(/,/gi, "")).toLocaleString()
    }
  },

};
</script>


<style lang="css">
/* style the background and the text color of the input ... */
.vue-tags-input {
  background: #324652;
}

.vue-tags-input .ti-new-tag-input {
  background: transparent;
  color: black;
}

.vue-tags-input .ti-input {
  padding: 4px 10px;
  transition: border-bottom 200ms ease;
}

/* we cange the border color if the user focuses the input */
.vue-tags-input.ti-focus .ti-input {
  border: none;
}

/* some stylings for the autocomplete layer */
.vue-tags-input .ti-autocomplete {
  background: #283944;
  border: 1px solid #8b9396;
  border-top: none;
}

/* the selected item in the autocomplete layer, should be highlighted */
.vue-tags-input .ti-item.ti-selected-item {
  background: lightgray;
  color: #283944;
}

/* style the placeholders color across all browser */
.vue-tags-input ::-webkit-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input ::-moz-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-ms-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-moz-placeholder {
  color: #a4b1b6;
}

/* default styles for all the tags */
.vue-tags-input .ti-tag {
  position: relative;
  background: lightgray;
  color: #283944;
}

/* we defined a custom css class in the data model, now we are using it to style the tag */
.vue-tags-input .ti-tag.custom-class {
  background: transparent;
  border: 1px solid lightgray;
  color: lightgray;
  margin-right: 4px;
  border-radius: 0px;
  font-size: 15px;
}

/* the styles if a tag is invalid */
.vue-tags-input .ti-tag.ti-invalid {
  background-color: #e88a74;
}

/* if the user input is invalid, the input color should be red */
.vue-tags-input .ti-new-tag-input.ti-invalid {
  color: #e88a74;
}

/* if a tag or the user input is a duplicate, it should be crossed out */
.vue-tags-input .ti-duplicate span,
.vue-tags-input .ti-new-tag-input.ti-duplicate {
  text-decoration: line-through;
}

/* if the user presses backspace, the complete tag should be crossed out, to mark it for deletion */
.vue-tags-input .ti-tag:after {
  transition: transform 0.2s;
  position: absolute;
  content: "";
  height: 2px;
  width: 108%;
  left: -4%;
  top: calc(50% - 1px);
  background-color: #000;
  transform: scaleX(0);
}

.vue-tags-input .ti-deletion-mark:after {
  transform: scaleX(1);
}
</style>