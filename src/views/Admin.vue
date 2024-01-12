<script>
import {Modal} from 'bootstrap';
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ADD_PRODUCT_URL = `${API_BASE_URL}v2/api/${API_PATH}/admin/product`;
const EDIT_PRODUCT_URL = `${API_BASE_URL}v2/api/${API_PATH}/admin/product`;

export default {
  components: {Loading, Navbar},
  data() {
    return {
      isLogin: -1,
      page: 'admin',
      accessToken: /accessToken=([^;]+)/.exec(document.cookie) && /accessToken=([^;]+)/.exec(document.cookie)[1],
      addProductData: {
        "data": {
          "title": "精彩關西海陸空５日",
          "category": "京都",
          "origin_price": 60000,
          "price": 45000,
          "unit": "套",
          "description": "精彩關西海陸空５日～浪漫龜岡小火車+大阪水上巴士+有馬空中纜車、環球影城超級任天堂世界+千年名湯有馬溫泉",
          "content": "Konnichiwa！好久不見，日本 在四季分明的日本，關西的四季之美尤其突出。暢遊歡樂的大阪環球影城，好好享受風靡全球的世界級主題樂園。安排前往最能代表京都的世界文化遺產~清水寺與金閣寺，品味京都風采。神戶千年名湯有馬古溫泉散策，浪漫氣氛,品嘗神戶牛、螃蟹美食、搭乘大阪水上巴士，水都大阪巡遊其樂無窮。",
          "is_enabled": 1,
          "imageUrl": "https://i.imgur.com/HimHt5l.jpeg",
          "imagesUrl": [
            "https://i.imgur.com/ZsdQwWS.jpeg",
            "https://i.imgur.com/K8ipZiL.jpeg",
            "https://i.imgur.com/AiDKJ8O.jpeg",
            "https://i.imgur.com/sfsAjP2.jpeg",
          ]
        }
      },
      targetAddProduct: null,
      defaultProducts: {
        "精彩關西海陸空５日": {
          "title": "精彩關西海陸空５日",
          "category": "京都",
          "origin_price": 60000,
          "price": 45000,
          "unit": "套",
          "description": "精彩關西海陸空５日～浪漫龜岡小火車+大阪水上巴士+有馬空中纜車、環球影城超級任天堂世界+千年名湯有馬溫泉",
          "content": "Konnichiwa！好久不見，日本 在四季分明的日本，關西的四季之美尤其突出。暢遊歡樂的大阪環球影城，好好享受風靡全球的世界級主題樂園。安排前往最能代表京都的世界文化遺產~清水寺與金閣寺，品味京都風采。神戶千年名湯有馬古溫泉散策，浪漫氣氛,品嘗神戶牛、螃蟹美食、搭乘大阪水上巴士，水都大阪巡遊其樂無窮。",
          "is_enabled": 1,
          "imageUrl": "/images/日本/京都.jpeg",
          "imagesUrl": [
            "/images/日本/京都-1.jpeg",
            "/images/日本/京都-2.jpeg",
            "/images/日本/京都-3.jpeg",
            "/images/日本/京都-4.jpeg",
          ]
        },
        "陽光沖繩５日": {
          "title": "陽光沖繩５日",
          "category": "沖繩",
          "origin_price": 25000,
          "price": 20000,
          "unit": "套",
          "description": "陽光沖繩５日－古宇利海洋塔、美麗海水族館、瀨長島、福木林道、玉泉洞、單軌電車一日券",
          "content": "沖繩是日本最南端的熱帶島嶼，也是日本人最喜愛的旅遊勝地。沖繩的海水清澈見底，沙灘細膩如絲，是潛水、浮潛的天堂。沖繩的海洋生物豐富，美麗海水族館是世界最大的水族館，有著世界最大的鯊魚缸，是沖繩必去的景點。沖繩的自然風光也是令人讚嘆，古宇利島的海洋塔、福木林道的櫻花、玉泉洞的鐘乳石、瀨長島的海岸線，都是沖繩的絕美風景。沖繩的美食也是令人回味無窮，沖繩燒、冰淇淋、蕎麥麵、海鮮料理，都是沖繩必吃的美食。沖繩的氣候宜人，四季如春，是個適合旅遊的好地方。",
          "is_enabled": 1,
          "imageUrl": "/images/日本/沖繩.jpeg",
          "imagesUrl": [
            "/images/日本/沖繩-1.jpeg",
            "/images/日本/沖繩-2.jpeg",
            "/images/日本/沖繩-3.jpeg",
            "/images/日本/沖繩-4.jpeg",
          ]
        },
        "北海道破冰船５日": {
          "title": "北海道破冰船５日",
          "category": "北海道",
          "origin_price": 50000,
          "price": 45000,
          "unit": "套",
          "description": "北海道破冰船５日-破冰船、雪上活動、冰上釣魚、阿寒湖冰上嘉年華、層雲冰瀑祭、札幌白色燈樹節",
          "content": "Konnichiwa！好久不見，日本在四季分明的日本，北海道的四季之美尤其突出。新鮮的空氣、清晰的藍天、色彩鮮豔盡情奔放的花卉、線條柔和平緩的丘陵、雄偉聳立的山巒、白雪覆蓋如夢似幻， 絢麗浪漫的美景都讓人驚豔；探索北海道四季變化之美，必能成為您心中珍藏的寶貴回憶。讓我們在日本魅力排行榜NO1的北海道展開這個期待已久的日本之旅。",
          "is_enabled": 1,
          "imageUrl": "/images/日本/北海道.jpeg",
          "imagesUrl": [
            "/images/日本/北海道-1.jpeg",
            "/images/日本/北海道-2.jpeg",
            "/images/日本/北海道-3.jpeg",
            "/images/日本/北海道-4.jpeg",
          ]
        },
        "輕井澤富士山三溫泉悠活５日": {
          "title": "輕井澤富士山三溫泉悠活５日",
          "category": "輕井澤",
          "origin_price": 40000,
          "price": 35000,
          "unit": "套",
          "description": "輕井澤富士山三溫泉悠活５日－Laview列車體驗、帝王蟹食べ放題、伊勢龍蝦&海膽生魚片、日式喫茶烤糰子、富士山纜車",
          "content": "輕井澤是東京近郊的度假勝地，輕井澤王子購物中心（輕井澤王子OUTLET）更是許多人到東京自由行規劃輕井澤旅遊時必逛必買的重點行程。而且整個輕井澤Outlet規模超大，各式品牌選擇性很多，環境優美氣氛輕鬆逛起來非常舒服。",
          "is_enabled": 1,
          "imageUrl": "/images/日本/輕井澤.jpeg",
          "imagesUrl": [
            "/images/日本/輕井澤-1.jpeg",
            "/images/日本/輕井澤-2.jpeg",
            "/images/日本/輕井澤-3.jpeg",
            "/images/日本/輕井澤-4.jpeg",
          ]
        },
      },
      products: [],
      editTargetProduct: null,
      viewTargetImage: null,
      getProductsSuccess: 0,
    }
  },
  created() {
    if (!this.accessToken) {
      alert('請先登入!');
      window.location.href = '/';
    }
    this.$axios.defaults.headers.common.authorization = this.accessToken;
    this.checkUserStatus();
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      this.$axios.get(`${API_BASE_URL}v2/api/${API_PATH}/admin/products/all`).then((res) => {
        this.products = res.data.products;
        this.getProductsSuccess = 1;
      }).catch((err) => {
        console.log(err);
        this.getProductsSuccess = -1;
      })
    },
    submitAddProduct(e) {
      const btn = e.target;
      btn.disabled = true;
      this.$axios.post(ADD_PRODUCT_URL, this.addProductData).then((res) => {
        if (res.data.success === true) {
          alert('新增成功!');
          window.location.reload();
        } else {
          alert('新增失敗!');
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    submitEditProduct(e) {
      const btn = e.target;
      btn.disabled = true;
      this.editTargetProduct.origin_price = parseInt(this.editTargetProduct.origin_price);
      this.editTargetProduct.price = parseInt(this.editTargetProduct.price);
      const data = {
        "data": this.editTargetProduct,
      }
      this.$axios.put(`${EDIT_PRODUCT_URL}/${this.editTargetProduct.id}`, data).then((res) => {
        if (res.data.success === true) {
          alert('編輯成功!');
          window.location.reload();
        } else {
          alert('編輯失敗!');
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    editProduct(id) {
      this.editTargetProduct = this.products[id];
    },
    checkUserStatus() {
      this.isLogin = 0;
      this.$axios.post(`${API_BASE_URL}v2/api/user/check`).then(() => {
        this.isLogin = 1;
      }).catch((err) => {
        console.log(err);
        alert('請重新登入!')
        this.isLogin = -1;
        window.location.href = '/';
      })
    },
    selectProduct(e) {
      if (e.target.value !== '選擇新增產品模板') {
        this.addProductData.data = this.defaultProducts[e.target.value];
      }
    },
    viewImage(e) {
      this.viewTargetImage = e.target.src;
      let myModal = new Modal(document.getElementById('viewImageModal'));
      myModal.show();
    }
  }
}
</script>

<template>
  <Navbar :login-status=isLogin :page="page"></Navbar>
  <div class="container mt-5" v-if="isLogin === 1">
    <div class="row mt-3">
      <div class="col-auto">
        <h1>Admin</h1>
      </div>
    </div>
    <div class="row justify-content-start mb-5 mt-3" v-if="getProductsSuccess">
      <!-- tab nav-link -->
      <div class="col-2">
        <div class="d-flex align-items-start">
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
                    type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
              <font-awesome-icon icon="fa-solid fa-suitcase"/>&nbsp;
              產品列表
            </button>
            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile"
                    type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
              Other Tab1
            </button>
            <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages"
                    type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
              Other Tab2
            </button>
            <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings"
                    type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
              Other Tab3
            </button>
          </div>
        </div>
      </div>
      <!-- nav-tab -->
      <div class="col-10">
        <div class="row mb-3 justify-content-end">
          <div class="col-auto">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
              新增產品
            </button>
          </div>
        </div>
        <div class="row mb-3">
          <div class="tab-content" id="v-pills-tabContent">
            <!-- Product Tab -->
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
              <!-- Product List -->
              <div class="table-responsive">
                <!-- Product Data -->
                <table class="table table-hover table-bordered">
                  <thead>
                  <tr class="text-nowrap">
                    <th>Edit</th>
                    <!--                    <th>產品ID</th>-->
                    <th>產品名稱</th>
                    <th>產品類別</th>
                    <th>產品原價</th>
                    <th>產品售價</th>
                    <th>產品單位</th>
                    <th>產品描述</th>
                    <th>產品內容</th>
                    <th>產品上架</th>
                    <th>產品主圖</th>
                    <th>其他圖片1</th>
                    <th>其他圖片2</th>
                    <th>其他圖片3</th>
                    <th>其他圖片4</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(product, id) in products" :key="product.id">
                    <td>
                      <button type="button" class="btn btn-secondary text-nowrap" data-bs-toggle="modal"
                              :id="'id-edit-btn_' + id" data-bs-target="#editProductModal"
                              @click="editProduct(id)">
                        <font-awesome-icon icon="fa-solid fa-edit"/>
                      </button>
                    </td>
                    <!--                    <td>{{ id.slice(0, 5) }}...</td>-->
                    <td class="text-nowrap">{{ product.title }}</td>
                    <td>{{ product.category }}</td>
                    <td class="text-nowrap">NT$ {{ product.origin_price.toLocaleString() }}</td>
                    <td class="text-nowrap">NT$ {{ product.price.toLocaleString() }}</td>
                    <td>{{ product.unit }}</td>
                    <td>{{ product.description.slice(0, 10) }}...</td>
                    <td>{{ product.content.slice(0, 20) }}...</td>
                    <td>
                      <template v-if="product.is_enabled !== 0">
                        <span class="text-white bg-success px-2 py-1" style="border-radius: 5px;">啟用</span>
                      </template>
                      <template v-else>
                        <span class="text-white bg-secondary px-2 py-1" style="border-radius: 5px;">未啟用</span>
                      </template>
                    </td>
                    <td>
                      <template v-if="product.imageUrl">
                        <img :src="product.imageUrl" alt="" class="img-preview" @click="viewImage">
                      </template>
                    </td>
                    <td>
                      <template v-if="product.imagesUrl[0]">
                        <img :src="product.imagesUrl[0]" alt="" class="img-preview" @click="viewImage">
                      </template>
                    </td>
                    <td>
                      <template v-if="product.imagesUrl[1]">
                        <img :src="product.imagesUrl[1]" alt="" class="img-preview" @click="viewImage">
                      </template>
                    </td>
                    <td>
                      <template v-if="product.imagesUrl[2]">
                        <img :src="product.imagesUrl[2]" alt="" class="img-preview" @click="viewImage">
                      </template>
                    </td>
                    <td>
                      <template v-if="product.imagesUrl[3]">
                        <img :src="product.imagesUrl[3]" alt="" class="img-preview" @click="viewImage">
                      </template>
                    </td>
                    <td>
                      <button type="button" class="btn btn-danger" @click="deleteProduct">
                        <font-awesome-icon icon="fa-solid fa-trash"/>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>

              </div>
            </div>

            <!-- Other Tab1 -->
            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...
            </div>

            <!-- Other Tab2 -->
            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...
            </div>

            <!-- Other Tab3 -->
            <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-start mb-5 mt-3" v-else-if="getProductsSuccess === 0">
      <Loading />
    </div>
    <div class="row justify-content-start mb-5 mt-3" v-else>
      <h1>API Server Error</h1>
    </div>
  </div>
  <div class="container" v-else>
    <Loading/>
  </div>

  <!-- Add Product Modal -->
  <div class="modal fade" id="addProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="addProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <form id="add-product" action="#" method="post">
              <div class="container">
                <div class="row mb-3">
                  <div class="col-auto">
                    <label for="id-default-product-select" class="col-form-label">產品模板</label>
                  </div>
                  <div class="col">
                    <select class="form-select" aria-label="Default select example"
                            name="default-product-select" id="id-default-product-select"
                            @change="selectProduct">
                      <option selected>選擇新增產品模板</option>
                      <option v-for="(obj, title) in defaultProducts" :key="obj.id"
                              :value="obj.id">{{ title }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- 產品名稱 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-title" class="form-label">產品名稱</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-title" placeholder="請輸入產品名稱"
                           v-model="addProductData.data.title">
                  </div>
                </div>
                <!-- 產品類別 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-category" class="form-label">產品類別</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-category" placeholder="請輸入產品類別"
                           v-model="addProductData.data.category">
                  </div>
                </div>
                <!-- 產品原價 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-origin_price" class="form-label">產品原價</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-origin_price" placeholder="請輸入產品原價"
                           v-model="addProductData.data.origin_price">
                  </div>
                </div>
                <!-- 產品售價 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-price" class="form-label">產品售價</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-price" placeholder="請輸入產品類別"
                           v-model="addProductData.data.price">
                  </div>
                </div>
                <!-- 產品單位 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-unit" class="form-label">產品單位</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-unit" placeholder="請輸入產品單位"
                           v-model="addProductData.data.unit">
                  </div>
                </div>
                <!-- 產品描述 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-description" class="form-label">產品描述</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-description" placeholder="請輸入產品描述"
                           v-model="addProductData.data.description">
                  </div>
                </div>
                <!-- 產品內容 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-content" class="form-label">產品內容</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-content" placeholder="請輸入產品內容"
                           v-model="addProductData.data.content">
                  </div>
                </div>
                <!-- 產品上架 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-is_enabled" class="form-label">產品上架</label>
                  </div>
                  <div class="col">
                    <input class="form-check-input" type="checkbox" id="id-product-is_enabled"
                           v-model="addProductData.data.is_enabled">
                  </div>
                </div>
                <!-- 產品圖片 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imageUrl" class="form-label">產品主圖</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imageUrl" placeholder="請輸入產品主圖"
                           v-model="addProductData.data.imageUrl">
                  </div>
                </div>
                <!-- 其他圖片1 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-1" class="form-label">其他圖片1</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-1" placeholder="請輸入其他圖片1"
                           v-model="addProductData.data.imagesUrl[0]">
                  </div>
                </div>
                <!-- 其他圖片2 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-2" class="form-label">其他圖片2</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-2" placeholder="請輸入其他圖片2"
                           v-model="addProductData.data.imagesUrl[1]">
                  </div>
                </div>
                <!-- 其他圖片3 -->
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-3" class="form-label">其他圖片3</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-3" placeholder="請輸入其他圖片3"
                           v-model="addProductData.data.imagesUrl[2]">
                  </div>
                </div>
                <!-- 其他圖片4 -->
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

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="id-submit-btn" @click.prevent="submitAddProduct">Add
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Product Modal -->
  <div class="modal fade" id="editProductModal" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="editProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" v-if="editTargetProduct">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="editProductModalLabel">Edit Product: {{ editTargetProduct.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <form id="add-product" action="#" method="post">
              <div class="container">

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-title" class="form-label">產品名稱</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-title" placeholder="請輸入產品名稱"
                           v-model="editTargetProduct.title">
                  </div>
                </div>
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-category" class="form-label">產品類別</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-category" placeholder="請輸入產品類別"
                           v-model="editTargetProduct.category">
                  </div>
                </div>
                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-origin_price" class="form-label">產品原價</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-origin_price" placeholder="請輸入產品原價"
                           v-model="editTargetProduct.origin_price">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-price" class="form-label">產品售價</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-price" placeholder="請輸入產品類別"
                           v-model="editTargetProduct.price">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-unit" class="form-label">產品單位</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-unit" placeholder="請輸入產品單位"
                           v-model="editTargetProduct.unit">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-description" class="form-label">產品描述</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-description" placeholder="請輸入產品描述"
                           v-model="editTargetProduct.description">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-content" class="form-label">產品內容</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-content" placeholder="請輸入產品內容"
                           v-model="editTargetProduct.content">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-is_enabled" class="form-label">產品上架</label>
                  </div>
                  <div class="col">
                    <input class="form-check-input" type="checkbox" id="id-product-is_enabled"
                           v-model="editTargetProduct.is_enabled">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imageUrl" class="form-label">產品主圖</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imageUrl" placeholder="請輸入產品主圖"
                           v-model="editTargetProduct.imageUrl">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-1" class="form-label">其他圖片1</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-1" placeholder="請輸入其他圖片1"
                           v-model="editTargetProduct.imagesUrl[0]">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-2" class="form-label">其他圖片2</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-2" placeholder="請輸入其他圖片2"
                           v-model="editTargetProduct.imagesUrl[1]">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-3" class="form-label">其他圖片3</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-3" placeholder="請輸入其他圖片3"
                           v-model="editTargetProduct.imagesUrl[2]">
                  </div>
                </div>

                <div class="row align-items-center mb-3">
                  <div class="col-auto">
                    <label for="id-product-imagesUrl-4" class="form-label">其他圖片4</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" id="id-product-imagesUrl-4" placeholder="請輸入其他圖片4"
                           v-model="editTargetProduct.imagesUrl[3]">
                  </div>
                </div>

              </div>
            </form>

          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="id-submit-btn" @click.prevent="submitEditProduct">Edit
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- View Image Modal -->
  <div class="modal fade" id="viewImageModal" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="viewImageModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" v-if="viewTargetImage">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="editProductModalLabel">View Image: </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="viewTargetImage" alt="" class="img-fluid" width="100%">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.img-preview {
  cursor: zoom-in;
}
</style>