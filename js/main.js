/* Router */

const Home = {
  data() {
    return {
      message: "",
      operators: [
        {
          id: 1,
          name: "Vodafone",
        },
        {
          id: 2,
          name: "Kyivstar",
        },
        {
          id: 3,
          name: "Lifecell",
        },
      ],
    };
  },
  template: `<div class="operator_cards_wrap">
                <div  v-for="op in operators">
                  <router-link :to="{name: 'operatorId', params: {id: op.id}}" class="operator_link">
                      <div class="operator_card">
                         <h2 class="operator_name"> {{op.name}}</h2>
                      </div>
                  </router-link>
                </div>
            </div>`,
};

const Operator = {
  data() {
    return {
      operatorId: this.$route.params.id,
      operators: [
        {
          id: 1,
          name: "Vodafone",
        },
        {
          id: 2,
          name: "Kyivstar",
        },
        {
          id: 3,
          name: "Lifecell",
        },
      ],
      tariffs: [
        {
          id: 1,
          operatorId: 1,
          name: "Сімейний",
          cost: 150,
        },
        {
          id: 2,
          operatorId: 1,
          name: "Для бомжей",
          cost: 15,
        },
        {
          id: 3,
          operatorId: 1,
          name: "Средний",
          cost: 75,
        },
        {
          id: 4,
          operatorId: 1,
          name: "Веселий",
          cost: 228,
        },
        {
          id: 5,
          operatorId: 1,
          name: "Інтернет на повну",
          cost: 320,
        },
        {
          id: 6,
          operatorId: 1,
          name: "ТОп за свої гроші",
          cost: 190,
        },
      ],
      operator: {},
      tariff: {},
    };
  },
  methods: {
    getOperator() {
      this.operator = this.operators.find(
        (op) => op.id === Number(this.operatorId)
      );
      this.tariff = this.tariffs.filter(
        (t) => t.operatorId === Number(this.operatorId)
      );
    },
  },
  created() {
    this.getOperator();
  },
  template: `
      <h1 class="operator_name tariff_operator_name">{{operator.name}}</h1>
        <div class="tariff_cards_wrap">
          <div  class="tariff_card" v-for="t in tariff">
            <h2 class="tariff_name">{{t.name}}</h2>
            <p class="tariff_cost">{{t.cost}} грн/міс</p>
            <p class="tariff_desc"> Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. </p>
            <router-link :to="{name:'tariffId', params: {id: t.id}}" class="tariff_link">
                Оплатити
            </router-link>
          </div>
      </div>`,
};

const PayPage = {
  data() {
    return {
      tariffId: this.$route.params.id,
      operators: [
        {
          id: 1,
          name: "Vodafone",
        },
        {
          id: 2,
          name: "Kyivstar",
        },
        {
          id: 3,
          name: "Lifecell",
        },
      ],
      tariffs: [
        {
          id: 1,
          operatorId: 2,
          name: "Сімейний",
          cost: 150,
        },
        {
          id: 2,
          operatorId: 1,
          name: "Для бомжей",
          cost: 15,
        },
        {
          id: 3,
          operatorId: 3,
          name: "Средний",
          cost: 75,
        },
        {
          id: 4,
          operatorId: 1,
          name: "Веселий",
          cost: 228,
        },
        {
          id: 5,
          operatorId: 2,
          name: "Інтернет на повну",
          cost: 320,
        },
        {
          id: 6,
          operatorId: 3,
          name: "ТОп за свої гроші",
          cost: 190,
        },
      ],
      operator: {},
      tariff: {},
    };
  },
  methods: {
    getTariff() {
      this.tariff = this.tariffs.find((t) => t.id === Number(this.tariffId));
      if (this.tariffId) {
        this.operator = this.operators.find(
          (op) => op.id === Number(this.tariff.operatorId)
        );
      }
    },
  },
  created() {
    this.getTariff();
  },
  template: `
      <div class="wrapper">
        <h1>{{operator.name}}</h1>
        <h2>{{tariff.name}}</h2>
        <form action="">
            <label for="">
                ВВедите что-то
                <input type="text">
            </label>
            <label for="">
                ВВедите что-то
                <input type="text">
            </label>
            <router-link to="/pay/card" class="tariff_link">
                Оплатити
            </router-link>
        </form>
      </div>
       `,
};

const PayCard = {
  data() {
    return {
      operators: [
        {
          id: 1,
          name: "Vodafone",
        },
        {
          id: 2,
          name: "Kyivstar",
        },
        {
          id: 3,
          name: "Lifecell",
        },
      ],
      tariffs: [
        {
          id: 1,
          operatorId: 2,
          name: "Сімейний",
          cost: 150,
        },
        {
          id: 2,
          operatorId: 1,
          name: "Для бомжей",
          cost: 15,
        },
        {
          id: 3,
          operatorId: 3,
          name: "Средний",
          cost: 75,
        },
        {
          id: 4,
          operatorId: 1,
          name: "Веселий",
          cost: 228,
        },
        {
          id: 5,
          operatorId: 2,
          name: "Інтернет на повну",
          cost: 320,
        },
        {
          id: 6,
          operatorId: 3,
          name: "ТОп за свої гроші",
          cost: 190,
        },
      ],
      operator: {},
      tariff: {},
    };
  },
  methods: {
  },
  created() {
  },
  template: `
      <div class="wrapper">
        <form action="">
            <label for="">
                ВВедите что-то
                <input type="text">
            </label>
            <label for="">
                ВВедите что-то
                <input type="text">
            </label>
            <button type="submit">submit</button>
        </form>
      </div>
       `,
};

const routes = [
  { path: "/", component: Home },
  {
    path: "/operator/:id",
    component: Operator,
    name: "operatorId",
    props: true,
  },
  {
    path: "/pay/:id",
    component: PayPage,
    name: "tariffId",
    props: true,
  },
  {
    path: "/pay/card",
    component: PayCard,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

Vue.createApp({}).use(router).mount("#app");
