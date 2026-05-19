package com.example.demo.controller;

import com.example.demo.model.Stage;
import com.example.demo.service.StageExportService;
import com.example.demo.service.StageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stages")
@CrossOrigin(origins = "*")
public class StageController {

    private final StageService stageService;
    private final StageExportService stageExportService;

    public StageController(StageService stageService, StageExportService stageExportService) {
        this.stageService = stageService;
        this.stageExportService = stageExportService;
    }

    @GetMapping
    public List<Stage> getAllStages() {
        return stageService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stage> getStageById(@PathVariable Long id) {
        return stageService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Stage createStage(@RequestBody Stage stage) {
        return stageService.save(stage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stage> updateStage(@PathVariable Long id, @RequestBody Stage stageDetails) {
        return stageService.update(id, stageDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(@PathVariable Long id) {
        if (stageService.delete(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/filiere/{filiereId}")
    public List<Stage> getStagesByFiliere(@PathVariable Long filiereId) {
        return stageService.findByFiliere(filiereId);
    }

    @GetMapping("/annee/{year}")
    public List<Stage> getStagesByYear(@PathVariable int year) {
        return stageService.findByYear(year);
    }

    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> exportToPdf(@PathVariable Long id) {
        return stageService.findById(id).map(stage -> {
            byte[] pdf = stageExportService.exportToPdf(stage);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "stage_report_" + id + ".pdf");
            return ResponseEntity.ok().headers(headers).body(pdf);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filiere/{filiereId}/export")
    public ResponseEntity<byte[]> exportStagesByFiliere(@PathVariable Long filiereId) {
        List<Stage> stages = stageService.findByFiliere(filiereId);
        byte[] pdf = stageExportService.exportStagesToPdf(stages, "Rapport des Stages - Filière " + filiereId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "filiere_" + filiereId + "_report.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportAllStages() {
        List<Stage> stages = stageService.findAll();
        byte[] pdf = stageExportService.exportStagesToPdf(stages, "Rapport Global des Stages PFE");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "all_stages_report.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
