/* Router */

const PayPage = {
  data() {
    return {
      operators: [],
      errors: [],
      isCodeValid: false,
      isPhoneValid: false,
      currentOperatorId: "",
    };
  },
  methods: {
    setValue(e) {
      const value = e.target.textContent.split(" ")[0];
      this.$el.querySelector("#price-input").value = value;
    },
    showOperator(e) {
      const value = e.target.value;
      const logo = this.$el.querySelector(".phone_input_wrap");
      const phoneError = this.$el.querySelector(".phone_error");
      if (value.length === 2) {
        let currentOperator = this.operators.find((op) => op.code === value);
        if (currentOperator) {
          this.currentOperatorId = currentOperator.id;
          console.log(typeof this.currentOperatorId);
          phoneError.style.display = "none";
          this.isCodeValid = true;
        } else {
          this.isCodeValid = false;
          phoneError.textContent = "Невірний код оператора";
          phoneError.style.display = "block";
        }
      }
      if (value.length < 2) {
         this.currentOperatorId = '';
      }
    },
    checkData(e) {
      e.preventDefault();
      const phoneError = this.$el.querySelector(".phone_error");
      const priceError = this.$el.querySelector(".price_error");
      const priceInput = this.$el.querySelector("#price-input").value;
      const phoneInput = this.$el.querySelector(".phone_form_input");

      if (phoneInput.value.length === 9) {
        this.isPhoneValid = true;
      } else {
        this.isPhoneValid = false;
        phoneError.textContent = "Невірний номер";
        phoneError.style.display = "block";
      }
      if (priceInput) {
        priceError.style.display = "none";
      } else {
        priceError.textContent = "Ви не ввели суму поповнення";
        priceError.style.display = "block";
      }
      if (this.isPhoneValid && priceInput && this.isCodeValid) {
        localStorage.setItem(
          "transactionData",
          JSON.stringify({
            operatorId: this.currentOperatorId,
            phone: `+38${phoneInput.value}`,
            totalValue: priceInput,
          })
        );
        router.push("/pay/card");
      }
    },
  },

  created() {
    axios
      .get(
        `http://kursovoiproject/api/getOperators?auth=dIC349vWSpXx234NmQP21rvIeDd`
      )
      .then((response) => {
        this.operators = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  template: `
      <div class="wrapper_form">
        <div class="centered  card_form">
          <form class="phone_form" action="">
              <label class="phone_form_text " for="">Введіть номер телефону</label>
              <div class="phone_input_wrap" :class="{Kyivstar:currentOperatorId === '1',Vodafone:currentOperatorId === '2',Lifecell:currentOperatorId === '3'}">
                <input @input ="showOperator" class="phone_form_input form_input_first"  type="text" maxlength="9">
                <div class="error phone_error"></div>
              </div>
              <label class="phone_form_text" for="">Введіть суму поповнення</label>
              <input id="price-input" class="phone_form_input form_input_last" type="text">
              <div class="error price_error">Невірний код оператора</div>
              <div class="value_buttons">
                <p class="value_but" @click="setValue">50 грн</p>
                <p class="value_but" @click="setValue">100 грн</p>
                <p class="value_but" @click="setValue">200 грн</p>
              </div>
              <button  class="tariff_link" @click="checkData">
                  Продовжити
              </button>
          </form>
        </div>
        <div class="tip_block">
           <div class="tips">
            <p class="tips_text">Оплатити можна за 3 простих кроки:</p>
            <ul class="tips_list">
              <li class="tips_list_item">Введіть дані об оплаті;</li>
              <li class="tips_list_item">Перевірте коректність даних;</li>
              <li class="tips_list_item">Внесіть дані платіжної картки.</li>
            </ul>
          </div>
          <div class="img_wrap">
            <img src="https://ibox.ua/public/img/img_blog/image_mobile.svg" class="tip_block_pic">
          </div>
        </div>
      </div>
       `,
};

const PayCard = {
  data() {
    return {
      cards: [],
      errors: [],
      transaction: [],
    };
  },
  methods: {
    checkData(e) {
      e.preventDefault();
      const cardNumber = this.$el.querySelector("#card_number");
      const cardDate = this.$el.querySelector("#card_date");
      const cardCvv = this.$el.querySelector("#card_cvv");
      const dateError = this.$el.querySelector(".date_error");
      let transactionData = JSON.parse(localStorage.getItem("transactionData"));
      let dateParsed = cardDate.value.split("/");
      let isCardDate = false;
      let isCardCvv = false;
      
      let currentCard = this.cards.find(function (card) {
        if (card.card_number === cardNumber.value) return card;
      });

      if (currentCard) {
        transactionData.cardId = currentCard.id;
        isCardCvv = currentCard["c_cvv"] === cardCvv.value;
        if (
          currentCard["c_month"] === dateParsed[0] &&
          currentCard["c_year"] === dateParsed[1]
        ) {
          isCardDate = true;
        } else {
          isCardDate = false;
        }
         transactionData.date = new Date().toLocaleString();

         if (Number(currentCard.balance) < Number(transactionData.totalValue)) {
           transactionData.status = "0";
           transactionData.newBalance = currentCard.balance;
         } else {
           transactionData.status = "1";
           transactionData.newBalance =
             Number(currentCard.balance) - Number(transactionData.totalValue);
         }
      }

     

      if (currentCard && isCardCvv && isCardDate) {
        let formData = new FormData();
        if (transactionData) {
          for (let i in transactionData) {
            formData.append(i, transactionData[i]);
          }
        }
        axios
          .post(
            "http://kursovoiproject/api/newTransaction?auth=dIC349vWSpXx234NmQP21rvIeDd",
            formData
          )
          .then(function () {
            dateError.style.display = "none";
            router.push("/pay/final");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        dateError.textContent = "Перевірте правильність даних";
        dateError.style.display = "block";
      }
    },
  },
  created() {
    axios
      .get(
        `http://kursovoiproject/api/getCards?auth=dIC349vWSpXx234NmQP21rvIeDd`
      )
      .then((response) => {
        this.cards = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  template: `
    <div class="wrapper_form">
      <div class="centered">
          <form class="phone_form card_form" action="">
              <label class="phone_form_text " for="">Введіть номер картки</label>
              <input id="card_number" class="phone_form_input form_input_last" type="text" maxlength="16">
              <label class="phone_form_text" for="">Введіть термін дії </label>
              <input id ="card_date" class="phone_form_input form_input_last" type="text" maxlength="5">
              <label class="phone_form_text" for="">Введіть CVV </label>
              <input id ="card_cvv" class="phone_form_input form_input_last" type="text" maxlength="3">
              <div class="error date_error"></div>
            <button @click="checkData" class="tariff_link">
                Оплатити
              </button>
              
          </form>
        </div>
        <div class="tip_block">
          <div class="tips">
            <p class="tips_text">Оплатити можна за 3 простих кроки:</p>
            <ul class="tips_list">
              <li class="tips_list_item">Введіть дані об оплаті;</li>
              <li class="tips_list_item">Перевірте коректність даних;</li>
              <li class="tips_list_item">Внесіть дані платіжної картки.</li>
            </ul>
          </div>
          <div class="img_wrap">
            <img src="https://ibox.ua/public/img/img_blog/image_mobile.svg" class="tip_block_pic"/>
          </div>
        </div>
      </div>
       `,
};

const FinalPage = {
  data() {
    return {
      currentTransaction: [],
    };
  },
  methods: {},

  created() {
    axios
      .get(
        `http://kursovoiproject/api/getLastTransaction?auth=dIC349vWSpXx234NmQP21rvIeDd`
      )
      .then((response) => {
        this.currentTransaction = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  template: `
      <div class="wrapper">
        <div class="transaction">
          <div class="transactio_inner">
            <h1 class="transaction_id">Транзакція #{{this.currentTransaction.id}} </h1>
            <h2 class="transaction_text" v-if="this.currentTransaction.status === '1'" >Оплата проведена успішно</h2>
             <h2 class="transaction_text_red " v-else>Оплата не пройшла, не вистачає коштів</h2>
          </div>
        </div>
      </div>
       `,
};

const routes = [
  { path: "/", component: PayPage },
  {
    path: "/pay/card",
    component: PayCard,
  },
  {
    path: "/pay/final",
    component: FinalPage,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

Vue.createApp({}).use(router).mount("#app");
