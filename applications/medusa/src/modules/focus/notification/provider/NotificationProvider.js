import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Notification from '../components/Notification';

const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
  const [id, setId] = useState(0);

  const [active, setActive] = useState([]);
  const [expired, setExpired] = useState([]);

  const onExpire = id => {
    setExpired([...expired, id]);
  };

  const create = (type, content, duration = null) => {
    setActive([...active, { type, content, duration, id: `${type}-${id}` }]);

    setId(id + 1);
  };

  const warn = (content, duration = null) => {
    create('warn', content, duration);
  };

  const error = (content, duration = null) => {
    create('error', content, duration);
  };

  return (
    <NotificationContext.Provider
      value={{
        actions: {
          warn,
          error,
        },
        onExpire,
      }}
    >
      {children}
      {createPortal(
        <div
          sx={{
            position: 'fixed',
            display: 'flex',
            pl: 1,
            pr: 1,
            width: '100%',
            flexDirection: 'column',
            bottom: 0,
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
        </div>,
        document.getElementById('root'),
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export { NotificationContext };
