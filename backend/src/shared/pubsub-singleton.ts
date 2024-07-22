import { PubSub } from "graphql-subscriptions";

/**
 * PubSub Singleton Class - This class will just instantiate once and use the same instance
 * to the other parts of the application instead of creating new instances every time we
 * need to publish a subscription.
 */
class PubsubSingleton {
  private static _instance: PubSub;

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new PubSub();
    return this._instance;
  }
}

export default PubsubSingleton;
