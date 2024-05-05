package com.dev.demo.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

public class JwtTokenProvider {

  private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

  public static String generateToken(String userId, String username){
    Date now = new Date();
    Date expiryDate = new Date(now.getTime()+ 1200000); //20 minuti min * 60sec * 1000 millisec

    return Jwts.builder()
      .setSubject(userId)
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .claim("username", username)
      .signWith(SECRET_KEY)
      .compact();
  }
}
