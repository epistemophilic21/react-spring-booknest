package com.project.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.core.bean.ClientDetailsBean;

public interface ClientDetailsRepository extends JpaRepository<ClientDetailsBean, Integer> {
  boolean existsByClientDataBean_ClientId(int clientId);

  ClientDetailsBean findByClientDataBean_ClientId(int clientId);
}
