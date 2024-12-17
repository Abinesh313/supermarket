package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepo;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin addAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Admin getAdminById(int adminId) {
        return adminRepo.findById(adminId).orElse(null);
    }

    public void updateAdmin(Admin admin) {
        adminRepo.save(admin);
    }

    public void deleteAdmin(int adminId) {
        adminRepo.deleteById(adminId);
    }
}
