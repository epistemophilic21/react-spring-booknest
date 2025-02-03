package com.project.core.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.bean.AuthRequest;
import com.project.core.bean.AuthResponse;
import com.project.core.bean.BookOrderDTO;
import com.project.core.bean.ClientDataBean;
import com.project.core.bean.ClientDetailsBean;
import com.project.core.bean.ResponseMessage;
import com.project.core.service.ClientDataService;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/v1")
public class ClientDataController {

  @Autowired
  ClientDataService clientDataService;

  @Autowired
  ClientDataBean clientDataBean;

  @PostMapping("/addClient")
  public ResponseEntity<ResponseMessage> postClientData(@RequestBody ClientDataBean clientDataBean) {
    ResponseMessage responseMessage;
    HttpStatus status;
    try {
      boolean isClientExists = clientDataService.insertClientData(clientDataBean);
      if (isClientExists) {
        responseMessage = new ResponseMessage(HttpStatus.CREATED.value(), "SUCCESS");
        status = HttpStatus.CREATED;
      } else {
        responseMessage = new ResponseMessage(HttpStatus.CONFLICT.value(), "Client email already exists.");
        status = HttpStatus.CONFLICT;
      }
    } catch (Exception e) {
      responseMessage = new ResponseMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An unexpected error occurred.");
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return ResponseEntity.status(status).body(responseMessage);
  }

  @PostMapping("/authLogin")
  public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
    try {
      String token = clientDataService.verifyClient(authRequest);
      AuthResponse response = new AuthResponse(HttpStatus.OK.value(), token);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("message", "NOT AUTHENTICATED");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
  }

  @PutMapping("/update/{clientEmail}")
  public ResponseEntity<ResponseMessage> updateDetails(@PathVariable String clientEmail,
      @RequestBody ClientDetailsBean clientDetailsBean) {
    boolean isUpdated = clientDataService.updateClientDetails(clientEmail, clientDetailsBean);
    ResponseMessage message;
    if (isUpdated) {
      message = new ResponseMessage(HttpStatus.OK.value(), "SUCCESS");
    } else {
      message = new ResponseMessage(HttpStatus.NOT_FOUND.value(), "NOT FOUND");
    }
    return ResponseEntity.status(message.getStatusCode()).body(message);
  }

  @GetMapping("/getClient/{clientEmail}")
  public ResponseEntity<?> getDetail(@PathVariable String clientEmail) {
    ClientDetailsBean clientInfo = clientDataService.getClientDetail(clientEmail);
    Map<String, Object> response = new HashMap<>();
    if (clientInfo != null) {
      response.put("clientName", clientInfo.getClientDataBean().getClientName());
      response.put("gender", clientInfo.getGender());
      response.put("mobileNumber", clientInfo.getMobileNumber());
      response.put("clientEmail", clientInfo.getClientDataBean().getClientEmail());
      response.put("address", clientInfo.getAddress());
    } else {
      clientDataBean = clientDataService.returnClientDataBean(clientEmail);
      response.put("clientName", clientDataBean.getClientName());
      response.put("gender", "");
      response.put("mobileNumber", "");
      response.put("clientEmail", clientDataBean.getClientEmail());
      response.put("address", "");
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("/postOrder/{clientEmail}")
  public ResponseEntity<ResponseMessage> postOrderDetails(@PathVariable String clientEmail,
      @RequestBody BookOrderDTO bookOrderDTO) {
    ResponseMessage message;
    boolean isSaved = clientDataService.SaveOrder(clientEmail, bookOrderDTO);
    if (isSaved) {
      message = new ResponseMessage(HttpStatus.OK.value(), "SUCCESS");
    } else {
      message = new ResponseMessage(HttpStatus.NOT_FOUND.value(), "NOT FOUND");
    }
    return ResponseEntity.status(message.getStatusCode()).body(message);
  }

}
