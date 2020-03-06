<template>
  <div id="notice" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1>
      <b>Notice</b>
    </h1>
    <br>
    <div>
      <div style="text-align:right; margin-right:15px;">
        <input type="text" placeholder="제목으로 검색" v-model="searchTitle" />&nbsp;
        <button
          class="w3-button w3-tiny w3-white w3-border w3-round-large"
          @click="searchNoticeByTitle"
        >search</button>
      </div>
    </div>
    <table class="w3-table w3-bordered w3-hoverable" id="noticeTable">
      <thead class="w3-center">
        <th style="width: 8%;">Num</th>
        <th>Title</th>
        <th style="width: 8%">Writer</th>
        <th style="width: 15%">Date</th>
      </thead>
      <tbody>
        <tr v-for="notice in calData" :key="notice.noticeId">
          <td>{{notice.noticeId}}</td>
          <td style="text-align:initial;" @click="noticeDetail(notice.noticeId)">{{notice.title}}</td>
          <td>{{notice.membersId}}</td>
          <td>{{notice.date | tofixed}}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div style="text-align:right; margin-right:15px">
      <button
        class="w3-button w3-tiny w3-white w3-border w3-round-large"
        @click="NoticeInsert"
        v-if="isUserId()"
      >글쓰기</button>
    </div>
    <br />
    <div class="w3-center">
      <div class="w3-bar">
        <button class="w3-button" @click="previous()">&laquo;</button>
        <span>{{curPageNum}}</span>
        <button class="w3-button" @click="next()">&raquo;</button>
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
      store,
      notices: [{}],
      dataPerpage: 10,
      curPageNum: 1,
      searchTitle: ""
    };
  },
  mounted() {
    http
      .get("/notice/searchAll")
      .then(Response => {
        this.notices = Response.data;
      })
      .catch(error => window.console.log(error))
      .finally(() => window.console.log("searchAll axios"));
  },

  methods: {
    isUserId() {
      if (store.state.members.membersId == "admin") {
        return true;
      } else {
        return false;
      }
    },
    previous() {
      if (1 < this.curPageNum) {
        return (this.curPageNum -= 1);
      }
      return this.curPageNum;
    },
    next() {
      if (this.numOfpages > this.curPageNum) {
        return (this.curPageNum += 1);
      }
      return this.curPageNum;
    },

    noticeDetail(noticeId) {
      this.$router.push({
        name: "NoticeDetail",
        params: { noticeId: noticeId }
      });
    },
    searchNoticeByTitle() {
      var url = "";
      if (this.searchTitle == "") {
        url = "/notice/searchAll";
      } else {
        url = "/notice/search/" + this.searchTitle;
      }
      http
        .get(url)
        .then(Response => {
          this.notices = Response.data;
        })
        .catch(error => window.console.log(error))
        .finally(() => window.console.log("searchTitle axios"));
    },
    NoticeInsert() {
      this.$router.push("/NoticeInsert");
    }
  },
  created() {
    http
      .get("/notice/searchAll")
      .then(Response => {
        this.notices = Response.data;
      })
      .catch(error => window.console.log(error))
      .finally(() => window.console.log("searchAll axios"));
  },
  computed: {
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerpage;
    },
    endOffset() {
      return this.startOffset + this.dataPerpage;
    },
    numOfpages() {
      return Math.ceil(this.notices.length / this.dataPerpage);
    },
    calData() {
      return this.notices.slice(this.startOffset, this.endOffset);
    }
  },
  filters: {
    tofixed(date) {
      return date.substring(0, 10);
    }
  }
};
</script>

<style>
#noticeTable th {
  text-align: center;
}
#noticeTable td {
  text-align: center;
}
h1 {
  font-family: "Playfair Display";
  letter-spacing: 5px;
}
</style>