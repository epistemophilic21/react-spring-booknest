package com.project.core.bean;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class BookOrderDTO {
  private Date date;
  private double totalPrice;
  private String paymentMethod;
  private List<BookDetails> books;
}
