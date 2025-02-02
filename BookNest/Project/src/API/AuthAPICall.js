import authApi from "../API/APIClient";

export const getCustomAPI = async (
  user,
  cart,
  setCheckoutData,
  setLocation,
  setOrder,
  grandTotal
) => {
  const { data } = await authApi.get(`/getClient/${user.sub}`);
  if (data.address != "") {
    const checkoutObject = {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      mobileNumber: data.mobileNumber,
      address: data.address,
      books: cart.map(({ totalPrice, price, ...rest }) => ({
        ...rest,
        price: price === "FREE" ? 0 : price,
      })),
      totalPrice: grandTotal,
      date: getTodayDate(),
    };
    setCheckoutData(checkoutObject);
    setLocation(true);
  } else {
    setLocation(false);
  }
  setOrder(true);
};

export const postCustomAPI = async (checkoutData, user) => {
  const jsonData = {
    date: checkoutData.date,
    totalPrice: checkoutData.totalPrice,
    books: checkoutData.books,
  };
  const response = await authApi.post(`/postOrder/${user.sub}`, jsonData);
  console.log(response.status);
};

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
