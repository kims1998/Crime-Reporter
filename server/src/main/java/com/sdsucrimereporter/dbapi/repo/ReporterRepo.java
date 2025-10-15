package com.sdsucrimereporter.dbapi.repo;

import com.sdsucrimereporter.dbapi.domain.Reporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReporterRepo extends JpaRepository<Reporter, String> {

    Optional<Reporter> findById(String id);

}
