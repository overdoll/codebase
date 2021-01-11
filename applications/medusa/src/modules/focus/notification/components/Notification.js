import { useRef, useState, useEffect, useContext } from 'react';
import { NotificationContext } from '@//:modules/focus/notification/provider/NotificationProvider';

const Notification = ({ type, children, duration }) => {
  const { onExpire } = useContext(NotificationContext);

  const timer = useRef();

  const [dismissing, updateDismissing] = useState(false);

  const onEnd = () => {
    timer.current = null;
    onExpire();
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
    <div>
      <div>icon</div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Notification;
