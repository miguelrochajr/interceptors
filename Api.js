import { BASE_URL } from './Constants';
import Accounts from './Accounts';
import Category from './Category';

/**
 * Auxiliary class that contains all api classes
 */
class Api {
  static accounts = new Accounts();
  static catalog = new Category();

  static getServerUrl() {
    return BASE_URL;
  }
}

export { Api };
