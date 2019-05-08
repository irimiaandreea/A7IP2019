package com.packages.history;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packages.exceptions.UnknownMatchException;
import com.packages.model.PackagesDriverHistory;
import com.packages.model.PackagesSenderHistory;
import com.packages.repositories.CommandsHistoryRepository;

@Service
public class PackagesHistoryService {

	@Autowired
	private CommandsHistoryRepository cmdHistRepo;
	
	public List<PackagesDriverHistory> gePackagesHistoryDriver(String email) throws UnknownMatchException {
		if(!cmdHistRepo.existsByEmailDriver(email)) throw new UnknownMatchException("Nu aveti niciun pachet livrat");
		List<PackagesDriverHistory> list=new ArrayList<PackagesDriverHistory>();
		List<PackagesSenderHistory> packages=new ArrayList<PackagesSenderHistory>();
		packages=cmdHistRepo.findAllByEmailDriver(email);
		for(PackagesSenderHistory i : packages) {
			list.add(new PackagesDriverHistory(i));
		}
		return list;
	}

	public List<PackagesSenderHistory> gePackagesHistorySender(String email) {
		if(!cmdHistRepo.existsByEmailSender(email)) throw new UnknownMatchException("Nu aveti niciun pachet trimis");
		return cmdHistRepo.findAllByEmailSender(email);
	}

}
