package com.example.demo;

import com.example.demo.model.Etudiant;
import com.example.demo.model.Filiere;
import com.example.demo.repository.EtudiantRepository;
import com.example.demo.repository.FiliereRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "admin", roles = {"ADMIN"})
public class EtudiantControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private FiliereRepository filiereRepository;

    @Autowired
    private com.example.demo.repository.StageRepository stageRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Filiere testFiliere;

    @BeforeEach
    void setup() {
        stageRepository.deleteAll();
        etudiantRepository.deleteAll();
        filiereRepository.deleteAll();
        
        testFiliere = new Filiere(null, "Test Filiere", null);
        testFiliere = filiereRepository.save(testFiliere);
    }

    @Test
    public void shouldCreateEtudiant() throws Exception {
        Etudiant etudiant = new Etudiant(null, "test@student.com", "CNE123", "Doe", "John", "0600000000", testFiliere);

        mockMvc.perform(post("/api/etudiants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(etudiant)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom", is("Doe")))
                .andExpect(jsonPath("$.prenom", is("John")));
    }

    @Test
    public void shouldGetAllEtudiants() throws Exception {
        Etudiant e1 = new Etudiant(null, "e1@test.com", "CNE1", "Nom1", "Prenom1", "061", testFiliere);
        Etudiant e2 = new Etudiant(null, "e2@test.com", "CNE2", "Nom2", "Prenom2", "062", testFiliere);
        etudiantRepository.save(e1);
        etudiantRepository.save(e2);

        mockMvc.perform(get("/api/etudiants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void shouldUpdateEtudiant() throws Exception {
        Etudiant e = etudiantRepository.save(new Etudiant(null, "old@test.com", "CNE", "Old", "Old", "000", testFiliere));
        
        e.setNom("NewNom");
        
        mockMvc.perform(put("/api/etudiants/" + e.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(e)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom", is("NewNom")));
    }

    @Test
    public void shouldDeleteEtudiant() throws Exception {
        Etudiant e = etudiantRepository.save(new Etudiant(null, "del@test.com", "CNE", "Del", "Del", "000", testFiliere));

        mockMvc.perform(delete("/api/etudiants/" + e.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/etudiants/" + e.getId()))
                .andExpect(status().isNotFound());
    }
}
