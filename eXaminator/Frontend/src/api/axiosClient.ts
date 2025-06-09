import axios from "axios";
import LocalStorageManager, { LocalStorageKeys } from "~root/util/LocalStorageManager";

const serverAddress = LocalStorageManager.getItem<string>(LocalStorageKeys.ServerAddress) ?? "localhost";

const axiosClient = axios.create({
	baseURL: `http://${serverAddress}/api/`,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getVersion() {
	const response = await axiosClient.get<string>("version");
	return response.data;
}

export default axiosClient;
