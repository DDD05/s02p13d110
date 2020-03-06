<template>
  <div id="feedback" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1 style="padding-top:10px;">
      <b>Feedback</b>
    </h1>
    <br>
    <div class="w3-section w3-bottombar w3-padding-16" style="text-align:center" v-if="!isUserId()">
      <button class="w3-button w3-black" @click="FeedbackInsert" style="text-align:right">
        <i class="fa fa-diamond w3-margin-right"></i>문의하기
      </button>
    </div>
    <table class="w3-table w3-bordered w3-hoverable" id="feedbackTable">
      <thead class="w3-center">
        <th style="width: 8%;">Num</th>
        <th>Title</th>
        <th style="width: 8%">Writer</th>
        <th style="width: 18%">Date</th>
        <th style="width: 8%">Answer</th>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback.feedbackId">
          <td>{{feedback.feedbackId}}</td>
          <td
            style="text-align:initial;"
            @click="feedbackDetail(feedback.feedbackId)"
          >{{feedback.title}}</td>
          <td>{{feedback.membersId}}</td>
          <td>{{feedback.date | tofixed}}</td>
          <td v-if="feedback.answer!=null">
            <i class="fa fa-comment" style="font-size:24px"></i>
          </td>
          <td v-else>
            <i class="fa fa-minus" style="font-size:24px"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
import http from "@/utils/http-require.js";
import store from "@/store";
export default {
  data() {
    return {
      store,
      feedbacks: [{}],
      url: ""
    };
  },
  beforeMount() {},
  mounted() {
    if (store.state.members.membersId == "admin") {
      this.url = "/feedback/searchAllFeedback";
    } else {
      this.url =
        "/feedback/searchFeedbackByMembersId/" + store.state.members.membersId;
    }
    http
      .get(this.url)
      .then(Response => {
        this.feedbacks = Response.data;
      })
      .catch(error => window.console.log(error))
      .finally(() => window.console.log("searchAll axios"));
  },

  methods: {
    FeedbackInsert() {
      this.$router.push("/FeedbackInsert");
    },
    feedbackDetail(feedbackId) {
      this.$router.push({
        name: `FeedbackDetail`,
        params: { feedbackId: feedbackId }
      });
    },
    isUserId() {
      if (store.state.members.membersId == "admin") {
        return true;
      } else {
        return false;
      }
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