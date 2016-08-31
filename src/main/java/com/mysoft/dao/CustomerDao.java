package com.mysoft.dao;

import com.mysoft.domain.Customer;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by hujy on 2016/8/29.
 */
@Repository
public class CustomerDao {
    @Resource
    private JdbcTemplate jdbcTemplate;

    public Customer getByID(long id){
        String sql = "select * from Customer where id=?";
        RowMapper<Customer> rowMapper = new BeanPropertyRowMapper<Customer>(Customer.class);

        return jdbcTemplate.queryForObject(sql,rowMapper,id);

    }
}
