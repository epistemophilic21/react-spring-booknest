import authApi from "../API/APIClient";

export const getCustomAPI = async (
  user,
  cart,
  setCheckoutData,
  setLocation,
  setOrder,
  grandTotal
) => {
  try {
    if (!user?.sub) {
      throw new Error("User session not available");
    }

    const { data } = await authApi.get(`/getClient/${user.sub}`);
    const hasAddress = Boolean(String(data?.address ?? "").trim());

    if (hasAddress) {
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
    return { ok: true };
  } catch (error) {
    console.error("Error preparing checkout:", error);
    setOrder(false);
    return { ok: false, error };
  }
};

export const postCustomAPI = async (checkoutData, user) => {
  const jsonData = {
    date: checkoutData.date,
    totalPrice: checkoutData.totalPrice,
    books: checkoutData.books,
    paymentMethod: checkoutData.paymentMethod,
  };
  const response = await authApi.post(`/postOrder/${user.sub}`, jsonData);
  return response;
};

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const getClientProfile = async (user, userData, setIsEditing) => {
  try {
    await authApi.put(`/update/${user.sub}`, userData);
    alert("Profile updated successfully!");
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
