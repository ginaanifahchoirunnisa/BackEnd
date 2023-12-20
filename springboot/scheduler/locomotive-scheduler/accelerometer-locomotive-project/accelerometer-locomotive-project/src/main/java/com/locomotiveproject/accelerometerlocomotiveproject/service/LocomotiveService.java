package com.locomotiveproject.accelerometerlocomotiveproject.service;

import com.locomotiveproject.accelerometerlocomotiveproject.model.Locomotive;
import com.locomotiveproject.accelerometerlocomotiveproject.repository.LocomotiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class LocomotiveService {
    @Autowired
    private LocomotiveRepository locomotiveRepository;

    private String[] locoCodes = {"LC001", "LC002", "LC003"};
    private String[] locoNames = {"Loco1", "Loco2", "Loco3"};
    private String[] locoDimensions = {"10x5", "12x6", "8x4"};
    private String[] statuses = {"Active", "Inactive", "Maintenance"};

    private Random random = new Random();

    @Transactional
    public void generateAndSaveLocomotiveData() {
        int randomIndex = random.nextInt(locoCodes.length);

        Locomotive locomotive = new Locomotive();
        locomotive.setLocoCode(locoCodes[randomIndex]);
        locomotive.setLocoName(locoNames[randomIndex]);
        locomotive.setLocoDimension(locoDimensions[randomIndex]);
        locomotive.setStatus(statuses[randomIndex]);
        locomotive.setDatetime(LocalDateTime.now());

        locomotiveRepository.save(locomotive);
    }

    @Transactional
    @Scheduled(fixedRate = 10000) // Menjadwalkan setiap 10 detik
    public void scheduleLocomotiveDataGeneration() {
        generateAndSaveLocomotiveData();

    }

    public List<Locomotive> getAllLocomotives() {
        return locomotiveRepository.findAll();
    }
}