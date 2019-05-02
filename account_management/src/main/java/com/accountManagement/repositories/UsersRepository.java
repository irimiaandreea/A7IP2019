package com.accountManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accountManagement.model.Users;


public interface UsersRepository extends JpaRepository<Users,String> {


public boolean existsByPassword(String oldPassword);

}
