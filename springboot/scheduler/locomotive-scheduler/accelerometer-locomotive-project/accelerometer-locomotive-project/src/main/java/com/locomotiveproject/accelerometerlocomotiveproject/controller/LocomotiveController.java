package com.locomotiveproject.accelerometerlocomotiveproject.controller;

import com.locomotiveproject.accelerometerlocomotiveproject.model.Locomotive;
import com.locomotiveproject.accelerometerlocomotiveproject.service.LocomotiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/locomotives")
public class LocomotiveController {

    @Autowired
    private LocomotiveService locomotiveService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateAndSaveLocomotiveData() {
        try {
            locomotiveService.generateAndSaveLocomotiveData();
            return new ResponseEntity<>("Locomotive data generated and saved successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error generating and saving locomotive data.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Locomotive>> getAllLocomotives() {
        List<Locomotive> allLocomotives = locomotiveService.getAllLocomotives();
        return new ResponseEntity<>(allLocomotives, HttpStatus.OK);
    }
}