package com.example.project.controller;

import com.example.project.dto.AccountDTO;
import com.example.project.dto.ComeDTO;
import com.example.project.model.Account;
import com.example.project.model.Come;
import com.example.project.service.AccountService;
import com.example.project.service.ComeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/come")
public class ComeController {

    private final AccountService accountService;
    private final ComeService comeService;
    private final ModelMapper modelMapper;

    @Autowired
    public ComeController(AccountService accountService, ComeService comeService, ModelMapper modelMapper) {
        this.accountService = accountService;
        this.comeService = comeService;
        this.modelMapper = modelMapper;
    }

    private List<Come> getList(Integer id){
        List<Account> list = new ArrayList<>(accountService.findByUserId(id));
        List<Come> comes = new ArrayList<>();
        list.forEach(account -> comes.addAll(account.getAllComes()));

        comes.sort(Comparator.comparingLong(o -> o.getDate().getTime()));

        return comes;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ComeDTO>> getData(@PathVariable(name = "id") Integer id){
        List<Come> comes = getList(id);
        List<ComeDTO> response = new ArrayList<>();
        for(Come come : comes){
            ComeDTO comeDTO = new ComeDTO(come.getId(), null, modelMapper.map(come.getAccount(), AccountDTO.class), come.getName(), come.getMoney(), come.getStatus());
            switch (come.getDate().getMonth()) {
                case Calendar.JANUARY -> comeDTO.setMonth("January");
                case Calendar.FEBRUARY -> comeDTO.setMonth("February");
                case Calendar.MARCH -> comeDTO.setMonth("March");
                case Calendar.APRIL -> comeDTO.setMonth("April");
                case Calendar.MAY -> comeDTO.setMonth("May");
                case Calendar.JUNE -> comeDTO.setMonth("June");
                case Calendar.JULY -> comeDTO.setMonth("July");
                case Calendar.AUGUST -> comeDTO.setMonth("August");
                case Calendar.SEPTEMBER -> comeDTO.setMonth("September");
                case Calendar.OCTOBER -> comeDTO.setMonth("October");
                case Calendar.NOVEMBER -> comeDTO.setMonth("November");
                case Calendar.DECEMBER -> comeDTO.setMonth("December");
            }
            response.add(comeDTO);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/chart")
    public ResponseEntity<int[]> chart(@PathVariable(name = "id") Integer id, @RequestParam(name = "truth") Boolean truth){
        int[] response = new int[12];
        List<Come> comes = getList(id);
        for(Come come : comes) {
            if (come.getStatus()==truth) {
                switch (come.getDate().getMonth()) {
                    case Calendar.JANUARY -> response[0] += come.getMoney();
                    case Calendar.FEBRUARY -> response[1] += come.getMoney();
                    case Calendar.MARCH -> response[2] += come.getMoney();
                    case Calendar.APRIL -> response[3] += come.getMoney();
                    case Calendar.MAY -> response[4] += come.getMoney();
                    case Calendar.JUNE -> response[5] += come.getMoney();
                    case Calendar.JULY -> response[6] += come.getMoney();
                    case Calendar.AUGUST -> response[7] += come.getMoney();
                    case Calendar.SEPTEMBER -> response[8] += come.getMoney();
                    case Calendar.OCTOBER -> response[9] += come.getMoney();
                    case Calendar.NOVEMBER -> response[10] += come.getMoney();
                    case Calendar.DECEMBER -> response[11] += come.getMoney();
                }
            }
        }
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable(name = "id") Integer id){
        Come come = comeService.findById(id);
        comeService.delete(come);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/new")
    public ResponseEntity<HttpStatus> newCome(@RequestBody ComeDTO comeDTO){
        Account account = accountService.findById(comeDTO.getAccount().getId());

        comeService.save(new Come(null,  new Date().getTime(), account , comeDTO.getName(), comeDTO.getMoney(),
                comeDTO.getStatus()));

        if(comeDTO.getStatus()){
            account.setMoney(account.getMoney() - comeDTO.getMoney());
        } else {
            account.setMoney(account.getMoney() + comeDTO.getMoney());
        }

        accountService.save(account);

        return ResponseEntity.ok(HttpStatus.OK);
    }




}
