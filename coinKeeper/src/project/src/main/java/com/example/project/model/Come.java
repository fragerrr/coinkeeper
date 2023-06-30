package com.example.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table
@Data
@NoArgsConstructor
public class Come{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date")
    private Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @Column(name = "name")
    private String name;

    @Column(name = "money")
    private Integer money;

    @Column(name = "status")
    private Boolean status;

    public Come(Integer id, Long time, Account account, String name, Integer money, Boolean status) {
        this.id = id;
        this.date = new Date(time);
        this.account = account;
        this.name = name;
        this.money = money;
        this.status = status;
    }
}
