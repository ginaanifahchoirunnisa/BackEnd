package com.locomotiveproject.accelerometerlocomotiveproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "locomotive")
public class Locomotive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "loco_code")
    private String locoCode;
    @Column(name = "loco_name")
    private String locoName;
    @Column(name = "loco_dimension")
    private String locoDimension;
    @Column(name = "status")
    private String status;
    @Column(name = "datetime")
    private LocalDateTime datetime;

    // Getter dan Setter
}
