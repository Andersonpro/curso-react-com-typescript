/* eslint-disable @typescript-eslint/no-explicit-any */
import { Api } from "../ApiConfig";
import { ApiExcepetion } from "../ErrorException";

export interface Itarefa {
  id: number;
  title: string;
  isCompleted: boolean;
}

const getAll = async (): Promise<Itarefa[] | ApiExcepetion> => {
  try {
    const { data } = await Api().get('/tarefas');
    return data;
  } catch (error: any) {
    return new ApiExcepetion(error.message || 'Erro ao consultar a Api');
  }
};

const getById = async (id: number): Promise<Itarefa[] | ApiExcepetion> => { 
  try {
    const { data } = await Api().get(`/tarefas/${id}`);
    return data;
  } catch (error: any) {
    return new ApiExcepetion(error.message || 'Erro ao consultar a Api');
  }
 };

const create = async (dataToCreate: Omit<Itarefa, 'id'>): Promise<Itarefa[] | ApiExcepetion> => {
  try {
    const { data } = await Api().post<any>('/tarefas', dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiExcepetion(error.message || 'Erro ao criar Registro');
  }
 };

const updateById = async (id: number, dataToUpdate: Itarefa): Promise<Itarefa[] | ApiExcepetion> => {
  try {
    const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiExcepetion(error.message || 'Erro ao atualizar a Api');
  }
 };

const deleteById = async (id: number): Promise<undefined | ApiExcepetion> => { 
  try {
    await Api().delete(`tarefas/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiExcepetion(error.message || 'Erro ao apagar o registro');
  }
};


export const TarefasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};