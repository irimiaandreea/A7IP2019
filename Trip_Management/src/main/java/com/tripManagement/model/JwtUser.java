package com.tripManagement.model;



public class JwtUser {
    private static String userName;

    public void setUserName(String username) {
        userName = username;
    }

    public static String getUserName() {
        return userName;
    }

}
