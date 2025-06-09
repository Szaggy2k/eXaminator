import { useSnackbar } from "notistack";
import { useState } from "react";
import Button from "~components/form/Button";
import TextField from "~components/form/TextField";
import Toggle from "~components/form/Toggle";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import LocalStorageManager, { LocalStorageKeys } from "~root/util/LocalStorageManager";

interface ISettingsProps {
	onClose?: () => void;
}

function Settings({ onClose }: ISettingsProps) {
	const { onLocalStorageChanged } = useNavigationStore();
	const { enqueueSnackbar } = useSnackbar();
	const [particlesEnabled, setParticlesEnabled] = useState(LocalStorageManager.getItem<boolean>(LocalStorageKeys.ParticlesEnabled) ?? true);
	const [serverAddress, setServerAddress] = useState(LocalStorageManager.getItem<string>(LocalStorageKeys.ServerAddress) ?? "localhost");

	const onSave = () => {
		LocalStorageManager.setItem(LocalStorageKeys.ParticlesEnabled, particlesEnabled);
		if ((LocalStorageManager.getItem<string>(LocalStorageKeys.ServerAddress) ?? "localhost") !== serverAddress) {
			LocalStorageManager.setItem(LocalStorageKeys.ServerAddress, serverAddress);
			window.location.reload();
		}
		onLocalStorageChanged();
		onClose?.();
		enqueueSnackbar("Zapisano ustawienia", { variant: "success" });
	};
	return (
		<div>
			<Toggle label="Cząsteczki" checked={particlesEnabled} onChange={() => setParticlesEnabled(!particlesEnabled)} />
			<div className="w-full border-b-1 border-neutral-500 my-4" />
			<TextField
				label="Adres serwera"
				helperText="Adres IP komputera na którym włączyłeś aplikację, ustawienie odświeży stronę"
				defaultValue={serverAddress}
				onChange={(e) => setServerAddress(e.target.value)}
			/>
			<div className="w-full border-b-1 border-neutral-500 my-4" />
			<Button success onClick={onSave}>
				Zapisz
			</Button>
		</div>
	);
}

export default Settings;
