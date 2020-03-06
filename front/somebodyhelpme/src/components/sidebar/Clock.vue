<template>
  <div id="clock" class="w3-panel w3-black w3-display-container">
    <span
      onclick="this.parentElement.style.display='none'"
      class="w3-button w3-black w3-large w3-display-topright"
    >x</span>
    <p>{{subject.substring(0,15) }}</p>
    <p class="date">{{ date}}</p>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: "clock",
  props: ["subject", "auctionTime"],
  data: () => {
    return {
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      time: "",
      date: "",
      timerID: ""
    };
  },
  methods: {
    onload() {
      if (this.auctionTime == null) {
        this.timerID = setInterval(this.updateTime, 1000);
        this.updateTime();
      } else {
        this.timerID = setInterval(this.playTimer, 1000);
        this.playTimer();
      }
    },
    playTimer() {
      var at = new Date(this.auctionTime);
      var ct = new Date();
      var timer = ((at - ct) / 1000).toFixed(0);
      var days = Math.floor(timer / (60 * 60 * 24));
      var hours = Math.floor((timer % (60 * 60 * 24)) / (60 * 60));
      var minutes = Math.floor((timer % (60 * 60)) / 60);
      var seconds = Math.floor(timer % 60);
      this.time =
        days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초 ";
    },
    updateTime() {
      var pTime = new Date();
      this.time =
        this.zeroPadding(pTime.getHours(), 2) +
        ":" +
        this.zeroPadding(pTime.getMinutes(), 2) +
        ":" +
        this.zeroPadding(pTime.getSeconds(), 2);
      this.date =
        this.zeroPadding(pTime.getFullYear(), 4) +
        "-" +
        this.zeroPadding(pTime.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(pTime.getDate(), 2) +
        " " +
        this.week[pTime.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  },
  mounted() {
    this.onload();
  },
  destroyed() {
    clearInterval(this.timerID);
  }
};
</script>

<style>
#clock {
  color: #ffffff;
  text-shadow: 0 0 20px rgb(255, 255, 255), 0 0 20px rgb(230, 239, 241);
}
</style>