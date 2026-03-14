import React from "react";

type HeroComponentLiteProps = {
  breadcrumbLinks: { href: string; text: string }[];
  title: string;
};

const HeroComponentLite: React.FC<HeroComponentLiteProps> = ({
  breadcrumbLinks,
  title,
}) => {
  return (
    <div className="hero-inner-section-area-sidebar">
      <img src="/client/img/all-images/hero/hero-img1.png" alt="page-header-bg-image" className="hero-img1" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-header-area text-center">
              <a href={breadcrumbLinks[0]?.href}>
                {breadcrumbLinks.map((link, index) => (
                  <span key={index}>
                    {link.text}
                    {index < breadcrumbLinks.length - 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                      </svg>
                    )}
                  </span>
                ))}
              </a>
              <div className="space24"></div>
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponentLite;
