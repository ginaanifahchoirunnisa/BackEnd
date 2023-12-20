package com.locomotiveproject.accelerometerlocomotiveproject.repository;

import com.locomotiveproject.accelerometerlocomotiveproject.model.Locomotive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocomotiveRepository extends JpaRepository<Locomotive, Long> {
}
