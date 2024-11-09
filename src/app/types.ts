interface ProjectTranslation {
    name: string;
}

interface ProjectImage {
    directus_files_id: { id: string };
}

interface ProjectItem {
    model: { id: string };
    drop: string;
    translations: ProjectTranslation[];
    project: { id: string };
    images: ProjectImage[];
}
