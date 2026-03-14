import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string; // should be in international format, e.g., "2348103139891"
}

const WhatsAppButtonComponent: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  const message = 'Hello! I have a question about your services.';

  const handleClick = () => {
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        cursor: 'pointer',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
      title="Chat with us on WhatsApp"
    >
      <img
        src="//client/img/WhatsApp-Logo.png"
        width="35"
        height="35"/>
    </div>
  );
};

export default WhatsAppButtonComponent;
