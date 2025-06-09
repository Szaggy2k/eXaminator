import BugReportForm from "~components/bug-report/BugReportForm";
import Button from "~components/form/Button";
import Dialog, { useDialog } from "~components/dialog/Dialog";
import BugIcon from "~components/icons/BugIcon";
import SettingsIcon from "~components/icons/SettingsIcon";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import Settings from "~components/settings/Settings";

function MainMenu() {
	const settingsDialog = useDialog("Ustawienia");
	const bugDialog = useDialog("Zgłoś błąd");
	const { activeScreen, setActiveScreen } = useNavigationStore();
	const disabled = activeScreen !== "menu";
	return (
		<div className="size-full flex justify-center items-center">
			<div className="h-[80%] w-[300px] sm:w-[600px] flex flex-col gap-4 justify-center">
				<Button disabled={disabled} onClick={() => setActiveScreen("exam")}>
					ROZPOCZNIJ EGZAMIN
				</Button>
				<Button disabled={disabled} onClick={() => setActiveScreen("questions")}>
					PRZEGLĄDAJ PYTANIA
				</Button>
				<Button disabled={disabled} onClick={() => setActiveScreen("archive")}>
					PRZEGLĄDAJ ARCHIWUM
				</Button>
				<div className="flex justify-center gap-4">
					<Button disabled={disabled} onClick={settingsDialog.openDialog} title="Ustawienia">
						<SettingsIcon />
					</Button>
					<Dialog isOpen={settingsDialog.isOpen} onClose={settingsDialog.closeDialog} title={settingsDialog.title}>
						<Settings onClose={settingsDialog.closeDialog} />
					</Dialog>
					<Button disabled={disabled} onClick={bugDialog.openDialog} title="Zgłoś błąd">
						<BugIcon />
					</Button>
					<Dialog isOpen={bugDialog.isOpen} onClose={bugDialog.closeDialog} title={bugDialog.title}>
						<BugReportForm />
					</Dialog>
				</div>
			</div>
		</div>
	);
}

export default MainMenu;
