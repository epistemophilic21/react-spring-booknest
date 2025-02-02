package com.project.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.core.bean.ClientDataBean;
import com.project.core.repository.ClientDataRepository;

@Service
public class ClientDetailService implements UserDetailsService {

  @Autowired
  ClientDataRepository clientDataRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    ClientDataBean client = clientDataRepository.findByClientEmail(username);
    if (client == null) {
      throw new UsernameNotFoundException("NOT FOUND");
    }
    return client;
  }
}