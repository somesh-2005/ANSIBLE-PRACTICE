package com.klef.service;

import java.util.List;
import com.klef.entity.Cleaner;

public interface CleanerService {
    Cleaner addCleaner(Cleaner cleaner);
    List<Cleaner> getAllCleaners();
    Cleaner getCleanerById(int id);
    Cleaner updateCleaner(Cleaner cleaner);
    void deleteCleanerById(int id);
    Cleaner checkCleanerLogin(String username, String password);

    boolean deleteCleanerByUsername(String username);
}