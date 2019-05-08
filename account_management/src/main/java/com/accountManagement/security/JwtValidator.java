package com.accountManagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import com.accountManagement.model.JwtUser;


@Component
public class JwtValidator {


    private String secret = "iUber";

    public JwtUser validate(String token) {

        JwtUser jwtUser = null;
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            jwtUser = new JwtUser();
            JwtUser.setUserName((String) body.get("email"));
        }
        catch (Exception e) {
            System.out.println(e);
        }

        return jwtUser;
    }
}
