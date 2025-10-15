package com.sdsucrimereporter.dbapi.repo;


import com.sdsucrimereporter.dbapi.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReporterRepo extends JpaRepository<Report, String> {

    Optional<Report> findById(String id);

}
