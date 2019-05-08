package com.packages.PackageForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packages.exceptions.UnknownMatchException;
import com.packages.model.PackagesSenderHistory;
import com.packages.model.RegisterPackage;
import com.packages.repositories.CommandsHistoryRepository;

@Service
public class PostPackagesService {

	@Autowired
	private CommandsHistoryRepository cmdHistRepo;
	
	public String postPackage(RegisterPackage form) {
		if(form.getEmailSender()==null || form.getKilograms()<=0 || form.getPhoneNumberReceiver()==null ||
				form.getPhoneNumberSender()==null || form.getReceiverAdress()==null || form.getSenderAdress()==null ||
				form.getHeight()<=0 || form.getWidth()<=0 || form.getLength()<=0) throw new UnknownMatchException("Date invalide sau incomplete");
		PackagesSenderHistory cmdHist = new PackagesSenderHistory();
		cmdHist.setEmailSender(form.getEmailSender());
		cmdHist.setEmailDriver(null);
		cmdHist.setKilograms(form.getKilograms());
		cmdHist.setPhoneNumberSender(form.getPhoneNumberSender());
		cmdHist.setPhoneNumberReceiver(form.getPhoneNumberReceiver());
		cmdHist.setSenderAdress(form.getSenderAdress());
		cmdHist.setReceiverAdress(form.getReceiverAdress());
		cmdHist.setHeight(form.getHeight());
		cmdHist.setLength(form.getLength());
		cmdHist.setWidth(form.getWidth());
		cmdHist.setReceiverName(form.getReceiverName());
		cmdHist.setStatus("Ready");
		int pin = (int )(Math.random() * 100000);
		while(cmdHistRepo.existsByPin(pin)) {
			pin = (int )(Math.random() * 100000);
		}
		cmdHist.setPin(pin);
		cmdHistRepo.save(cmdHist);
		return "Success";
	}
	
}
