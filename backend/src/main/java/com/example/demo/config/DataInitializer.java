package com.example.demo.config;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            FiliereRepository filiereRepository,
            EtudiantRepository etudiantRepository,
            EntrepriseRepository entrepriseRepository,
            EncadrantAcademiqueRepository encadrantAcademiqueRepository,
            StageRepository stageRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Users
            if (userRepository.count() == 0) {
                userRepository.save(new User("admin", passwordEncoder.encode("admin"), "ROLE_ADMIN"));
                userRepository.save(new User("user", passwordEncoder.encode("user"), "ROLE_USER"));
            }

            // Filieres
            Filiere isi = new Filiere(null, "Ingénierie des Systèmes d'Information", null);
            filiereRepository.save(isi);

            Filiere smi = new Filiere(null, "Sciences Mathématiques et Informatique", null);
            filiereRepository.save(smi);

            Filiere sma = new Filiere(null, "Sciences Mathématiques et Applications", null);
            filiereRepository.save(sma);

            Filiere irs = new Filiere(null, "Ingénierie des Réseaux et Systèmes", null);
            filiereRepository.save(irs);

            // Responsables
            ResponsableFiliere respIsi = new ResponsableFiliere(null, "Jarir", "Zahi", "Professeur", "z.jarir@uca.ma", "0600000000", isi);
            isi.setResponsable(respIsi);
            filiereRepository.save(isi);

            ResponsableFiliere respSmi = new ResponsableFiliere(null, "Amine", "Khalid", "Professeur", "k.amine@uca.ma", "0611111111", smi);
            smi.setResponsable(respSmi);
            filiereRepository.save(smi);

            ResponsableFiliere respIrs = new ResponsableFiliere(null, "Sidi Ali", "Moussa", "Professeur", "m.sidiali@uca.ma", "0622222222", irs);
            irs.setResponsable(respIrs);
            filiereRepository.save(irs);

            // Students
            Etudiant s1 = new Etudiant(null, "ahmed.idrissi@test.com", "G130001", "El Idrissi", "Ahmed", "0612345678", isi);
            Etudiant s2 = new Etudiant(null, "fatima.alami@test.com", "G130002", "Alami", "Fatima", "0612345679", isi);
            Etudiant s3 = new Etudiant(null, "yassine.bennani@test.com", "G130003", "Bennani", "Yassine", "0612345680", smi);
            Etudiant s4 = new Etudiant(null, "sara.toumi@test.com", "G130004", "Toumi", "Sara", "0612345681", smi);
            Etudiant s5 = new Etudiant(null, "mohamed.rezki@test.com", "G130005", "Rezki", "Mohamed", "0612345682", irs);
            Etudiant s6 = new Etudiant(null, "hind.khalil@test.com", "G130006", "Khalil", "Hind", "0612345683", irs);
            Etudiant s7 = new Etudiant(null, "omar.farid@test.com", "G130007", "Farid", "Omar", "0612345684", sma);
            Etudiant s8 = new Etudiant(null, "meriem.naji@test.com", "G130008", "Naji", "Meriem", "0612345685", isi);
            
            etudiantRepository.save(s1);
            etudiantRepository.save(s2);
            etudiantRepository.save(s3);
            etudiantRepository.save(s4);
            etudiantRepository.save(s5);
            etudiantRepository.save(s6);
            etudiantRepository.save(s7);
            etudiantRepository.save(s8);

            // Enterprises
            Entreprise e1 = new Entreprise(null, "OCP Group", "Bd de la Grande Ceinture", "0522123456", "contact@ocp.ma", "Casablanca", "Maroc", "Dr. Benjeloun", "Mr. HR", "hr@ocp.ma", "0661000001");
            Entreprise e2 = new Entreprise(null, "Maroc Telecom", "Avenue Annakhil", "0537123456", "info@iam.ma", "Rabat", "Maroc", "Mme. Ahlam", "Mr. Tech", "tech@iam.ma", "0661000002");
            Entreprise e3 = new Entreprise(null, "DXC Technology", "Technopolis", "0538123456", "jobs@dxc.com", "Sale", "Maroc", "Mr. Director", "Mme. Lead", "lead@dxc.com", "0661000003");
            Entreprise e4 = new Entreprise(null, "Capgemini", "Casanearshore", "0522456789", "recruit.ma@capgemini.com", "Casablanca", "Maroc", "Mr. Smith", "Mme. Dubois", "dubois@cap.com", "0661000004");
            
            entrepriseRepository.save(e1);
            entrepriseRepository.save(e2);
            entrepriseRepository.save(e3);
            entrepriseRepository.save(e4);

            // Academic Supervisors
            EncadrantAcademique p1 = new EncadrantAcademique(null, "Prof. Belghiti", "Informatique", "FSSM");
            EncadrantAcademique p2 = new EncadrantAcademique(null, "Prof. Daoudi", "Informatique", "FSSM");
            EncadrantAcademique p3 = new EncadrantAcademique(null, "Prof. Erradi", "Informatique", "FSSM");
            encadrantAcademiqueRepository.save(p1);
            encadrantAcademiqueRepository.save(p2);
            encadrantAcademiqueRepository.save(p3);

            // Stages 2026
            stageRepository.save(new Stage(null, "Développement Microservices avec Spring Boot", 
                    LocalDate.of(2026, 2, 1), LocalDate.of(2026, 6, 30),
                    "Modernisation de l'infrastructure backend", "Agilité et Scalabilité",
                    "Spring Cloud", "DevOps", "Java, Docker, K8s", s1, e1, p1));

            stageRepository.save(new Stage(null, "Application Mobile Flutter pour la logistique", 
                    LocalDate.of(2026, 3, 1), LocalDate.of(2026, 7, 31),
                    "Suivi des colis en temps réel", "Optimisation des livraisons",
                    "Flutter / Firebase", "Scrum", "Dart, Firebase", s2, e3, p2));

            stageRepository.save(new Stage(null, "Analyse prédictive des données clients", 
                    LocalDate.of(2026, 2, 15), LocalDate.of(2026, 6, 15),
                    "Utilisation de l'IA pour le churn rate", "Réduction de la perte client",
                    "Modèles ML", "CRISP-DM", "Python, Pandas, Scikit-Learn", s3, e2, p3));

            // Stages 2025
            stageRepository.save(new Stage(null, "Implémentation d'un ERP Open Source", 
                    LocalDate.of(2025, 2, 1), LocalDate.of(2025, 6, 30),
                    "Déploiement et personnalisation d'Odoo", "Centralisation des données",
                    "Système ERP fonctionnel", "Agile", "Python, XML, PostgreSQL", s4, e4, p1));

            stageRepository.save(new Stage(null, "Optimisation d'un réseau SDN", 
                    LocalDate.of(2025, 3, 1), LocalDate.of(2025, 7, 31),
                    "Configuration de contrôleurs SDN", "Performance réseau",
                    "Réseau optimisé", "Expérimentale", "Mininet, OpenFlow", s5, e1, p2));

            // Stages 2024
            stageRepository.save(new Stage(null, "Audit de sécurité Cloud", 
                    LocalDate.of(2024, 2, 1), LocalDate.of(2024, 6, 30),
                    "Analyse des vulnérabilités AWS", "Sécurisation des instances",
                    "Rapport d'audit", "NIST", "AWS, Terraform, Checkov", s6, e3, p3));

            stageRepository.save(new Stage(null, "Modélisation mathématique financière", 
                    LocalDate.of(2024, 3, 1), LocalDate.of(2024, 7, 31),
                    "Prédiction des cours boursiers", "Précision des modèles",
                    "Modèle de prédiction", "Black-Scholes", "Matlab, R", s7, e2, p1));

            stageRepository.save(new Stage(null, "Refonte d'un portail E-learning", 
                    LocalDate.of(2026, 4, 1), LocalDate.of(2026, 8, 31),
                    "Passage d'une architecture monolithique vers React", "Expérience utilisateur",
                    "Nouveau portail", "Agile", "React, Node.js, MongoDB", s8, e4, p2));

            // Generate 100+ entries dynamically
            String[] subjects = {"Audit Sécurité", "DevOps Pipeline", "Migration Cloud", "Deep Learning", "Blockchain implementation", "Réseaux 5G", "Smart City", "E-health App", "FinTech Solution", "Green IT Audit"};
            Filiere[] allFilieres = {isi, smi, sma, irs};
            Entreprise[] allEntreprises = {e1, e2, e3, e4};
            EncadrantAcademique[] allProfs = {p1, p2, p3};

            for (int i = 1; i <= 100; i++) {
                Filiere fil = allFilieres[i % allFilieres.length];
                Etudiant student = new Etudiant(null, "student" + i + "@fssm.ma", "CNE" + (1000 + i), "Nom" + i, "Prenom" + i, "06" + String.format("%08d", i), fil);
                etudiantRepository.save(student);

                int year = 2024 + (i % 3); // 2024, 2025, 2026
                Entreprise ent = allEntreprises[i % allEntreprises.length];
                EncadrantAcademique prof = allProfs[i % allProfs.length];
                String sub = subjects[i % subjects.length] + " #" + i;

                stageRepository.save(new Stage(null, sub, 
                        LocalDate.of(year, 3, 1), LocalDate.of(year, 7, 31),
                        "Description détaillée pour " + sub, "Objectifs spécifiques",
                        "Solution technique proposée", "Méthodologie agile", "Outils variés", student, ent, prof));
            }

            System.out.println("Massive demo data (100+ stages) initialized successfully!");
        };
    }
}
