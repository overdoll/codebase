/**
 * @flow
 */
import { useContext } from 'react';
import { NotificationContext } from '@//:modules/focus/notification/provider/NotificationProvider';

type Action = {
  (content: string, duration: ?number): void,
};

type Actions = {
  warn: Action,
  error: Action,
  success: Action,
};

export default function UseNotify(): Actions {
  return useContext(NotificationContext).actions;
}
