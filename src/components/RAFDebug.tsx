import { useEffect, useState } from 'react';
import { rafManager } from '@/lib/rafManager';

/**
 * Debug component to monitor RAF loop status
 * Only renders in development mode
 */
const RAFDebug = () => {
  const [callbackCount, setCallbackCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Only show in development
    if (!import.meta.env.DEV) return;

    const interval = setInterval(() => {
      setCallbackCount(rafManager.getCallbackCount());
      setIsActive(rafManager.isActive());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render in production
  if (!import.meta.env.DEV) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#7CFFB2',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        border: '1px solid #7CFFB2',
      }}
    >
      <div>RAF Loop: {isActive ? '✓ Active' : '✗ Inactive'}</div>
      <div>Callbacks: {callbackCount}</div>
      <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px' }}>
        Expected: 2-3 (lenis, particles, [mouse])
      </div>
    </div>
  );
};

export default RAFDebug;
