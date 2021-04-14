/**
 * @flow
 */
import type { Node } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { NotificationContext } from '../provider/NotificationProvider';
import Icon from '@//:modules/content/icon/Icon';
import Close from '@streamlinehq/streamlinehq/img/streamline-regular/close-Jttv3X.svg';
import AlertTriangle from '@streamlinehq/streamlinehq/img/streamline-bold/alert-triangle-inprQ2.svg';
import RoadSignNoEntry from '@streamlinehq/streamlinehq/img/streamline-bold/road-sign-no-entry-49rOC0.svg';
import CheckCircle1 from '@streamlinehq/streamlinehq/img/streamline-bold/check-circle-1-jUA7gT.svg';

type Type = 'success' | 'error' | 'warning';

type Props = {
  type: Type,
  children?: Node,
  duration: ?number,
  id: string,
};

export default function Notification({
  type,
  children,
  duration,
  id,
}: Props): Node {
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

  useEffect(() => {
    if (duration) {
      timer.current = setTimeout(() => {
        dismiss();
      }, duration);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  // Set notification icon based on the type
  const notificationIcon = () => {
    switch (type) {
      case 'error':
        return RoadSignNoEntry;
      case 'warning':
        return AlertTriangle;
      case 'success':
      default:
        return CheckCircle1;
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
          pl: 1,
        }}
      />
      <div
        sx={{
          fontFamily: 'body',
          fontSize: 0,
          pl: 6,
          pr: 6,
          variant: theme,
        }}
      >
        {children}
      </div>
      <Icon
        title="close"
        size={16}
        onClick={() => onExpire(id)}
        icon={Close}
        stroke={theme}
        strokeWidth={2}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          right: 0,
          bottom: 0,
          pr: 1,
        }}
      />
    </div>
  );
}
