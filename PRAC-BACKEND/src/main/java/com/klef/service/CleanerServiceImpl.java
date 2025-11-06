package com.klef.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.entity.Cleaner;
import com.klef.repository.CleanerRepository;

@Service
public class CleanerServiceImpl implements CleanerService {

    @Autowired
    private CleanerRepository cleanerRepository;

    @Override
    public Cleaner addCleaner(Cleaner cleaner) {
        return cleanerRepository.save(cleaner);
    }

    @Override
    public List<Cleaner> getAllCleaners() {
        return cleanerRepository.findAll();
    }

    @Override
    public Cleaner getCleanerById(int id) {
        Optional<Cleaner> opt = cleanerRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Cleaner updateCleaner(Cleaner cleaner) {
        return cleanerRepository.save(cleaner);
    }

    @Override
    public void deleteCleanerById(int id) {
    	cleanerRepository.deleteById(id);
    }

    @Override
    public Cleaner checkCleanerLogin(String username, String password) {
        // This directly calls the custom method you defined in the repository
        return cleanerRepository.findByUsernameAndPassword(username, password);
    }
    
    @Override
    public boolean deleteCleanerByUsername(String username) {
        // First, check if a cleaner with that username exists
        if (cleanerRepository.findByUsername(username) != null) {
            cleanerRepository.deleteByUsername(username);
            return true; // Deletion was successful
        }
        return false; // User not found, so nothing was deleted
    }
}