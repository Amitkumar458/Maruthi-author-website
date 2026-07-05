import PhotoCarousel from "@/components/AboutAuthor/PhotoCarousel";
import CertificatesSection from "@/components/AboutAuthor/CertificatesSection";

export default function AboutAuthor() {
    return (
        <main className="overflow-x-hidden">
            <PhotoCarousel />
            <CertificatesSection />
        </main>
    );
}