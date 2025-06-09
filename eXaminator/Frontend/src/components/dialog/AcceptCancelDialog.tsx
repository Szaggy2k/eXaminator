import Button from "~components/form/Button";
import Dialog, { UseDialog } from "./Dialog";

interface IAcceptCancelDialogProps {
	dialog: UseDialog;
	onAccept: () => void;
	onCancel?: () => void;
	text: string;
	disabled?: boolean;
	crucial?: boolean;
	acceptText?: string;
}

function AcceptCancelDialog({ dialog, onAccept, text, onCancel, crucial, disabled, acceptText }: IAcceptCancelDialogProps) {
	const cancel = () => {
		if (disabled) return;
		onCancel?.();
		dialog.closeDialog();
	};

	return (
		<Dialog title={dialog.title} hideX isOpen={dialog.isOpen} onClose={cancel}>
			<h3 className="text-white">{text}</h3>
			<div className="flex justify-between gap-10 mt-4">
				<Button disabled={disabled} onClick={cancel}>
					Anuluj
				</Button>
				<Button disabled={disabled} error={crucial} onClick={onAccept}>
					{acceptText ?? "Ok"}
				</Button>
			</div>
		</Dialog>
	);
}

export default AcceptCancelDialog;
