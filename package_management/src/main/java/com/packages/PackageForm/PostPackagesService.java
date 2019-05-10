package com.packages.PackageForm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packages.exceptions.UnknownMatchException;
import com.packages.model.PackagesDriverHistory;
import com.packages.model.PackagesSenderHistory;
import com.packages.model.RegisterPackage;
import com.packages.repositories.CommandsHistoryRepository;

@Service
public class PostPackagesService {

	@Autowired
	private CommandsHistoryRepository cmdHistRepo;
	
	public String postPackage(RegisterPackage form,String token) throws IOException {
		if(form.getEmailSender()==null || form.getKilograms()<=0 || form.getPhoneNumberReceiver()==null ||
				form.getPhoneNumberSender()==null || form.getReceiverAdress()==null || form.getSenderAdress()==null ||
				form.getHeight()<=0 || form.getWidth()<=0 || form.getLength()<=0) throw new UnknownMatchException("Date invalide sau incomplete");
	
		BufferedReader reader = null ;
		URL url = new URL("http://localhost:8083/trip/verifyLocation/"+form.getSenderAdress());
	    HttpURLConnection con = (HttpURLConnection) url.openConnection();
	    
	    con.setRequestMethod("GET");
	    con.setRequestProperty("Content-Type", "application/json");	    
        con.setRequestProperty("Authorization", token);
        
	    con.setDoInput(true);
		reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String json = reader.lines().collect(Collectors.joining("\n"));
		Boolean adresaValida= Boolean.parseBoolean(json);
		
		if(!adresaValida)  throw new UnknownMatchException("Adresa senderului nu este valida");
		
		BufferedReader reader1 = null ;
		URL url1 = new URL("http://localhost:8083/trip/verifyLocation/"+form.getReceiverAdress());
	    HttpURLConnection con1 = (HttpURLConnection) url1.openConnection();
	    
	    con1.setRequestMethod("GET");
	    con1.setRequestProperty("Content-Type", "application/json");	    
        con1.setRequestProperty("Authorization", token);
        
	    con1.setDoInput(true);
		reader1 = new BufferedReader(new InputStreamReader(con1.getInputStream()));
		String json1 = reader1.lines().collect(Collectors.joining("\n"));
		Boolean adresaValida1= Boolean.parseBoolean(json1);
		
		if(!adresaValida1)  throw new UnknownMatchException("Adresa receiverului nu este valida");
		
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
