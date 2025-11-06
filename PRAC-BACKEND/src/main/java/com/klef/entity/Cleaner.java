package com.klef.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cleaner_table") // meaningful table name
public class Cleaner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ auto-increment primary key
    @Column(name = "cleaner_id")
    private int id;

    @Column(name = "cleaner_name", nullable = false, length = 50)
    private String name;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username; // ✅ used in login, find, delete methods

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    // --- Getters and Setters ---
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Cleaner [id=" + id + ", name=" + name + ", username=" + username + "]";
    }
}
