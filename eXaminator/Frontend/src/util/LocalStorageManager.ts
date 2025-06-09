type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export enum LocalStorageKeys {
	ServerAddress = "serverAddress",
	ParticlesEnabled = "particlesEnabled",
}

export default class LocalStorageManager {
	static setItem<T extends JsonValue>(key: LocalStorageKeys, value: T): void {
		try {
			const json = JSON.stringify(value);
			localStorage.setItem(key, json);
		} catch (error) {
			console.error(`Error saving key "${key}" to localStorage:`, error);
		}
	}

	static getItem<T extends JsonValue>(key: LocalStorageKeys): T | null {
		try {
			const json = localStorage.getItem(key);
			if (!json) return null;
			return JSON.parse(json) as T;
		} catch (error) {
			console.error(`Error reading key "${key}" from localStorage:`, error);
			return null;
		}
	}

	static removeItem(key: LocalStorageKeys): void {
		localStorage.removeItem(key);
	}

	static clear(): void {
		localStorage.clear();
	}
}
