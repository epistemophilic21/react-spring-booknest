package com.project.core.service;

import java.util.ArrayList;
import java.util.List;

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
    System.out.println(clientDataBean.toString());
    if (clientDataBean.getClientEmail().isEmpty() || clientDataBean.getClientPassword().isEmpty()
        || clientDataBean.getClientName().isEmpty()) {
      throw new RuntimeException();
    }
    if (!clientDataRepository.existsByClientEmail(clientDataBean.getClientEmail())) {
      clientDataBean.setClientPassword(passwordEncoder.encode(clientDataBean.getClientPassword()));
      clientDataRepository.save(clientDataBean);
      return true;
    }
    return false;
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

  // * COMMON METHOD ::
  public ClientDataBean returnClientDataBean(String clientEmail) {
    ClientDataBean clientDataBean = clientDataRepository.findByClientEmail(clientEmail);
    return clientDataBean;
  }

  public boolean updateClientDetails(String clientEmail, ClientDetailsBean clientDetailsBean) {
    try {
      ClientDataBean clientDataBean = returnClientDataBean(clientEmail);
      if (clientDataBean == null) {
        throw new UsernameNotFoundException("Client with email " + clientEmail + " not found.");
      }
      if (clientDetailsRepository.existsByClientDataBean_ClientId(clientDataBean.getClientId())) {
        ClientDetailsBean existingDetails = clientDetailsRepository
            .findByClientDataBean_ClientId(clientDataBean.getClientId());
        existingDetails.setGender(clientDetailsBean.getGender());
        existingDetails.setMobileNumber(clientDetailsBean.getMobileNumber());
        existingDetails.setAddress(clientDetailsBean.getAddress());
        existingDetails.setClientDataBean(clientDataBean);
        clientDetailsRepository.save(existingDetails);
      } else {
        clientDetailsBean.setClientDataBean(clientDataBean);
        clientDetailsRepository.save(clientDetailsBean);
      }
      return true;

    } catch (Exception e) {
      throw new UsernameNotFoundException("Invalid user request!", e);
    }
  }

  public ClientDetailsBean getClientDetail(String clientEmail) {
    ClientDataBean clientDataBean = returnClientDataBean(clientEmail);
    if (clientDataBean == null) {
      throw new UsernameNotFoundException("Client with email " + clientEmail + " not found.");
    }
    if (clientDetailsRepository.existsByClientDataBean_ClientId(clientDataBean.getClientId())) {
      ClientDetailsBean existingDetails = clientDetailsRepository
          .findByClientDataBean_ClientId(clientDataBean.getClientId());
      return existingDetails;
    }
    return null;
  }

  public boolean SaveOrder(String clientEmail, BookOrderDTO bookOrderDTO) {
    try {
      ClientDataBean clientDataBean = returnClientDataBean(clientEmail);

      OrderBook orderBook = new OrderBook();
      orderBook.setClientDataBean(clientDataBean);
      orderBook.setTotalPrice(bookOrderDTO.getTotalPrice());
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
