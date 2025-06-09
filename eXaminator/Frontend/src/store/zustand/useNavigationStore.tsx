import { create } from "zustand";
import { ScreenAvailableNames } from "~components/screen-changer/Screen";
import { QuestionSet } from "~root/types/api-types";

interface NavigationState {
	activeScreen: ScreenAvailableNames;
	localStorageChanged: boolean;
	currentQuestionSet?: QuestionSet;
	setCurrentQuestionSet: (questionSet?: QuestionSet) => void;
	onLocalStorageChanged: () => void;
	setActiveScreen: (activeScreen: ScreenAvailableNames) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
	activeScreen: "menu",
	currentQuestionSet: undefined,
	setCurrentQuestionSet: (questionSet) => set(() => ({ currentQuestionSet: questionSet })),
	setActiveScreen: (activeScreen) => set(() => ({ activeScreen })),
	localStorageChanged: false,
	onLocalStorageChanged: () => set((state) => ({ localStorageChanged: !state.localStorageChanged })),
}));
