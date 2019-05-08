package com.packages.ModifyPackageInformations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packages.exceptions.UnknownMatchException;
import com.packages.model.PackagesSenderHistory;
import com.packages.model.JwtUser;
import com.packages.model.JwtUserDetails;
import com.packages.model.ModifyPackageInformation;
import com.packages.repositories.CommandsHistoryRepository;

@Service
public class PutPackagesService {

	@Autowired
	private CommandsHistoryRepository cmdHistRepo;
	
	public String changePackage(ModifyPackageInformation form) {
		
		if(form.getId()==0 || form.getStatus()==null) throw new UnknownMatchException("Date invalide");
		
		if(!form.getStatus().equals("Accepted") && !form.getStatus().equals("In Delivery") && !form.getStatus().equals("Delivered")) 
			throw new UnknownMatchException("Status invalid");
		
		PackagesSenderHistory cmd= new PackagesSenderHistory();
		cmd=cmdHistRepo.findById(form.getId()).get();
		if(cmd.getEmailDriver()==null && form.getStatus().equals("Accepted")) {
			cmd.setEmailDriver(JwtUser.getUserName());
			cmd.setStatus(form.getStatus());
		}
		else {
			if(cmd.getEmailDriver()==null) throw new UnknownMatchException("Date invalide");
			if(cmd.getEmailDriver().equals(cmd.getEmailSender())) throw new UnknownMatchException("Nu iti poti trimite un pachet tie insuti");
			if(cmd.getEmailDriver().equals(JwtUser.getUserName())) {
				cmd.setStatus(form.getStatus());
			}
			else throw new UnknownMatchException("Date invalide");
		}
		cmdHistRepo.save(cmd);
		return "Success";
	}
}
