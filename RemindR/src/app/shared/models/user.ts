import {Subscriptions} from './subscription';

export interface User {
  id: string;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  subscriptions: Subscriptions[];
}
