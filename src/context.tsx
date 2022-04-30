import React from 'react';
import { IAnnouncement } from './types/types';
const Context = React.createContext<IAnnouncement[] | null>(null);
export default Context;
