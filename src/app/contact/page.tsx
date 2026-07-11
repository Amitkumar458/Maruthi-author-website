import ContactSection from "@/components/Contact/ContactSection";

export const metadata = {
    title: "Contact | Mybookzz",
    description: "Get in touch with Maruthi Ram Prasad Pelluri for book enquiries, speaking events, and media requests.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Maruthi Ram Prasad Pelluri",
        url: "https://www.mybookzz.com/contact"
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <ContactSection />
        </main>
    );
}