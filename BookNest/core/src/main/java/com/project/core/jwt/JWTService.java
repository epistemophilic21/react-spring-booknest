package com.project.core.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

  @Value("${app.api.key}")
  public String SECRET;

  // Generate token with given user name
  public String generateToken(String userName) {
    Map<String, Object> claims = new HashMap<>();
    return createToken(claims, userName);
  }

  private String createToken(Map<String, Object> claims, String userName) {
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(userName)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // Token valid for 30 minutes
        .signWith(getSignKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  private Key getSignKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSignKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

}
