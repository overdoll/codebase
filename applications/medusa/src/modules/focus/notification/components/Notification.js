import { useRef, useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../provider/NotificationProvider';

const Notification = ({ type, children, duration, id }) => {
  const { onExpire } = useContext(NotificationContext);

  const timer = useRef();

  const [dismissing, updateDismissing] = useState(false);

  const onEnd = () => {
    timer.current = null;
    onExpire(id);
  };

  const dismiss = () => {
    if (!dismissing) {
      updateDismissing(true);
      setTimeout(() => {
        onEnd();
      }, 500);
    }
  };

  const setTimer = () => {
    timer.current = setTimeout(() => {
      dismiss();
    }, duration);
  };

  useEffect(() => {
    if (duration) {
      setTimer();
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div
      sx={{
        width: '100%',
        boxShadow: '200',
        padding: 1,
        borderRadius: 'notification',
        backgroundColor: 'orange.100',
        display: 'flex',
        mb: 1,
      }}
    >
      <div>icon</div>
      <div sx={{ color: 'orange.900', fontFamily: 'body', fontSize: 0 }}>
        {children}
      </div>
      <div onClick={() => onExpire(id)}>x</div>
    </div>
  );
};

export default Notification;
