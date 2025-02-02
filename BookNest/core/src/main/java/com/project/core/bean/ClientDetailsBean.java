package com.project.core.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "client_details")
public class ClientDetailsBean {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @OneToOne
  @JoinColumn(name = "client_id", referencedColumnName = "client_id")
  private ClientDataBean clientDataBean;

  @Column(name = "gender")
  private String gender;

  @Column(name = "mobile")
  private String mobileNumber;

  @Column(name = "address")
  private String address;
}
