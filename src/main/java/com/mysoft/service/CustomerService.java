package com.mysoft.service;

import com.mysoft.dao.CustomerDao;
import com.mysoft.domain.Customer;
import com.mysoft.domain.CustomerRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

/**
 * Created by hujy on 2016/8/24.
 */

@Service
public class CustomerService {
    @Resource
    private CustomerRepository customerRepository;

    @Resource
    private CustomerDao customerDao;

    @Transactional
    public void save(Customer customer){
        customerRepository.save(customer);
    }

    @Transactional
    public Customer getByID(long id){
        return customerDao.getByID(id);
    }


}
