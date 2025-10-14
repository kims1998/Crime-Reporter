package com.sdsucrimereporter.dbapi.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.UuidGenerator;

@Entity
public class report {
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String reportId;
    private String location;
    private String incident;
    private String reporterId;
    private String time;
    private String AMPM;
    private String date;
    private String personInvolvedAGE1;
    private String personInvolvedGENDER1;
    private String personInvolvedAGE2;
    private String personInvolvedGENDER2;
    private String description;
    private String photoUrl;

}
