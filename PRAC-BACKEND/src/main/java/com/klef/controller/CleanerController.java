package com.klef.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.entity.Cleaner;
import com.klef.service.CleanerService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/cleanerapi/")
@CrossOrigin(origins = "*") // In production, restrict this to your frontend's domain
public class CleanerController {

    @Autowired
    private CleanerService cleanerService;
    
    @GetMapping("/")
    public String home() 
    {
        return "Practical FullStack";
    }

    // New Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> cleanerLogin(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        
        Cleaner cleaner = cleanerService.checkCleanerLogin(username, password);
        
        if (cleaner != null) {
            // Successful login, return the cleaner's data (without password)
            return new ResponseEntity<>(cleaner, HttpStatus.OK);
        } else {
            // Failed login
            return new ResponseEntity<>("Invalid username or password.", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Cleaner> addCleaner(@RequestBody Cleaner cleaner) {
        Cleaner savedCleaner = cleanerService.addCleaner(cleaner);
        return new ResponseEntity<>(savedCleaner, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cleaner>> getAllCleaners() {
        List<Cleaner> cleaners = cleanerService.getAllCleaners();
        return new ResponseEntity<>(cleaners, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCleanerById(@PathVariable int id) {
        Cleaner cleaner = cleanerService.getCleanerById(id);
        if (cleaner != null) {
            return new ResponseEntity<>(cleaner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cleaner with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCleaner(@RequestBody Cleaner cleaner) {
        Cleaner existing = cleanerService.getCleanerById(cleaner.getId());
        if (existing != null) {
            Cleaner updatedCleaner = cleanerService.updateCleaner(cleaner);
            return new ResponseEntity<>(updatedCleaner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Cleaner with ID " + cleaner.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCleaner(@PathVariable int id) {
        Cleaner existing = cleanerService.getCleanerById(id);
        if (existing != null) {
            cleanerService.deleteCleanerById(id);
            return new ResponseEntity<>("Cleaner with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Cleaner with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/by-username/{username}")
    public ResponseEntity<Map<String, String>> deleteCleanerByUsername(@PathVariable String username) {
        boolean isDeleted = cleanerService.deleteCleanerByUsername(username);

        if (isDeleted) {
            return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Account not found"));
        }
    }

}
