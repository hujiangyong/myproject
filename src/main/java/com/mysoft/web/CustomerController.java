package com.mysoft.web;

import com.mysoft.domain.Customer;
import com.mysoft.service.CustomerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by hujy on 2016/8/24.
 */

@RestController
@RequestMapping("/demo")
public class CustomerController {

    @Resource
    private CustomerService customerService;


    @RequestMapping("/save")
    public String  save(){

            Customer customer = new Customer();
        customer.setName("hello world");

        customerService.save(customer);

        return"ok.Demo2Controller.save";
    }

    @RequestMapping("/getById")
    public Customer getByID(long id){
        return customerService.getByID(id);
    }
}
