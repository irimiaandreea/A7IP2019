package com.senderUserManagement.cmdHistory;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senderUserManagement.model.CmdHistory;

interface CmdHistoryRepository extends JpaRepository<CmdHistory,String>{
      public List<CmdHistory> findAllByUsername(String id);
}
