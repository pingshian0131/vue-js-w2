<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default {
  components: {Navbar},
  props: {
    loginStatus: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      isLogin: this.loginStatus,
      page: 'product',
      token: /; token=([^;]+)/.exec(document.cookie) && /; token=([^;]+)/.exec(document.cookie)[1],
      products: [
        {
          category: "甜甜圈",
          content: "尺寸：14x14cm",
          description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
          id: "-L9tH8jxVb2Ka_DYPwng",
          is_enabled: 1,
          origin_price: 150,
          price: 99,
          title: "草莓莓果夾心圈",
          unit: "個",
          num: 10,
          imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
          imagesUrl: [
            "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
            "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
          ]
        },
        {
          category: "蛋糕",
          content: "尺寸：6寸",
          description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
          id: "-McJ-VvcwfN1_Ye_NtVA",
          is_enabled: 16,
          origin_price: 1000,
          price: 900,
          title: "蜂蜜檸檬蛋糕",
          unit: "個",
          num: 1,
          imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
          imagesUrl: [
            "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
          ]
        },
        {
          category: "蛋糕",
          content: "尺寸：6寸",
          description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
          id: "-McJ-VyqaFlLzUMmpPpm",
          is_enabled: 1,
          origin_price: 700,
          price: 600,
          title: "暗黑千層",
          unit: "個",
          num: 15,
          imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
          imagesUrl: [
            "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
            "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
          ]
        }
      ],
      productsMap: {},
      targetProduct: null,
    }
  },
  created() {
    if (this.token) {
      axios.defaults.headers.common.authorization = this.token;
      this.checkUserStatus();
    }
    this.products.forEach((item, index) => {
      this.productsMap[item.id] = item;
    })
  },
  methods: {
    displayProduct(productId) {
      this.targetProduct = this.productsMap[productId];
    },
    checkUserStatus() {
      this.isLogin = 0;
      axios.post(`${API_BASE_URL}v2/api/user/check`).then(() => {
        this.isLogin = 1;
      }).catch((err) => {
        console.log(err);
        this.isLogin = -1;
      })
    },
  }
}
</script>

<template>
  <Navbar :login-status=isLogin :page="page"></Navbar>
  <div class="container">
    <div class="row py-3">
      <div class="col-md-6" id="product-list">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4">
          <thead>
          <tr>
            <th width="150">產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="150">
              是否啟用
            </th>
            <th width="120">
              查看細節
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products" :key="product.id">
            <td width="150">{{ product.title }}</td>
            <td width="120">
              {{ product.origin_price }}
            </td>
            <td width="120">
              {{ product.price }}
            </td>
            <td width="150">
              <template v-if="product.is_enabled !== 0">
                <span class="text-success">啟用</span>
              </template>
              <template v-else>
                <span>未啟用</span>
              </template>
            </td>
            <td width="120">
              <button type="button" class="btn btn-primary" @click="displayProduct(product.id)">查看細節</button>
            </td>
          </tr>
          </tbody>
        </table>
        <p>目前有 <span>{{ products.length }}</span> 項產品</p>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <template v-if="targetProduct">
          <div class="card mb-3">
            <img :src="targetProduct.imageUrl" class="card-img-top primary-image" alt="主圖">
            <div class="card-body">
              <h5 class="card-title">
                {{ targetProduct.title }}
                <span class="badge bg-primary ms-2">{{ targetProduct.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ targetProduct.description }}</p>
              <p class="card-text">商品內容：{{ targetProduct.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ }}</p>
                <p class="card-text text-secondary">
                  <del>{{ targetProduct.origin_price }}</del>
                </p>
                元 / {{ targetProduct.price }}
              </div>
            </div>
          </div>
          <template v-for="(detailImageUrl, id) in targetProduct.imagesUrl" :key="id">
            <img :src="detailImageUrl" alt="" class="images m-2">
          </template>
        </template>
        <template v-else>
          <p class="text-secondary">請選擇一個商品查看</p>
        </template>
      </div>
    </div>
  </div>

</template>
