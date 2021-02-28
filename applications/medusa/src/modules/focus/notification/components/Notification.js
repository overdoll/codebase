import { useRef, useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../provider/NotificationProvider';
import Icon from '@//:modules/content/icon/Icon';
import { FormValidation } from '@streamlinehq/streamline-regular/lib/interface-essential';
import {
  Alerts as AlertsBold,
  FormValidation as FormValidationBold,
} from '@streamlinehq/streamline-bold/lib/interface-essential';
import { Signs } from '@streamlinehq/streamline-bold/lib/transportation';

const Notification = ({ type, children, duration, id }) => {
  const { onExpire } = useContext(NotificationContext);

  const timer = useRef();

  const theme = 'notifications.' + type;

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

  const notificationIcon = () => {
    if (type === 'error') {
      return Signs.RoadSignNoEntry;
    } else if (type === 'warning') {
      return AlertsBold.AlertTriangle;
    } else if (type === 'success') {
      return FormValidationBold.CheckCircle1;
    }
  };

  return (
    <div
      sx={{
        width: ['fill', 'large'],
        boxShadow: '200',
        padding: 1,
        borderRadius: 'notification',
        display: 'flex',
        margin: 'auto',
        mb: 1,
        position: 'relative',
        variant: theme,
      }}
    >
      <Icon
        size={16}
        icon={notificationIcon()}
        fill={theme}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          left: 0,
          bottom: 0,
          pl: 2,
        }}
      />
      <div
        sx={{
          fontFamily: 'body',
          fontSize: 0,
          pl: 7,
          pr: 7,
          variant: theme,
        }}
      >
        {children}
      </div>
      <Icon
        size={16}
        onClick={() => onExpire(id)}
        icon={FormValidation.Close}
        stroke={theme}
        strokeWidth={2}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          right: 0,
          bottom: 0,
          pr: 2,
        }}
      />
    </div>
  );
};

export default Notification;
