import React, { useState } from 'react';

const Popup = ({ collectionData, onClose }) => {
  // State to manage the visibility of the popup
  const [isOpen, setIsOpen] = useState(true);

  // Function to close the popup
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>Close</button>
        <h2>BoardGameGeek Collection</h2>
      </div>
    </div>
  );
};

export default Popup;