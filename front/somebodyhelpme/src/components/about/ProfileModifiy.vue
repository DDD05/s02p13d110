<template>
  <div id="ProfileModify" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1 style="padding-top:10px;">
      <b>내 정보 수정</b>
    </h1>
    <form action="#" id="formData" >
      <div class="w3-bar" style="width:100%">
        <span
          onclick="this.parentElement.style.display='none'"
          class="w3-bar-item w3-button w3-white w3-xlarge w3-right"
        >×</span>
        <img
          :src="members.image"
          class="w3-bar-item w3-circle w3-hide-small"
          alt="프로필사진"
          name="image"
          style="width:20%"
          v-if="!pageInfo.profileimageEdit"
        />
        <img
          class="w3-bar-item w3-circle w3-hide-small"
          alt="프로필사진"
          :src="members.image"
          name="image"
          style="width:20%"
          v-if="pageInfo.profileimageEdit"
        />
        <div class="w3-bar-item">
          <span class="w3-xlarge">{{members.membersId}}</span>
          <input
            class="w3-input"
            style="width:100%;"
            type="hidden"
            name="membersId"
            v-model="members.membersId"
          />
          <br />
          <span>{{members.name}}</span>
        </div>
      </div>
      <span
        class="w3-left w3-text-gray"
        style="padding-left:8%;"
        @click="pageInfo.profileimageEdit = !pageInfo.profileimageEdit"
      >edit</span>
      <input
        type="file"
        @change="previewImage"
        accept="image/*"
        name="imageFile"
        v-show="pageInfo.profileimageEdit"
      />
      <hr />

      <div class="w3-section">
        <label style="font-family:jjl">이름</label>
        <input
          class="w3-input"
          style="width:100%;"
          type="text"
          required
          name="Name"
          v-model="members.name"
        />
      </div>
      <span
        class="w3-right w3-text-gray"
        @click="pageInfo.passwordEdit = !pageInfo.passwordEdit"
      >edit</span>

      <div class="w3-section">
        <label style="font-family:jjl">이메일</label>
        <input
          class="w3-input"
          style="width:100%;"
          type="text"
          name="email"
          v-model="members.email"
          disabled
        />
      </div>
      <div class="w3-section">
        <label style="font-family:jjl">핸드폰</label>
        <input
          class="w3-input"
          style="width:100%;"
          type="text"
          name="phone"
          v-model="members.phone"
        />
      </div>
      <div class="w3-section">
        <label style="font-family:jjl">계좌 번호</label>
        <input
          class="w3-input"
          style="width:100%;"
          type="text"
          name="account"
          v-model="members.account"
          placeholder="은행-계좌번호"
        />
      </div>
      <div class="w3-section">
        <p>
          <label style="font-family:jjl">주소</label>
          <span
            class="w3-right w3-text-gray"
            @click="pageInfo.showFindAddress = !pageInfo.showFindAddress"
          >Find</span>
          <input
            class="w3-input w3-border w3-hover-indigo"
            name="address"
            type="text"
            placeholder="address"
            style="width:100%"
            v-model="members.address"
            v-show="!pageInfo.showFindAddress"
            @click="pageInfo.showFindAddress = !pageInfo.showFindAddress"
          />
          <br />
          <input
            class="w3-input w3-border w3-hover-indigo"
            style="width:100%"
            name="detailAddress"
            type="text"
            v-model="members.address"
            v-show="!pageInfo.showFindAddress"
            placeholder="Detail Address"
          />
          <VueDaumPostcode
            v-if="pageInfo.showFindAddress"
            @complete="userInfoVo.addressObj = $event , pageInfo.showFindAddress = !pageInfo.showFindAddress"
            style="height: 450px; overflow: scroll;"
          ></VueDaumPostcode>
        </p>
      </div>
      <hr />
      <div class="w3-section">
        <span
          class="w3-right w3-text-gray"
          @click="pageInfo.portfolioEdit = !pageInfo.portfolioEdit"
        >edit</span>
        <label style="font-family:jjl">포트 폴리오</label>
        <input
          class="w3-input"
          style="width:100%;"
          type="text"
          name="portfolio"
          v-model="members.portfolio"
          v-if="!pageInfo.portfolioEdit"
        />

        <input
          class="w3-input w3-border"
          name="portfolioFile"
          type="file"
          ref="file"
          v-show="pageInfo.portfolioEdit"
        />
      </div>
      <div>
        <label for="about" style="font-family:jjl">내 소개하기</label><br>
        <textarea name="about" id="about" cols="80" v-model="members.about"></textarea>
      </div>
      <button class="w3-button w3-teal w3-right" type="button" @click="updateMember">수정하기</button>
    </form>
  </div>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode";
import http from "@/utils/http-require.js";

import store from "@/store";
export default {
  components: {
    VueDaumPostcode
  },
  data() {
    return {
      store,
      imageData: store.state.members.image,
      ux: {
        isOverlapId: {},
        name: {}
      },
      members: {},
      pageInfo: {
        equalsToPassword: false,
        showFindAddress: false,
        portfolioEdit: false,
        profileimageEdit: false
      },
      error: {
        code: "",
        name: ""
      }
    };
  },
  mounted() {
    console.log(
      `profile modifiy insert ${this.$store.state.members.membersId}`
    );

    this.members = this.$store.state.members;
  },
  methods: {
    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    updateMember() {
      let formData = new FormData(document.getElementById("formData"));
      if (!this.pageInfo.profileimageEdit) {
        formData.image = store.state.members.image;
      } else {
        formData.image = this.imageData;
      }
      http
        .put(`member/update`, formData)
        .then(response => {
          if (response.data.state == "succ") {
            alert(`정보를 수정했습니다.`);
          } else {
            alert("실패");
          }
          // this.$router.push("/");
        })
        .catch(() => {
          alert("정보 수정에 실패하였습니다.");
        });
    }
  }
};
</script>
