package com.example.project.controller;

import com.example.project.dto.AccountDTO;
import com.example.project.model.Account;
import com.example.project.service.AccountService;
import com.example.project.service.PersonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;
    private final PersonService personService;
    private final ModelMapper modelMapper;

    @Autowired
    public AccountController(AccountService accountService, PersonService personService, ModelMapper modelMapper) {
        this.accountService = accountService;
        this.personService = personService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<AccountDTO>> getData(@PathVariable(name = "id") Integer id){
        List<AccountDTO> list = new ArrayList<>();
        accountService.findByUserId(id).forEach(acc -> list.add(modelMapper.map(acc, AccountDTO.class)));
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable(name = "id") Integer id){
        Account account = accountService.findById(id);
        accountService.delete(account);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/new")
    public ResponseEntity<HttpStatus> newAcc(@RequestBody AccountDTO accountDTO){
        Account account = modelMapper.map(accountDTO, Account.class);
        account.setUser(personService.findById(accountDTO.getUser_id()));
        accountService.save(account);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
