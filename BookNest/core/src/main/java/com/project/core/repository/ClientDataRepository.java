package com.project.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.core.bean.ClientDataBean;

public interface ClientDataRepository extends JpaRepository<ClientDataBean, Integer> {
  boolean existsByClientEmail(String clientEmail);

  ClientDataBean findByClientEmail(String email);

}
