import { Question, QuestionSet } from "~root/types/api-types";
import axiosClient from "./axiosClient";

export async function getQuestionSets() {
	const response = await axiosClient.get<QuestionSet[]>("questionsets");
	return response.data;
}

export async function getQuestionSet(id: number, page: number, pageSize: number) {
	const response = await axiosClient.get<QuestionSet>(`questionsets/${id}?p=${page}&s=${pageSize}`);
	return response.data;
}

export async function getQuestionSetSize(id: number) {
	const response = await axiosClient.get<number>(`questionsets/size/${id}`);
	return response.data;
}

export async function postQuestionSet(name: string) {
	const response = await axiosClient.post<QuestionSet>("questionsets", name);
	return response.data;
}

export async function putQuestionSet(name: string, id: number) {
	const response = await axiosClient.put<QuestionSet>(`questionsets/${id}`, name);
	return response.data;
}

export async function deleteQuestionSet(id: number) {
	const response = await axiosClient.delete(`questionsets/${id}`);
	return response.data;
}

export async function postQuestion(question: Question) {
	const response = await axiosClient.post<Question>("questions", question);
	return response.data;
}

export async function putQuestion(question: Question) {
	const response = await axiosClient.put<Question>("questions", question);
	return response.data;
}

export async function deleteQuestion(questionId: number) {
	const response = await axiosClient.delete(`questions/${questionId}`);
	return response.data;
}
