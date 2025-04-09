import React, { useEffect } from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.content}>
                {type === 'success' && <span className={styles.icon}>✓</span>}
                {type === 'error' && <span className={styles.icon}>✗</span>}
                {type === 'warning' && <span className={styles.icon}>⚠</span>}
                {type === 'info' && <span className={styles.icon}>ℹ</span>}
                <p className={styles.message}>{message}</p>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
                ×
            </button>
        </div>
    );
};

export default Toast;