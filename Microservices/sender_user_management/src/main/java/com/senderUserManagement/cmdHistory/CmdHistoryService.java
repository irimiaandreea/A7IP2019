package com.senderUserManagement.cmdHistory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.CmdHistory;
import com.senderUserManagement.model.JwtUser;

@Service("userDetailsService")
public class CmdHistoryService{
	@Autowired
	private CmdHistoryRepository cRepo;
	
	
	public List<CmdHistory> getIstoric(String nume) throws IOException {
		if(JwtUser.getUserName().equals(nume))
		   return cRepo.findAllByUsername(nume);
		else throw new IOException("Invalid username");
	}


}
