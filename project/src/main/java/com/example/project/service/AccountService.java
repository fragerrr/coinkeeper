package com.example.project.service;

import com.example.project.model.Account;
import com.example.project.model.Person;
import com.example.project.repository.AccountRepository;
import com.example.project.repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AccountService {
    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository, PersonRepository personRepository) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
    }

    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    public Account findById(Integer id){
        return accountRepository.findById(id).orElse(null);
    }

    public void delete(Account account){
        accountRepository.delete(account);
    }

    public List<Account> findByUserId(Integer id){
        return accountRepository.findByUser(personRepository.findById(id));
    }
    public void save(Account account){
        accountRepository.save(account);
    }
}
