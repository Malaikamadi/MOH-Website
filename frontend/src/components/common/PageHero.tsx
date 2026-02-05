interface PageHeroProps {
    title: string;
    breadcrumbs: { label: string; href?: string }[];
}

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
    return (
        <section className="page-hero">
            <div className="container">
                <div className="page-hero-content">
                    <h1>{title}</h1>
                    <nav className="breadcrumb">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={index}>
                                {crumb.href ? (
                                    <a href={crumb.href}>{crumb.label}</a>
                                ) : (
                                    <span>{crumb.label}</span>
                                )}
                                {index < breadcrumbs.length - 1 && <span>/</span>}
                            </span>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}
