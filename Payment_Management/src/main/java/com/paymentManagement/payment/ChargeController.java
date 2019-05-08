package com.paymentManagement.payment;

import com.paymentManagement.payment.ChargeRequest.Currency;
import com.paymentManagement.repositories.PaymentsRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Token;

import lombok.extern.java.Log;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//@Log
@RestController
public class ChargeController {

    @Autowired
    StripeService paymentsService;
    
    @Autowired
    PaymentsRepository paymentsRepo;

    @PostMapping("/payment/charge")
    public Payments charge(@RequestBody ChargeRequest chargeRequest) throws StripeException {
    	Payments model= new Payments();
        chargeRequest.setDescription("Example charge");
        chargeRequest.setCurrency(Currency.EUR);
        
        Stripe.apiKey = "sk_test_yFbrSFbItspR2o3qw3J3bi1i00TJTbo5wo";
/*
        Map<String, Object> tokenParams = new HashMap<String, Object>();
        Map<String, Object> cardParams = new HashMap<String, Object>();
        cardParams.put("number", "4242424242424242");
        cardParams.put("exp_month", 5);
        cardParams.put("exp_year", 2020);
        cardParams.put("cvc", "314");
        tokenParams.put("card", cardParams);
                chargeRequest.setStripeToken(Token.create(tokenParams).getId());
*/

        Charge charge = paymentsService.charge(chargeRequest);
        model.setAmount(chargeRequest.getAmount()/1000);
        model.setCurrency(chargeRequest.getCurrency());
        model.setStatus(charge.getStatus());
        model.setChargeId (charge.getId());
        model.setBalanceTransactionId(charge.getBalanceTransaction());
        paymentsRepo.save(model);
        return model;
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }
}