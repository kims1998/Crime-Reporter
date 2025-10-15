package com.sdsucrimereporter.dbapi.domain;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "reports")
public class Report {
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
    private String cordLat;
    private String cordLng;

    public String getReportId() {
        return reportId;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

}
