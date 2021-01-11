import { useContext } from 'react';
import { NotificationContext } from '@//:modules/focus/notification/provider/NotificationProvider';

export default () => useContext(NotificationContext).actions;
