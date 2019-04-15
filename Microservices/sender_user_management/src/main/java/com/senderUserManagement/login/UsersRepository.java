package com.senderUserManagement.login;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senderUserManagement.model.Users;

public interface UsersRepository extends JpaRepository<Users,String> {


}
