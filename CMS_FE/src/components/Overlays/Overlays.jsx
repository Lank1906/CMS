import { X } from 'lucide-react';
import './overlay.css';
const Overlays = ({ title, children, show, onClose, closeWhenClickOverlay }) => {
  return (
    <>
      <div
        className={`form-overlay ${show ? 'show' : 'hide'}`}
        onClick={closeWhenClickOverlay ? onClose : () => {}}
      >
        <div className="children-container" onClick={(e) => e.stopPropagation()}>
          <div className="close-form" onClick={onClose}>
            <X />
          </div>
          <div>
            <div className="form-title">{title}</div>
            <div className="child-container">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overlays;
