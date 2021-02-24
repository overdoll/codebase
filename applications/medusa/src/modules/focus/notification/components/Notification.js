/**
 * @flow
 */
import type { Node } from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../provider/NotificationProvider';
import Icon from '@//:modules/content/icon/Icon';
import {
  Alerts,
  FormValidation,
} from '@streamlinehq/streamline-regular/lib/interface-essential';

type Props = {
  type: string,
  children?: Node,
  duration: ?number,
  id: string,
};

export default function Notification(props: Props): Node {
  const { children, duration, id } = props;

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
        position: 'relative',
      }}
    >
      <Icon
        icon={Alerts.AlertCircle}
        stroke="orange.500"
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
      <div sx={{ color: 'orange.900', fontFamily: 'body', fontSize: 0, pl: 4 }}>
        {children}
      </div>
      <Icon
        size="18px"
        onClick={() => onExpire(id)}
        icon={FormValidation.Close}
        stroke="orange.300"
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          right: 0,
          bottom: 0,
          pr: 0,
        }}
      />
    </div>
  );
}
