package com.senderUserManagement.model;

import org.springframework.stereotype.Component;

public class JwtUser {
    private static String userName;
    private static String role;

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public static String getUserName() {
        return userName;
    }

    public static String getRole() {
        return role;
    }
}
