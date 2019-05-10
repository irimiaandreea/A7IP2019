package com.packages.PackageForm;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.packages.model.PackagesSenderHistory;
import com.packages.model.RegisterPackage;

@RestController
public class PostPackagesController {

	@Autowired
	PostPackagesService postServ;
	
	 @RequestMapping(method=RequestMethod.POST,value="/packages/registerPackage")
	 public String postSenderPackage(@RequestBody RegisterPackage form,@RequestHeader("Authorization") String token) throws IOException {
		 return postServ.postPackage(form,token);
	 }

}
