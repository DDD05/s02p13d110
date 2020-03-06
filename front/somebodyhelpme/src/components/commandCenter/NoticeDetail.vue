<template>
  <div style="padding-bottom:5%;;margin-top:2%;">
    <div class="w3-container w3-card-4 w3-light-grey w3-margin">
      <h1>
      <b>Notice</b>
    </h1>
    <br>
      <div>
        <table class="table" id="detailtable">
          <thead class="thead-light">
            <th style="width: 15%;">No.{{notice.noticeId}}</th>
            <th style="text-align: center;">{{notice.title}}</th>
            <th style="width: 20%">writer : {{notice.membersId}}</th>
            <th style="width: 8%">{{notice.date | tofixed}}</th>
          </thead>
        </table>
        <div
          class="w3-panel w3-border-top w3-border-bottom"
          style="margin:100px; height:300px;"
        >{{notice.contents}}</div>
        <div style="text-align:right; margin-right:30px">
          <button
            class="w3-button w3-tiny w3-white w3-border w3-round-large"
            @click="updateNotice(notice.noticeId)"
            v-if="isUserId()"
          >Update</button>&nbsp;
          <button
            class="w3-button w3-tiny w3-white w3-border w3-round-large"
            @click="deleteNotice(notice.noticeId)"
            v-if="isUserId()"
          >Delete</button>
        </div>
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
      notice: {}
    };
  },
  props: ["noticeId"],
  mounted() {
    this.detail(this.noticeId);
  },
  methods: {
    isUserId() {
      if (store.state.members.membersId == "admin") {
        return true;
      } else {
        return false;
      }
    },
    deleteNotice(noticeId) {
      http
        .delete("/notice/delete/" + noticeId)
        .then(
          alert("게시글이 삭제되었습니다"),
          this.$router.push("/CommandCenter")
        );
    },
    detail(noticeId) {
      http
        .get("/notice/searchByNoticeId/" + noticeId)
        .then(Response => {
          this.notice = Response.data;
        })
        .catch(error => console.log(error))
        .finally(() => window.console.log("noticeDetail axios"));
    },
    updateNotice(noticeId) {
      console.log(noticeId);
      this.$router.push({
        name: `NoticeUpdate`,
        params: { noticeId: noticeId }
      });
    }
  },
  filters: {
    tofixed(date) {
      return date.substring(0, 16);
    }
  }
};
</script>

<style>
thead {
  border: 1px;
  border-bottom-color: black;
}
#detailtable {
  text-align: center;
}
</style>
