<template>
  <div id="faq" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1>
      <b>F A Q</b>
    </h1>
    <br>
    <VueFaqAccordion :items="myItems" style="margin-left:15%; padding-right:10% white-space:pre;" />
  </div>
</template>
 
<script>
import VueFaqAccordion from "vue-faq-accordion";

export default {
  components: {
    VueFaqAccordion
  },
  data() {
    return {
      myItems: [
        {
          title: "회원 수정은 어떻게 하나요?",
          value:
            "회원 수정은 상답 탭의 내 정보를 클릭 후 왼쪽 사이드바의 회원 수정 버튼을 누르시면 됩니다."+
            "해당 페이지에서 수정하고 싶은 정보를 입력 후 수정 버튼을 누르시면 회원 정보를 수정하실 수 있습니다",
          category: "회원"
        },
        {
          title: "회원 탈퇴는 어떻게 하나요?",
          value:
            "회원 탈퇴는 관리자에게 회원 탈퇴 항목으로 1:1문의를 주시면 탈퇴 처리해 드리고 있습니다."+
            "회원 탈퇴를 하고 싶으신 회원님은 회원 탈퇴 1:1문의를 남겨 주세요.",
          category: "회원"
        },
        {
          title: "경매는 어떻게 등록하나요?",
          value:
            "경매 등록은 상답 탭의 내 정보를 클릭 후 왼쪽 사이드바의 경매 등록을 누르시면 됩니다.\n"+
            "해당 페이지에서 경매에 필요한 정보들을 입력 후 등록 버튼을 누르시면 경매를 등록하실 수 있습니다.\n"+
            "썸네일, 경매 마감 시간, 제목, 상한가, 내용, 작업 온라인/오프라인 여부, 명세서 (일 진행을 위한 문서 등), 프로세스 마감 기한, 태그 등을 입력하여 주시면 됩니다.  ",
          category: "경매"
        },
        {
          title: "결제는 어떻게 진행하나요?",
          value: "경매 등록자가 경매 낙찰을 진행하면 경매 결제 페이지로 이동하게 됩니다.\n"+
          "낙찰된 회원의 금액으로 결제를 진행하게 되는데, 결제 금액을 확인하신 후 결제하기 버튼을 누르시면 결제를 진행하게 됩니다.\n"+
          "현재 카카오페이 결제만 가능한 상태이며, 추후 다르 결제 방식을 추가하도록 노력하겠습니다.",
          category: "결제"
        },
      ]
    };
  },
  props: {
    items: {
      type: Array,
      required: true
    },

    questionProperty: {
      type: String,
      default: "title"
    },
    answerProperty: {
      type: String,
      default: "value"
    },
    tabName: {
      type: String,
      default: "category"
    },
    activeColor: {
      type: String,
      default: "#D50000"
    },
    borderColor: {
      type: String,
      default: "#9E9E9E"
    },

    fontColor: {
      type: String,
      default: "#FFFFFF"
    }
  }
};
</script>

<style scoped>
</style>