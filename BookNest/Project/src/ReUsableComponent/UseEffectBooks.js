import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import GoogleBooks from "../API/GoogleBooks";

export const useBookDetail = (bookId) => {
  const { addToCart, toggleButton } = useContext(CartContext);
  const [book, setBook] = useState(null);
  const [customizedData, setCustomizedData] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const bookData = await GoogleBooks.getBook(bookId);

        const customized = {
          id: bookData.id,
          title: bookData.volumeInfo.title || "Unknown Title",
          authors: bookData.volumeInfo.authors?.join(", ") || "Unknown Author",
          price: bookData.saleInfo?.listPrice?.amount || "FREE",
          quantity: 1,
          totalPrice: bookData.saleInfo?.listPrice?.amount || "FREE",
        };
        setCustomizedData(customized);
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    getBookDetails();
  }, [bookId]);

  return { addToCart, book, customizedData, toggleButton };
};

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GoogleBooks.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return { books };
};
