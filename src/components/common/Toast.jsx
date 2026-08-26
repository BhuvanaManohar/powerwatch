import { useEffect } from 'react';
import { SparklesIcon, XIcon } from './Icons';
import '../../styles/Toast.css';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="pw-toast" role="alert">
        <div className="toast-icon-box">
          <SparklesIcon size={20} />
        </div>
        <div className="toast-text-box">
          <div className="toast-title">{toast.title || 'PowerWatch Notice'}</div>
          <div className="toast-desc">{toast.message}</div>
        </div>
        <button 
          type="button" 
          className="toast-close-btn" 
          onClick={onClose}
          aria-label="Dismiss notice"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
