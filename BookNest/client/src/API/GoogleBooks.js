import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const fetchGoogleBookData = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status != 200) {
      throw new Error("FAILED");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllBooks = async () => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=marvel&key=${API_KEY}`;
  const data = await fetchGoogleBookData(url);
  return data.items;
};

const getBook = async (id) => {
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
  const data = await fetchGoogleBookData(url);
  return data;
};

export default {
  getAllBooks,
  getBook,
};
