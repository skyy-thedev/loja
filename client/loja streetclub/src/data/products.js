// src/data/products.js
import camisetaImg from '../assets/camiseta.jpg'

const products = [
    {
      id: 1,
      name: 'Camiseta Devil Persona',
      color: 'branco',
      type: 'camiseta',
      price: 89.90,
      oldPrice: 119.90,
      description: "Camiseta 100% algodão, confortável e moderna produzida pelo artista e graffiteiro GrowArt em parceria com a StreetClub.",
      image: camisetaImg,
      promo: true,
      stock: {
        P: true,
        M: false,
        G: true,
        GG: true
      },
    },
    {
      id: 2,
      name: 'Cap StreetClub',
      color: 'vermelho',
      type: 'cap',
      price: 59.90,
      oldPrice: 89.90,
      description: "Boné aba reta, streetwear vermelho e preto.",
      image: 'https://http2.mlstatic.com/D_NQ_NP_642083-MLB78033545357_072024-O-bone-five-panel-molotov-fogo-streetwear-skatista-aba-reta.webp',
      promo: true,
    },
    {
      id: 3,
      name: 'Cap Premium StreetClub',
      color: 'branco',
      type: 'cap',
      price: 149.90,
      oldPrice: 199.90,
      description: "Boné aba reta, streetwear preto e branco. Design Premium",
      image: 'https://http2.mlstatic.com/D_997647-MLB81823469866_012025-O.jpg',
      promo: true,
    },
    {
      id: 4,
      name: 'Cap EasyMoney',
      color: 'branco',
      type: 'cap',
      price: 249.90,
      oldPrice: '',
      description: "Boné aba reta, streetwear preto e branco. Design Premium",
      image: 'https://a-static.mlcdn.com.br/1500x1500/bone-streetwear-five-panel-dinheiro-aba-reta-ajuste-traseiro-anth-co/youngcommercez/ia116-bege/4ecc91eef1a048cfc027b625fa6353a7.jpeg',
      promo: false,
    },
    {
      id: 5,
      name: 'Camiseta Hippest ',
      color: 'branca',
      type: 'camiseta',
      price: 119.90,
      oldPrice: '',
      description: "Camiseta 100% algodão, confortável e moderno da Hippest.",
      image: 'https://acdn-us.mitiendanube.com/stores/001/886/076/products/20220703_161757-copiar1-d70471e86a3192a09016571379383997-1024-1024.jpg',
      promo: false,
      stock: {
        P: false,
        M: true,
        G: false,
        GG: true
      },
    },
    {
      id: 6,
      name: 'Bermuda StreetClub',
      color: 'preto',
      type: 'bermuda',
      price: 89.90,
      oldPrice: '',
      description: "Bermuda cargo, design street e moderno by StreetClub.",
      image: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8mfjv0ynto101',
      promo: false,
      stock: {
        P: true,
        M: true,
        G: true,
        GG: true
      },
    },
  ];
  
  export default products;  