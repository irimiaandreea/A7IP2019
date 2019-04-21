package com.driverUserManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.driverUserManagement.model.Users;

public interface UsersRepository extends JpaRepository<Users,String> {


public boolean existsByPassword(String oldPassword);

}
