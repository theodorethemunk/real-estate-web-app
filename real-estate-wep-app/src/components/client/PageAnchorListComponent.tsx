import React from "react";

type PageAnchorListComponentProps = {
  title: string;
  categories: { name: string; href: string }[];
};

const PageAnchorListComponent: React.FC<PageAnchorListComponentProps> = ({ title, categories }) => {
  return (
    <div className="categories-area d-none d-md-block">
      <h3>{title}</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href={category.href}>
              {category.name}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageAnchorListComponent;
