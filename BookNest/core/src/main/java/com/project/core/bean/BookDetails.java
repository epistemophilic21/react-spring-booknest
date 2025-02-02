package com.project.core.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Entity
@Table(name = "bookdetails")
public class BookDetails {
  @Id
  @Column(name = "book_id")
  private String id;
  @Column(name = "book_title")
  private String title;
  private String authors;
  private int quantity;
  private double price;
}
