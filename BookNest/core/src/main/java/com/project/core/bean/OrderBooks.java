package com.project.core.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "orderbooks")
public class OrderBooks {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private OrderBook orderBook;
  @ManyToOne
  @JoinColumn(name = "book_id", nullable = false)
  private BookDetails bookDetails;
  private int quantity;
}
