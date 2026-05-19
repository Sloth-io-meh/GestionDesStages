export interface User {
    username: string;
    role: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

export interface ResponsableFiliere {
    id?: number;
    nom: string;
    prenom: string;
    grade: string;
    email: string;
    tel: string;
}

export interface Filiere {
    id?: number;
    intitule: string;
    responsable?: ResponsableFiliere;
}

export interface Etudiant {
    id?: number;
    email: string;
    cne: string;
    nom: string;
    prenom: string;
    tel: string;
    filiere?: Filiere;
}

export interface Entreprise {
    id?: number;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    ville: string;
    pays: string;
    nomResponsable: string;
    nomEncadrant: string;
    emailEncadrant: string;
    telEncadrant: string;
}

export interface EncadrantAcademique {
    id?: number;
    nom: string;
    departement: string;
    etablissement: string;
}

export interface Stage {
    id?: number;
    sujet: string;
    dateDebut: string;
    dateFin: string;
    description: string;
    objectifs: string;
    solution: string;
    demarche: string;
    outils: string;
    etudiant: Etudiant;
    entreprise: Entreprise;
    encadrantAcademique: EncadrantAcademique;
}
