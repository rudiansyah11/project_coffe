document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Italia", img: "product1.jpg", price: 45000 },
      { id: 2, name: "Cappucino Thailand", img: "product2.jpg", price: 35000 },
      { id: 3, name: "Black Main", img: "product3.jpg", price: 25000 },
      { id: 4, name: "Arabic Blend", img: "product4.jpg", price: 35000 },
      { id: 5, name: "Gayo Kalimantan", img: "product5.jpg", price: 30000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    fungsiTambah(newItem) {
      // cek terlebih dahulu apakah barang yg dimasukan sudah ada di cart?
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        // ketika ingin di masukan, kita atur paksa data quantity dan totalnya
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    fungsiRemove(id) {
      // ambil item data yg mau di apus berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // kita cari satu persatu
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  let allFilled = true; // flag to check if all fields are filled

  for (let i = 0; i < form.elements.length; i++) {
    // Skip checking hidden inputs
    if (
      form.elements[i].type !== "hidden" &&
      form.elements[i].type !== "submit"
    ) {
      if (form.elements[i].value.trim() === "") {
        allFilled = false;
        break;
      }
    }
  }

  if (allFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("disabled");
  }
});

// const checkoutButton = document.querySelector(".checkout-button");
// checkoutButton.disabled = true;

// const form = document.querySelector("#checkoutForm");

// form.addEventListener("keyup", function () {
//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.length !== 0) {
//       checkoutButton.classList.remove("disabled");
//       checkoutButton.classList.add("disabled");
//     } else {
//       return false;
//     }
//   }

//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove("disabled");
// });

// submit form
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);

  //   console.log(objData);
  //   const message = formatMessage(objData);
  //   window.open("http://wa.me/NO WA?text=" + encodeURIComponent(message));

  // kirim dulu ke endpoint backend untuk mendapatkan tokennya.
  try {
    const response = await fetch("backend/order.php", {
      method: "POST",
      body: data,
    });

    const token = await response.text();
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// format pesan wa
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}

    Pesanan:
    ${JSON.parse(obj.items).map(
      (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)} ) \n`
    )}
    TOTAL: ${rupiah(obj.total)}

    Terima Kasih.`;
};

// konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
