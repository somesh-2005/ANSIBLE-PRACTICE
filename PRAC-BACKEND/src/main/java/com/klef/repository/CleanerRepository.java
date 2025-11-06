package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klef.entity.Cleaner;

@Repository
public interface CleanerRepository extends JpaRepository<Cleaner, Integer> 
{
	public Cleaner findByUsernameAndPassword(String username, String password);
	
	@Transactional
	void deleteByUsername(String username);


	Cleaner findByUsername(String username);
}