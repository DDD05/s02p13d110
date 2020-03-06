<template>
  <div style="padding-bottom:5%;;margin-top:2%;">
    <div
      id="feedbackDetail"
      style="padding-bottom:5%;;margin-top:2%;"
      class="w3-container w3-card-4 w3-light-grey w3-margin"
    >
      <h1>
        <b>Feedback</b>
      </h1>
      <br>
      <div class="w3-container w3-card w3-white w3-round w3-margin">
        <br />
        <span
          class="w3-left w3-circle w3-margin-right"
          style="width:60px"
        >No.{{feedback.feedbackId}}</span>
        <span class="w3-right w3-opacity">{{feedback.date}}</span>
        <h4>{{feedback.title}}</h4>
        <br />
        <hr class="w3-clear" />
        <p style="font-size:2em">{{feedback.contents}}</p>
        <div class="w3-row-padding" style="margin:0 -16px"></div>
      </div>

      <div>
        <div style="text-align:right; margin-right:30px">
          <button
            class="w3-button w3-tiny w3-white w3-border w3-round-large"
            @click="deleteFeedback(feedback.feedbackId)"
            v-if="isUserId()"
          >Delete</button>
        </div>
        <hr />
        <div class="w3-row-padding" v-if="this.feedback.answer!=null">
          <div class="w3-col m12">
            <div class="w3-card w3-round w3-white">
              <div class="w3-container w3-padding">
                <h6 class="w3-opacity">관리자 답변</h6>
                <span class="w3-padding w3-container" style="font-size:20px">{{feedback.answer}}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w3-panel"
          style="margin:30px; height:200px;"
          v-if="isUserId() && this.feedback.answer==null"
        >
          <div class="w3-row-padding">
            <div class="w3-col m12">
              <div class="w3-card w3-round w3-white">
                <div class="w3-container w3-padding">
                  <h6 class="w3-opacity">관리자 답변</h6>
                  <textarea class="w3-border" style="width:100%; height:25%" v-model="canswer" />
                  <br />
                  <button
                    type="button"
                    class="w3-button w3-theme w3-right"
                    @click="updateFeedback(feedbackId)"
                  >
                    <i class="fa fa-pencil"></i> Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="w3-panel w3-border-top w3-border-bottom w3-border-left w3-border-right" ;>
      <textarea
        class="w3-input w3-padding-16"
        type="text"
        placeholder="내용을 입력하시오"
        v-model="ccontents"
      />
      </div>-->
      <hr />
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
      feedback: {},
      canswer: ""
    };
  },
  props: ["feedbackId"],
  mounted() {
    this.detail(this.feedbackId);
  },
  methods: {
    isUserId() {
      if (store.state.members.membersId == "admin") {
        return true;
      } else {
        return false;
      }
    },
    deleteFeedback(feedbackId) {
      http
        .delete("/feedback/deleteFeedback/" + feedbackId)
        .then(alert("게시글이 삭제되었습니다"), this.$router.push("/Backpage"));
    },
    detail(feedbackId) {
      http
        .get("/feedback/searchFeedbackByFeedbackId/" + feedbackId)
        .then(Response => {
          this.feedback = Response.data;
        })
        .catch(error => console.log(error))
        .finally(() => window.console.log("feedbackDetail axios"));
    },
    updateFeedback(feedbackId) {
      http
        .put("/feedback/updateFeedback", {
          title: this.feedback.title,
          contents: this.feedback.contents,
          membersId: this.feedback.membersId,
          date: this.feedback.date,
          answer: this.canswer,
          feedbackId: feedbackId
        })
        .then(this.$router.push("/CommandCenter"));
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
#feedbackDetail {
  padding: 0 10px;
}
</style>
