<script>
import axios from 'axios';
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
export default {
  components: {Loading, Navbar},
  props: {
    loginStatus: {
      type: Number,
      default: -1,
    },
    _class: {
      type: String,
      default: "nav-link disabled",
    }
  },
  data() {
    return {
      isLogin: this.loginStatus,
      page: 'admin',
      token: document.cookie.split(';')[0].split('=')[1],
      addProductURL: `${API_BASE_URL}v2/api/${API_PATH}/admin/product`,
      addProductData: {
        "data": {
          "title": "[賣]動物園造型衣服3",
          "category": "衣服2",
          "origin_price": 100,
          "price": 300,
          "unit": "個",
          "description": "Sit down please 名設計師設計",
          "content": "這是內容",
          "is_enabled": 1,
          "imageUrl": "主圖網址",
          "imagesUrl": [
            "圖片網址一",
            "圖片網址二",
            "圖片網址三",
            "圖片網址四",
            "圖片網址五"
          ]
        }
      }
    }
  },
  created() {
    if (this.token) {
      axios.defaults.headers.common.authorization = this.token;
      this.checkUserStatus();
    }
  },
  methods: {
    addProduct() {
      const formData = new FormData(document.querySelector('#add-product'));
      console.log(formData)
      console.log(this.addProductData)
      // axios.post(this.addProductURL, this.addProductData).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // })
    },
    checkUserStatus() {
      this.isLogin = 0;
      axios.post(`${API_BASE_URL}v2/api/user/check`).then(() => {
        this.isLogin = 1;
      }).catch((err) => {
        console.log(err);
        alert('請重新登入!')
        this.isLogin = -1;
        window.location.href = '/';
      })
    },
  }
}
</script>

<template>
  <Navbar :login-status=isLogin :page="page" :_class="_class"></Navbar>
  <div class="container" v-if="isLogin === 1">
    <div class="row">
      <div class="col-3">

      </div>
      <div class="col-3">
        <button class="btn btn-primary" @click.prevent="addProduct()">新增產品</button>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
          新增產品
        </button>
      </div>
    </div>
  </div>
  <div class="container" v-else-if="isLogin === 0">
   <Loading />
  </div>
  <div class="container" v-else>
    <h1>請先登入</h1>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="addProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="add-product" action="#" method="post">
            <div class="container">
              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-title" class="form-label">產品名稱</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-title" placeholder="請輸入產品名稱"
                         v-model="addProductData.data.title">
                </div>
              </div>
              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-category" class="form-label">產品類別</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-category" placeholder="請輸入產品類別"
                         v-model="addProductData.data.category">
                </div>
              </div>
              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-origin_price" class="form-label">產品原價</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-origin_price" placeholder="請輸入產品原價"
                         v-model="addProductData.data.origin_price">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-price" class="form-label">產品售價</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-price" placeholder="請輸入產品類別"
                         v-model="addProductData.data.price">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-unit" class="form-label">產品單位</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-unit" placeholder="請輸入產品單位"
                         v-model="addProductData.data.unit">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-description" class="form-label">產品描述</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-description" placeholder="請輸入產品描述"
                         v-model="addProductData.data.description">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-content" class="form-label">產品內容</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-content" placeholder="請輸入產品內容"
                         v-model="addProductData.data.content">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-is_enabled" class="form-label">產品上架</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-is_enabled" placeholder="請輸入產品上架"
                         v-model="addProductData.data.is_enabled">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-imageUrl" class="form-label">產品主圖</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-imageUrl" placeholder="請輸入產品主圖"
                         v-model="addProductData.data.imageUrl">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-imagesUrl-1" class="form-label">其他圖片1</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-imagesUrl-1" placeholder="請輸入其他圖片1"
                         v-model="addProductData.data.imagesUrl[0]">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-imagesUrl-2" class="form-label">其他圖片2</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-imagesUrl-2" placeholder="請輸入其他圖片2"
                         v-model="addProductData.data.imagesUrl[1]">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-imagesUrl-3" class="form-label">其他圖片3</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-imagesUrl-3" placeholder="請輸入其他圖片3"
                         v-model="addProductData.data.imagesUrl[2]">
                </div>
              </div>

              <div class="row align-items-center mb-3">
                <div class="col-auto">
                  <label for="id-product-imagesUrl-4" class="form-label">其他圖片4</label>
                </div>
                <div class="col">
                  <input type="text" class="form-control" id="id-product-imagesUrl-4" placeholder="請輸入其他圖片4"
                         v-model="addProductData.data.imagesUrl[3]">
                </div>
              </div>

            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click.prevent="addProduct">Add</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>