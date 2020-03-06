<template>
  <!-- 
    Notice how Vue gives us more types of events beyond
    the onclick listener. This allows us to hold a key down.
  -->
  <span @mouseenter="playPiano()" class="whitekey">{{text}}</span>
</template>


<script>
export default {
  name: "WhiteKey",
  /**
   * props are variables that take on values given by v-bind. See how
   * frequency is used in App.vue
   */
  props: {
    frequency: Number,
    text: String
  },
  /**
   * data defines other variables to be used by this component.
   */
  data: function() {
    return {
      oscillator: null,
      context: null,
      started: false
    };
  },
  /**
   * methods are functions that can be used inside this component.
   * They cannot be used anywhere outside of the WhiteKey component.
   */
  methods: {
    playPiano() {
      this.play();
      setTimeout(() => {
        this.stop();
      }, 250);
    },
    play: function() {
      this.oscillator.connect(this.context.destination);
      if (!this.started) {
        this.oscillator.start();
        this.started = true;
      }
    },
    stop: function() {
      this.oscillator.disconnect(this.context.destination);
    }
  },
  /**
   * the "mounted" function is a special function that gets run
   * the moment a component is used. So every time a WhiteKey
   * is used in App.vue, mounted() gets called.
   */
  mounted() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = this.frequency;
  }
};
</script>



<!-- The "scoped" attribute to limits CSS to this component only -->
<style scoped>
</style>
