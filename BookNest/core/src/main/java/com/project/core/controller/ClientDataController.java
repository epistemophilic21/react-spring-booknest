package com.project.core.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.function.Predicate;

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

  @PostMapping("/addClient")
  public ResponseEntity<ResponseMessage> postClientData(@RequestBody ClientDataBean clientDataBean) {
    ResponseMessage responseMessage;
    HttpStatus status;
    try {
      Predicate<ClientDataBean> clientExistsPredicate = clientDataService::insertClientData;
      boolean isClientExists = clientExistsPredicate.test(clientDataBean);
      responseMessage = isClientExists ? new ResponseMessage(HttpStatus.CREATED.value(), "SUCCESS")
          : new ResponseMessage(HttpStatus.CONFLICT.value(), "Client email already exists.");
      status = isClientExists ? HttpStatus.CREATED : HttpStatus.CONFLICT;

    } catch (Exception e) {
      responseMessage = new ResponseMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An unexpected error occurred.");
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return ResponseEntity.status(status).body(responseMessage);
  }

  @PostMapping("/authLogin")
  public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
    try {
      Function<AuthRequest, String> verifyClientFunction = clientDataService::verifyClient;
      String token = verifyClientFunction.apply(authRequest);
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
    BiPredicate<String, ClientDetailsBean> clientUpdatePredicate = clientDataService::updateClientDetails;
    boolean isUpdated = clientUpdatePredicate.test(clientEmail, clientDetailsBean);
    ResponseMessage message = isUpdated ? new ResponseMessage(HttpStatus.OK.value(), "SUCCESS")
        : new ResponseMessage(HttpStatus.NOT_FOUND.value(), "NOT FOUND");
    return ResponseEntity.status(message.getStatusCode()).body(message);
  }

  @GetMapping("/getClient/{clientEmail}")
  public ResponseEntity<?> getDetail(@PathVariable String clientEmail) {
    ClientDetailsBean clientInfo = clientDataService.getClientDetail(clientEmail);
    Map<String, Object> response = new HashMap<>();
    if (clientInfo != null) {
      response.putAll(Map.of(
          "clientName", clientInfo.getClientDataBean().getClientName(),
          "gender", clientInfo.getGender(),
          "mobileNumber", clientInfo.getMobileNumber(),
          "clientEmail", clientInfo.getClientDataBean().getClientEmail(),
          "address", clientInfo.getAddress()));
    } else {
      ClientDataBean clientDataBean = clientDataService.returnClientDataBean(clientEmail);
      response.putAll(Map.of(
          "clientName", clientDataBean.getClientName(),
          "gender", "",
          "mobileNumber", "",
          "clientEmail", clientDataBean.getClientEmail(),
          "address", ""));
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("/postOrder/{clientEmail}")
  public ResponseEntity<ResponseMessage> postOrderDetails(@PathVariable String clientEmail,
      @RequestBody BookOrderDTO bookOrderDTO) {
    BiPredicate<String, BookOrderDTO> isSavedBiPredicate = clientDataService::SaveOrder;
    boolean isSaved = isSavedBiPredicate.test(clientEmail, bookOrderDTO);
    ResponseMessage message = isSaved ? new ResponseMessage(HttpStatus.OK.value(), "SUCCESS")
        : new ResponseMessage(HttpStatus.NOT_FOUND.value(), "NOT FOUND");
    return ResponseEntity.status(message.getStatusCode()).body(message);
  }
}
