package com.project.core.bean;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@ToString
@Table(name = "orders")
public class OrderBook {
  @Id
  @Column(name = "order_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int orderId;
  @Column(name = "order_date")
  private Date date;
  @Column(name = "total_price")
  private double totalPrice;
  @Column(name = "payment_method")
  private String paymentMethod;

  @ManyToOne
  @JoinColumn(name = "client_id", nullable = false)
  private ClientDataBean clientDataBean;

  @OneToMany(mappedBy = "orderBook", cascade = CascadeType.ALL)
  private List<OrderBooks> orderBooks;

}
