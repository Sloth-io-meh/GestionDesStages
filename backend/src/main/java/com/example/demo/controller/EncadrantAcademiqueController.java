package com.example.demo.controller;

import com.example.demo.model.EncadrantAcademique;
import com.example.demo.service.EncadrantAcademiqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/encadrants")
@CrossOrigin(origins = "*")
public class EncadrantAcademiqueController {

    private final EncadrantAcademiqueService service;

    public EncadrantAcademiqueController(EncadrantAcademiqueService service) {
        this.service = service;
    }

    @GetMapping
    public List<EncadrantAcademique> getAllEncadrants() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EncadrantAcademique> getEncadrantById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EncadrantAcademique createEncadrant(@RequestBody EncadrantAcademique encadrant) {
        return service.save(encadrant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EncadrantAcademique> updateEncadrant(@PathVariable Long id, @RequestBody EncadrantAcademique details) {
        return service.update(id, details)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEncadrant(@PathVariable Long id) {
        if (service.delete(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
