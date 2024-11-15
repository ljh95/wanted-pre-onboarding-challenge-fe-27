import { AxiosError } from "axios";
import { todoApi } from "../api/todo.api";

export class TodoService {
  private static instance: TodoService;

  public static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }
  private constructor() {}

  public async getTodoList(params?: TodoFilterType) {
    try {
      const response = await todoApi.getTodoList(params);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Get todo list failed: ${error.message}`);
      throw error;
    }
  }

  public async getTodoById(id: string) {
    try {
      const response = await todoApi.getTodoById(id);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Get todo by id failed: ${error.message}`);
      throw error;
    }
  }

  public async createTodo(body: CreateTodoRequest) {
    try {
      const response = await todoApi.createTodo(body);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Create todo failed: ${error.message}`);
      throw error;
    }
  }

  public async updateTodo(id: string, body: CreateTodoRequest) {
    try {
      const response = await todoApi.updateTodo(id, body);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Update todo failed: ${error.message}`);
      throw error;
    }
  }

  public async deleteTodo(id: string) {
    try {
      const response = await todoApi.deleteTodo(id);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(`Delete todo failed: ${error.message}`);
      throw error;
    }
  }
}
