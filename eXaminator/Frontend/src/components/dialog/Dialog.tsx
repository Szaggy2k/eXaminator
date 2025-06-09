import React, { useRef, useEffect, useCallback, PropsWithChildren, useState } from "react";
import CloseIcon from "~components/icons/CloseIcon";

export type UseDialog = {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;
	title?: string;
};

export const useDialog = (title?: string) => {
	const [isOpen, setOpen] = useState(false);
	const openDialog = () => setOpen(true);
	const closeDialog = () => setOpen(false);
	const returnValue: UseDialog = { isOpen, openDialog, closeDialog, title };
	return returnValue;
};

interface IDialogProps extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	hideX?: boolean;
}

const Dialog: React.FC<IDialogProps> = ({ isOpen, onClose, title, children, hideX }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialogElement = dialogRef.current;
		if (dialogElement) {
			if (isOpen) {
				if (!dialogElement.open) {
					dialogElement.showModal();
				}
			} else {
				if (dialogElement.open) {
					dialogElement.close();
				}
			}
		}
	}, [isOpen]);

	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	useEffect(() => {
		const dialogElement = dialogRef.current;
		if (dialogElement) {
			dialogElement.addEventListener("close", handleClose);
			return () => {
				dialogElement.removeEventListener("close", handleClose);
			};
		}
	}, [handleClose]);

	const handleBackdropClick = useCallback(
		(event: React.MouseEvent<HTMLDialogElement>) => {
			if (dialogRef.current && event.target === dialogRef.current) {
				onClose();
			}
		},
		[onClose],
	);

	return (
		isOpen && (
			<dialog
				ref={dialogRef}
				className="p-0 border-none min-w-xs sm:min-w-xl justify-self-center self-center shadow-xl outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm"
				onClick={handleBackdropClick}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? "dialog-title" : undefined}>
				<div className="p-5 bg-neutral-900">
					<div className="flex justify-between items-start">
						{title && (
							<h2 id="dialog-title" className="text-lg font-light text-white">
								{title}
							</h2>
						)}
						{!hideX && (
							<button onClick={onClose} className="text-neutral-400 hover:text-white focus:text-white rounded-full" aria-label="Close dialog">
								<CloseIcon />
							</button>
						)}
					</div>
					<div className="mt-4 flex flex-col justify-center">{children}</div>
				</div>
			</dialog>
		)
	);
};

export default Dialog;
