package com.driverUserManagement.cmdHistory;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driverUserManagement.model.CommandsHistory;
import com.driverUserManagement.model.JwtUser;
import com.driverUserManagement.repositories.CommandsHistoryRepository;

@Service
public class CmdHistoryService{
	@Autowired
	private CommandsHistoryRepository cRepo;
	
	
	public List<CommandsHistory> getIstoric(String nume) throws IOException {
		if(JwtUser.getUserName().equals(nume) && JwtUser.getRole().equals("driver"))
		   return cRepo.findAllByUsername(nume);
		else throw new IOException("Invalid username");
	}


}
