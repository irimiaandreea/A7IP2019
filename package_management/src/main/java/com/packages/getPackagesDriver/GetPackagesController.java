package com.packages.getPackagesDriver;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packages.model.PackagesDriverHistory;
import com.packages.model.PackagesSenderHistory;


@RestController
public class GetPackagesController {
	
	@Autowired
	GetPackagesService getPackagesService;
	
	@RequestMapping(value="/packages/getPackages/{location}")
	 public List<PackagesDriverHistory> getPackages(@PathVariable String location,@RequestHeader("Authorization") String token) throws IOException {
		 return getPackagesService.getPackages(location,token);
	 }
}
