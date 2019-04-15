package com.senderUserManagement.register;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.senderUserManagement.model.Users;


public interface UserLoginDataRepository extends CrudRepository<Users,String>
{

}
