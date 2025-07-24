package com.project.core.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseMessage {
  private int statusCode;
  private String message;
}
