package com.example.demo.service;

import com.example.demo.model.Stage;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;

@Service
public class StageExportService {

    public byte[] exportToPdf(Stage stage) {
        return exportStagesToPdf(java.util.List.of(stage), "Fiche de Stage PFE");
    }

    public byte[] exportStagesToPdf(java.util.List<Stage> stages, String titleText) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, baos);

        document.open();

        // Title
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);
        fontTitle.setColor(new Color(0, 102, 204));

        Paragraph title = new Paragraph(titleText, fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph("\n"));

        for (Stage stage : stages) {
            if (stages.size() > 1) {
                Font fontSubTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                fontSubTitle.setSize(14);
                document.add(new Paragraph("Stage: " + stage.getSujet(), fontSubTitle));
            }

            // Content Table
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            addCell(table, "Étudiant", stage.getEtudiant().getNom() + " " + stage.getEtudiant().getPrenom());
            addCell(table, "CNE", stage.getEtudiant().getCne());
            addCell(table, "Filière", stage.getEtudiant().getFiliere().getIntitule());
            addCell(table, "Sujet", stage.getSujet());
            addCell(table, "Entreprise", stage.getEntreprise().getNom() + " (" + stage.getEntreprise().getVille() + ")");
            addCell(table, "Encadrant Académique", stage.getEncadrantAcademique().getNom());
            addCell(table, "Période", stage.getDateDebut() + " au " + stage.getDateFin());

            document.add(table);

            if (stages.size() == 1) {
                // Sections
                addSection(document, "Description", stage.getDescription());
                addSection(document, "Démarche / Méthodologie", stage.getDemarche());
                addSection(document, "Solution / Résultats", stage.getSolution());
                addSection(document, "Technologies utilisées", stage.getOutils());
            } else {
                document.add(new Paragraph("\n---"));
            }
        }

        document.close();
        return baos.toByteArray();
    }

    private void addCell(PdfPTable table, String label, String value) {
        Font fontLabel = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontLabel.setSize(11);
        
        PdfPCell cellLabel = new PdfPCell(new Phrase(label, fontLabel));
        cellLabel.setBackgroundColor(new Color(240, 240, 240));
        cellLabel.setPadding(5);
        table.addCell(cellLabel);

        PdfPCell cellValue = new PdfPCell(new Phrase(value != null ? value : "-"));
        cellValue.setPadding(5);
        table.addCell(cellValue);
    }

    private void addSection(Document document, String title, String content) {
        if (content == null || content.isEmpty()) return;
        
        Font fontSection = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontSection.setSize(13);
        fontSection.setColor(new Color(0, 102, 204));

        try {
            document.add(new Paragraph("\n"));
            document.add(new Paragraph(title, fontSection));
            document.add(new Paragraph(content));
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }
}
