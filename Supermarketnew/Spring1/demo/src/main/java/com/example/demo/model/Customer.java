package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Customer {

    @Id
    private int customer_id;
    private String name;
    private String email;
    private String message; // Renamed from password to message

    public Customer() {
    }

    public Customer(int customer_id, String name, String email, String message) { // Updated constructor
        this.customer_id = customer_id;
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() { // Renamed getter
        return message;
    }

    public void setMessage(String message) { // Renamed setter
        this.message = message;
    }
}
