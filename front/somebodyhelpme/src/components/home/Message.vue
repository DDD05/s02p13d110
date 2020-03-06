<template>
  <div id="message" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1>
      <b>알림함</b>
    </h1>
    <table class="w3-table w3-bordered w3-hoverable" id="messageTable">
      <thead class="w3-center">
        <th>제목</th>
        <th style="width: 10%">작성자</th>
        <th style="width: 15%">날짜</th>
      </thead>
      <tbody>
        <tr v-for="message in calData" :key="message.messageId">
          <td style="text-align:initial;" @click="messageDetail(message.messageId)">
            <b v-if="message.state==0">{{message.title}}</b>
            <span v-if="message.state==1">{{message.title}}</span>
          </td>
          <td>
            <b v-if="message.state==0">관리자</b>
            <span v-if="message.state==1">관리자</span>
          </td>
          <td>
            <b v-if="message.state==0">{{message.date | subDate}}</b>
            <span v-if="message.state==1">{{message.date | subDate}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <div class="w3-center">
      <div class="w3-bar">
        <button class="w3-button" @click="previous()">&laquo;</button>
        <span>{{curPageNum}}</span>
        <button class="w3-button" @click="next()">&raquo;</button>
      </div>
    </div>

    <div id="subscribe" class="w3-modal w3-animate-opacity">
      <div class="w3-modal-content" style="padding:3%">
        <h1>
          <b>알림함</b>
        </h1>
        <div>
          <table class="table" id="detailtable">
            <thead class="thead-light">
              <th style="text-align: center;">{{messageModal.title}}</th>
              <th style="width: 20%">관리자</th>
              <th style="width: 20%">{{messageModal.date}}</th>
            </thead>
          </table>
          <div class="w3-panel w3-border-top w3-border-bottom" style="min-height:300px;">
            <p v-for="content in contents" :key="content">{{content}}</p>
          </div>
          <div style="text-align:right; margin:20px">
            <button class="w3-button w3-white w3-border w3-round-large" @click="goMessage()">목록으로</button>&nbsp;
            <button
              class="w3-button w3-white w3-border w3-round-large"
              @click="deleteMessage(messageModal.messageId)"
            >삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";

export default {
  data() {
    return {
      messages: [{}],
      dataPerpage: 10,
      curPageNum: 1,
      messageModal: {}
    };
  },
  mounted() {
    http
      .get("/message/searchByMembersId/" + this.$store.state.members.membersId)
      .then(Response => {
        this.messages = Response.data;
      })
      .catch(error => window.console.log(error));
  },
  methods: {
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
    messageDetail(messageId) {
      document.getElementById("subscribe").style.display = "block";
      http
        .get("/message/search/" + messageId)
        .then(Response => {
          this.messageModal = Response.data;
          this.contents = this.messageModal.contents.split(".");
          console.log(this.messageModal);
        })
        .catch(error => console.log(error))
        .finally(() => window.console.log("messageDetail axios"));
    },
    goMessage() {
      document.getElementById("subscribe").style.display = "none";
      this.$router.go(); // 새로고침
    },
    deleteMessage(messageId) {
      http
        .delete("/message/delete/" + messageId)
        .then(alert("메세지가 삭제되었습니다"));
      this.$router.go(); // 새로고침
    }
  },
  computed: {
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerpage;
    },
    endOffset() {
      return this.startOffset + this.dataPerpage;
    },
    numOfpages() {
      return Math.ceil(this.messages.length / this.dataPerpage);
    },
    calData() {
      return this.messages.slice(this.startOffset, this.endOffset);
    }
  },
  filters: {
    subDate(date) {
      return date.substring(0, 10);
    }
  }
};
</script>

<style>
#messageTable th {
  text-align: center;
}
#messageTable td {
  text-align: center;
}
h1 {
  font-family: "Playfair Display";
  letter-spacing: 5px;
}
</style>