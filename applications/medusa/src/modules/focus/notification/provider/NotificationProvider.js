/**
 * @flow
 */
import type { Context, Node } from 'react';
import { createContext, useState } from 'react';
import Notification from '../components/Notification';

type Action = {
  (content: string, duration: ?number): void,
};

type NotificationActions = {
  actions: {
    warn: Action,
    error: Action,
    success: Action,
  },
  onExpire: any,
};

type Props = {
  children?: Node,
};

const NotificationContext: Context<NotificationActions> = createContext({});

export default function NotificationProvider(props: Props): Node {
  const [id, setId] = useState(0);

  const [active, setActive] = useState([]);
  const [expired, setExpired] = useState([]);

  const onExpire = id => {
    setExpired([...expired, id]);
  };

  const create = (type, content, duration = 5000) => {
    setActive([...active, { type, content, duration, id: `${type}-${id}` }]);

    setId(id + 1);
  };

  const warn = (content, duration = 7000) => {
    create('warn', content, duration);
  };

  const error = (content, duration = null) => {
    create('error', content, duration);
  };

  const success = (content, duration = 3000) => {
    create('success', content, duration);
  };

  return (
    <NotificationContext.Provider
      value={{
        actions: {
          warn,
          error,
          success,
        },
        onExpire,
      }}
    >
      {props.children}
      <div
        sx={{
          position: 'fixed',
          display: 'flex',
          pl: 1,
          pr: 1,
          width: '100%',
          flexDirection: 'column',
          bottom: 0,
          zIndex: 999,
        }}
      >
        {active
          .filter(item => expired.indexOf(item.id) === -1)
          .map(notification => (
            <Notification
              id={notification.id}
              key={notification.id}
              type={notification.type}
              duration={notification.duration}
            >
              {notification.content}
            </Notification>
          ))}
      </div>
    </NotificationContext.Provider>
  );
}

export { NotificationContext };
