<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__top">
          <h4 class="modal__title">Your city is {{ city }}?</h4>
          <span class="modal__close" @click="isOpen = false">&#10006;</span>
        </div>

        <div class="modal__input" v-if="showInput">
          <input
            @focus="error = ''"
            @keypress="isLetter($event)"
            @keyup.enter="changeCity"
            type="text"
            placeholder="Type your city.."
            v-model="otherCity"
          />
          <span class="error modal__error">{{ error ? error : "" }}</span>

          <button class="modal__button modal__button_green" @click="changeCity">
            Ok
          </button>
        </div>
        <div class="modal__buttons" v-else>
          <button
            class="modal__button modal__button_green"
            @click="isOpen = false"
          >
            Yes
          </button>
          <button
            class="modal__button modal__button_red"
            @click="showInput = true"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: ["city"],
  data() {
    return {
      isOpen: false,
      showInput: false,
      otherCity: "",
      error: "",
    };
  },
  methods: {
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z\s+]$/.test(char)) return true;
      else e.preventDefault();
    },
    changeCity() {
      if (!this.otherCity) this.error = "Type your city";
      else {
        this.$store
          .dispatch("client/checkCity", this.otherCity)
          .then((res) =>
            res ? "" : (this.error = this.$store.getters["client/getError"])
          );
      }
    },
  },
  created() {
    if (this.$route.query.city) {
      this.isOpen = false;
    } else this.isOpen = true;
  },
  watch: {
    isOpen: function () {
      if (this.isOpen) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>
<style>
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal__container {
  width: 250px;
  margin: 0 auto;
  padding: 20px 40px;
  background: #fff;
  color: #000;
  border-radius: 5px;
}
.modal__title {
  margin: 0;
  text-align: center;
  font-size: 20px;
}
.modal__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.modal__close {
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
}
.modal__button {
  font-size: 16px;
  background: transparent;
  box-shadow: none;
  cursor: pointer;
  padding: 5px 20px;
  color: #fff;
  border: none;
}
.modal__button_green {
  margin-right: 10px;
  background: #47a76a;
}
.modal__button_red {
  background: #e32636;
}
.modal__input input {
  display: block;
  padding: 5px;
  outline: none;
  margin-bottom: 10px;
}
.modal__error {
  display: block;
  margin-bottom: 5px !important;
}
</style>