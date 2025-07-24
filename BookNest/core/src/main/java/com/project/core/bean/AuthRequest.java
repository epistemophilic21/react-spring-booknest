package com.project.core.bean;

import lombok.Data;

@Data
public class AuthRequest {
  private String authUser;
  private String authPassword;
}
