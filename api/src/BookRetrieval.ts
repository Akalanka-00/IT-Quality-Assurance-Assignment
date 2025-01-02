import { APIRequestContext,expect } from "playwright/test";
import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../model/ServerResponse";
import { UserRole } from "../enum/UserRole";

export class BookRetrieval {
  private request: APIRequestContext;
  private requestHandler: RequestHandler;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.requestHandler = new RequestHandler(request);
  }

  public async retrieveAllBooks(role: UserRole) {
    
      const response: ServerResponse = await this.requestHandler.getRequest(role,"/api/books");
      expect(response.status).toBe(200);
      expect(response.json).toBeInstanceOf(Array);
      console.log(`All books retrieved successfully for role: ${role}.`);
      return response.json;
  }

  public async retrieveBookById(role: UserRole, bookId: number) {
    
      const response: ServerResponse = await this.requestHandler.getRequest(role,`/api/books/${bookId}`);
      expect(response.status).toBe(200);
      expect(response.json).toHaveProperty("id", bookId); 
      console.log(`Book with ID ${bookId} retrieved successfully for role: ${role}.`);
      return response.json;
  }

  public async retrieveBookByNonExistID(role:UserRole, bookId:number){
    const response: ServerResponse = await this.requestHandler.getRequest(role,`/api/books/${bookId}`);
    expect(response.status).toBe(404);
    expect(response.json).toBe('"Book not found"');
    console.log(`Attempted to retrieve book with invalid ID: ${bookId}`);
    return response.json;
  }

  public async retrieveBookByInvalidIDorNull(role:UserRole,param:String){
    const response: ServerResponse = await this.requestHandler.getRequest(role,`/api/books/${param}`);
    expect(response.status).toBe(400);
    console.log(`Attempted to retrieve book with invalid or null parameter: ${param}`);
    return response;
  }
}