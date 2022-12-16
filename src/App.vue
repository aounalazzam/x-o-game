<template>
  <div class="score-container">
    <div class="score-panel">
      <h1>Score X : <span v-text="scoreX"></span></h1>
      <h1>Score O : <span v-text="scoreO"></span></h1>
    </div>
    <div class="score-info">
      <h1 v-text="scoreInfo"></h1>
    </div>
  </div>
  <div class="game-container">
    <div class="slot right-border bottom-border" @click="play(1)">
      <h1 v-text="slot1"></h1>
      1
    </div>
    <div class="slot right-border bottom-border" @click="play(2)">
      <h1 v-text="slot2"></h1>
      2
    </div>
    <div class="slot bottom-border" @click="play(3)">
      <h1 v-text="slot3"></h1>
      3
    </div>

    <div class="slot right-border bottom-border" @click="play(4)">
      <h1 v-text="slot4"></h1>
      4
    </div>
    <div class="slot right-border bottom-border" @click="play(5)">
      <h1 v-text="slot5"></h1>
      5
    </div>
    <div class="slot bottom-border" @click="play(6)">
      <h1 v-text="slot6"></h1>
      6
    </div>

    <div class="slot right-border" @click="play(7)">
      <h1 v-text="slot7"></h1>
      7
    </div>
    <div class="slot right-border" @click="play(8)">
      <h1 v-text="slot8"></h1>
      8
    </div>
    <div class="slot" @click="play(9)">
      <h1 v-text="slot9"></h1>
      9
    </div>
  </div>
  <div class="controller-container">
    <button v-show="gameEnd" @click="resetGame">Play Again</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      slot1: "",
      slot2: "",
      slot3: "",
      slot4: "",
      slot5: "",
      slot6: "",
      slot7: "",
      slot8: "",
      slot9: "",
      scoreInfo: "",
      gameEnd: false,
      incomePlayFor: "X",
      scoreX: window.localStorage.getItem("scoreX") || 0,
      scoreO: window.localStorage.getItem("scoreO") || 0,
    };
  },
  methods: {
    createPlayCondition(slot1, slot2, slot3) {
      return (
        slot1 === slot2 && slot1 === slot3 && slot2 === slot3 && slot1 !== ""
      );
    },
    resetGame() {
      for (let i = 1; i < 10; i++) {
        this.$data["slot" + i] = "";
      }

      this.$data.scoreInfo = "";
      this.$data.gameEnd = false;
    },
    play(slotNumber) {
      if (this.$data.gameEnd) {
        return;
      }

      const currentSlot = "slot" + slotNumber;
      const incomePlayFor = this.$data.incomePlayFor;

      if (this.$data[currentSlot] !== "") {
        return this.$data[currentSlot];
      }

      if (incomePlayFor === "X") {
        this.$data.incomePlayFor = "O";
      } else {
        this.$data.incomePlayFor = "X";
      }

      this.$data[currentSlot] = incomePlayFor;

      const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9 } =
        this.$data;

      // No Winner
      const isNoWinner =
        slot1.length > 0 &&
        slot2.length > 0 &&
        slot3.length > 0 &&
        slot4.length > 0 &&
        slot5.length > 0 &&
        slot6.length > 0 &&
        slot7.length > 0 &&
        slot8.length > 0 &&
        slot9.length > 0;

      const isWinner =
        // Row
        this.createPlayCondition(slot1, slot2, slot3) ||
        this.createPlayCondition(slot4, slot5, slot6) ||
        this.createPlayCondition(slot7, slot8, slot9) ||
        // Column
        this.createPlayCondition(slot3, slot6, slot9) ||
        this.createPlayCondition(slot2, slot5, slot8) ||
        this.createPlayCondition(slot1, slot4, slot7) ||
        // Diagonal
        this.createPlayCondition(slot7, slot5, slot3) ||
        this.createPlayCondition(slot9, slot5, slot1);

      if (isWinner) {
        this.$data.gameEnd = true;

        const playerScore = "score" + incomePlayFor;

        window.localStorage.setItem(
          playerScore,
          (this.$data[playerScore] += 1)
        );

        this.$data.scoreInfo = `[ ${incomePlayFor} ] Is Win`;
        return;
      }

      if (isNoWinner) {
        this.$data.scoreInfo = "No Winner";

        setTimeout(() => {
          this.resetGame();
        }, 2000);
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.score-container {
  width: 100%;
  display: flex;
  padding: 10px 0;
  align-items: center;
  flex-direction: column;
}

.score-panel {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.score-info {
  width: 100%;
  display: flex;
  padding: 25px 0;
}

.score-info h1 {
  margin: auto;
}

.game-container {
  width: 500px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
}

.slot {
  display: flex;
  width: 166px;
  height: 166px;
  cursor: pointer;
}

.slot:hover {
  background: #80808024;
}

.slot h1 {
  margin: auto;
  font-size: 100px;
}

.slot.right-border {
  border-right: 1px solid black;
}

.slot.bottom-border {
  border-bottom: 1px solid black;
}

.controller-container {
  display: flex;
  padding: 25px 0;
}

button {
  border: 0;
  padding: 10px;
  color: white;
  display: block;
  cursor: pointer;
  font-weight: 500;
  font-size: large;
  border-radius: 5px;
  background-color: black;
}
</style>
