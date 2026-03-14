import React from "react";

const AdminFooterComponent: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">{currentYear} © Sommy Properties.</div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooterComponent;
