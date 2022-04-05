const urlProducts = 'https://fakestoreapi.com/products';

import { createStore } from 'vuex'
export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {

    loadProducts(state, products) {
      state.products = products
    },

    loadBag(state, products) {
      state.productsInBag = products
    },

    addProductInBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },

    removeProductFromBag(state, product) {
      state.productsInBag = state.productsInBag.filter((item) => item.id != product.id);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    }

  },
  actions: {

    loadProducts({ commit }) {
      fetch(urlProducts)
        .then(res => res.json())
        .then(data => {
          commit('loadProducts', data);
        }
        )
    },

    loadBag({commit}){
      if(localStorage.getItem('productsInBag')){
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')))
      }
    },

    addProductInBag({ commit }, product) {
      commit('addProductInBag', product);
    },

    removeProductFromBag({ commit }, product) {
      if (confirm("Are you sure you want remove product from bag?")) {        
        commit('removeProductFromBag', product);
      }
    }

  },
  modules: {
  }
})
