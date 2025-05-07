import { useEffect, useState } from 'react';
import './dialog.css';
import { AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
const ConfirmDialog = ({
  delayConfirm,
  closeBtnColor,
  confirmBtnColor,
  icon,
  open,
  onClose,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure you want to perform this action?',
}) => {
  const [delay, setDelay] = useState(delayConfirm || 3);
  useEffect(() => {
    setDelay(delayConfirm || 3);
    const interval = setInterval(() => {
      setDelay((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);
  return (
    <div
      open={open}
      onClose={onClose}
      onClick={onClose}
      className={`dialog-backdrop ${open ? 'show' : 'hide'}`}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-title">
          <div className="dialog-icon">{icon || <AlertCircle size={30} color="red" />}</div>
          <p>{title}</p>
        </div>
        <div className="dialog-message">{message}</div>
        <div className="dialog-btns">
          <Button
            backgroundColor={confirmBtnColor || 'rgb(237, 72, 72)'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            value={`Confirm ${delay > 0 ? `(${delay})` : ''}`}
            disable={delay > 0}
          />
          <Button
            backgroundColor={closeBtnColor || 'white'}
            color={'black'}
            onClick={onClose}
            value={'Close'}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
