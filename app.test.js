import request from 'supertest';
import app from './app.js';

describe("POST /users", () => {

    describe("given a username and password", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            });
            expect(response.statusCode).toBe(200);
        });
        test("should specify json in content type header", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            });
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        });
        test("response has a user id", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            });
            expect(response.body.userId).toBeDefined();
        });

        describe("when a username and password is missing", () => {
            test("should respond with a 400 status code", async () => {
                const response = await request(app).post("/users").send({
                    username: "username"
                });
                expect(response.statusCode).toBe(400);
            });
        });
        
    });    
});