package com.sdsucrimereporter.dbapi.resource;

import com.sdsucrimereporter.dbapi.domain.Report;

import com.sdsucrimereporter.dbapi.service.sdsuService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.sdsucrimereporter.dbapi.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;


@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class Resource {
    private sdsuService service;

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        return ResponseEntity.created(URI.create("reports/reportID")).body(service.createReport(report));
    }

    @GetMapping
    public ResponseEntity<Page<Report>> getReports(@RequestParam(value = "page", defaultValue = "0") int page,
                                                   @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(service.getAllReports(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReport(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(service.getReport(id));
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhotoReport(@RequestParam("id") String id, @RequestParam("file")MultipartFile file) {
        return ResponseEntity.ok().body(service.uploadPhotoReport(id, file));
    }

    @GetMapping(path = "image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getReportedPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }
}
