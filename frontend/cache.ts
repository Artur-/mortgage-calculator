import { FlexibleStorage } from "flexible-storage";

class Cache {
  private flexibleStorage = new FlexibleStorage(
    localStorage,
    "mortgage_calculator_"
  );
  get(key: string): any {
    return this.flexibleStorage.pull(key);
  }
  put(key: string, value: any) {
    this.flexibleStorage.push(key, value);
  }
}

export const cache = new Cache();
