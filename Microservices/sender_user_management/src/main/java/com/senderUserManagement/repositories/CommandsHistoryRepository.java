package com.senderUserManagement.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senderUserManagement.model.CommandsHistory;

public interface CommandsHistoryRepository extends JpaRepository<CommandsHistory,String>{
      public List<CommandsHistory> findAllByUsername(String id);
}
