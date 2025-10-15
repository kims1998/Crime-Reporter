package com.sdsucrimereporter.dbapi.service;

import com.sdsucrimereporter.dbapi.domain.Report;
import com.sdsucrimereporter.dbapi.repo.ReportRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.sdsucrimereporter.dbapi.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor

public class ReportService {
    private static final Logger log = LoggerFactory.getLogger(ReportService.class);

    private ReportRepo reportRepo;


    public Page<Report> getAllReports(int page, int size) {
        return reportRepo.findAll(PageRequest.of(page, size, Sort.by("id")));

    }

    public Report getReport(String id) {
        return reportRepo.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));

    }

    public Report createReport(Report report) {
        return reportRepo.save(report);
    }

    public Report deleteReport(Report report) {
        if (!reportRepo.existsById(report.getReportId())) {
            throw new NoSuchElementException("Report doesn't exist");
        }
        reportRepo.delete(report);
        return report;

    }

    public String uploadPhoto(String id, MultipartFile file) {
        //log.info("Saving picture of the incident for reports ID: {}", id);
        Report report = getReport(id);
        String photoUrl = photoFunction.apply(id, file);
        report.setPhotoUrl(photoUrl);
        reportRepo.save(report);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {

            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation);}
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/reporter/image/" + filename).toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
