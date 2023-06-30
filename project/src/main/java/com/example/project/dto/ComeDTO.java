package com.example.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComeDTO {
    private Integer id;
    private String month;
    private AccountDTO account;
    private String name;
    private Integer money;
    private Boolean status;
}
