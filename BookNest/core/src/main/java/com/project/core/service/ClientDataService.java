package com.project.core.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.core.bean.AuthRequest;
import com.project.core.bean.BookDetails;
import com.project.core.bean.BookOrderDTO;
import com.project.core.bean.ClientDataBean;
import com.project.core.bean.ClientDetailsBean;
import com.project.core.bean.OrderBook;
import com.project.core.bean.OrderBooks;
import com.project.core.jwt.JWTService;
import com.project.core.repository.BookDetailsRepository;
import com.project.core.repository.ClientDataRepository;
import com.project.core.repository.ClientDetailsRepository;
import com.project.core.repository.OrderBookRepository;

@Service
public class ClientDataService {

  @Autowired
  ClientDataRepository clientDataRepository;

  @Autowired
  ClientDetailsRepository clientDetailsRepository;

  @Autowired
  BookDetailsRepository bookDetailsRepository;

  @Autowired
  OrderBookRepository orderBookRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JWTService jwtService;

  public boolean insertClientData(ClientDataBean clientDataBean) throws RuntimeException {
    Optional.ofNullable(clientDataBean)
        .filter(bean -> !clientDataBean.getClientEmail().isEmpty()
            && !clientDataBean.getClientPassword().isEmpty() && !clientDataBean.getClientName().isEmpty())
        .orElseThrow(() -> new RuntimeException("Client details cannot be empty"));

    return Optional.ofNullable(clientDataBean.getClientEmail())
        .filter(email -> !clientDataRepository.existsByClientEmail(email))
        .flatMap(email -> {
          clientDataBean.setClientPassword(passwordEncoder.encode(clientDataBean.getClientPassword()));
          clientDataRepository.save(clientDataBean);
          return Optional.of(true);
        })
        .orElse(false);
  }

  public String verifyClient(AuthRequest authRequest) {
    Authentication authentication = authenticationManager
        .authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getAuthUser(), authRequest.getAuthPassword()));
    if (authentication.isAuthenticated()) {
      return jwtService.generateToken(authRequest.getAuthUser());
    } else {
      throw new UsernameNotFoundException("Invalid user request!");
    }
  }

  public ClientDataBean returnClientDataBean(String clientEmail) {
    ClientDataBean clientDataBean = clientDataRepository.findByClientEmail(clientEmail);
    return clientDataBean;
  }

  public boolean updateClientDetails(String clientEmail, ClientDetailsBean clientDetailsBean) {
    try {
      ClientDataBean clientDataBean = Optional.ofNullable(returnClientDataBean(clientEmail))
          .orElseThrow(() -> new UsernameNotFoundException("email not found!"));

      ClientDetailsBean clientDetailsBeanSave = Optional.ofNullable(clientDetailsRepository
          .findByClientDataBean_ClientId(clientDataBean.getClientId()))
          .map(existingDetails -> {
            existingDetails.setGender(clientDetailsBean.getGender());
            existingDetails.setMobileNumber(clientDetailsBean.getMobileNumber());
            existingDetails.setAddress(clientDetailsBean.getAddress());
            existingDetails.setClientDataBean(clientDataBean);
            return existingDetails;
          })
          .orElseGet(() -> {
            clientDetailsBean.setClientDataBean(clientDataBean);
            return clientDetailsBean;
          });
      clientDetailsRepository.save(clientDetailsBeanSave);
      return true;
    } catch (Exception e) {
      throw new UsernameNotFoundException("Invalid user request!", e);
    }
  }

  public ClientDetailsBean getClientDetail(String clientEmail) {
    ClientDataBean clientDataBean = Optional.ofNullable(returnClientDataBean(clientEmail))
        .orElseThrow(() -> new UsernameNotFoundException("user not found"));
    ClientDetailsBean existingDetails = Optional.ofNullable(clientDetailsRepository
        .findByClientDataBean_ClientId(clientDataBean.getClientId()))
        .orElse(null);
    return existingDetails;
  }

  public boolean SaveOrder(String clientEmail, BookOrderDTO bookOrderDTO) {
    try {
      ClientDataBean clientDataBean = returnClientDataBean(clientEmail);

      OrderBook orderBook = new OrderBook();
      orderBook.setClientDataBean(clientDataBean);
      orderBook.setTotalPrice(bookOrderDTO.getTotalPrice());
      orderBook.setPaymentMethod(bookOrderDTO.getPaymentMethod());
      orderBook.setDate(bookOrderDTO.getDate());

      List<OrderBooks> orderBooksList = new ArrayList<>();
      for (BookDetails bookDTO : bookOrderDTO.getBooks()) {
        BookDetails book = bookDetailsRepository.findById(bookDTO.getId())
            .orElseGet(() -> bookDetailsRepository.save(bookDTO));

        OrderBooks orderBooks = new OrderBooks();
        orderBooks.setOrderBook(orderBook);
        orderBooks.setBookDetails(book);
        orderBooks.setQuantity(bookDTO.getQuantity());
        orderBooksList.add(orderBooks);
      }
      orderBook.setOrderBooks(orderBooksList);
      orderBookRepository.save(orderBook);
      return true;
    } catch (Exception e) {
      System.out.println(e);
    }
    return false;
  }
}
