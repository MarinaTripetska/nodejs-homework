const authController = require("./auth");
const { authService } = require("../services");

describe("Auth Controller", () => {
  describe("Register", () => {
    test("Old User should not be able to register again", async () => {
      authService.registerUser = jest.fn((data) => {
        throw new Error();
      });

      const req = {
        body: {
          email: "UserName",
          password: "qwerty123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      const next = jest.fn();

      await authController.registerUser(req, res, next);
      expect(next).toBeCalledTimes(1);
    });

    test("New User should register with email", async () => {
      const next = jest.fn();

      authService.registerUser = jest.fn((data) => data);

      const req = {
        body: {
          email: "UserName",
          password: "qwerty123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      const result = await authController.registerUser(req, res, next);

      expect(result.code).toBe(201);
      expect(result.data.user.email).toBe("UserName");
      expect(result.data.user.password).toBeUndefined();
      expect(next).toBeCalledTimes(0);
    });
  });

  describe("Login", () => {
    test("User can't login with uncorrect creds", async () => {
      authService.loginUser = jest.fn((data) => {
        throw new Error();
      });

      const req = {
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      const next = jest.fn();

      await authController.loginUser(req, res, next);
      expect(next).toBeCalledTimes(1);
    });

    test("User should login with correct creds", async () => {
      const next = jest.fn();

      const req = {
        body: {
          email: "test@email.com",
          password: "qwerty123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };

      authService.loginUser = jest.fn(() => {
        return {
          email: "test@email.com",
          token: "testToken",
          subscription: "starter",
          avatarURL: "someUrlToAvatar",
        };
      });

      const result = await authController.loginUser(req, res, next);

      expect(result.data instanceof Object).toBe(true);

      expect(result.code).toBe(200);
      expect(result.status).toBe("Success");

      expect(result.data.token).toBe("testToken");
      expect(typeof result.data.token).toBe("string");

      expect(result.data.user.email).toBe("test@email.com");
      expect(typeof result.data.user.email).toBe("string");

      expect(result.data.user.subscription).toBe("starter");
      expect(typeof result.data.user.subscription).toBe("string");

      expect(result.data.user.avatarURL).toBe("someUrlToAvatar");
      expect(typeof result.data.user.avatarURL).toBe("string");

      expect(result.data.user.password).toBeUndefined();
      expect(next).toBeCalledTimes(0);
    });
  });

  describe("Logout", () => {
    test("User can logout with correct id", async () => {
      const next = jest.fn();
      authService.logoutUser = jest.fn((data) => undefined);
      const req = {
        user: {
          id: "idString",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
      };

      const result = await authController.logoutUser(req, res, next);
      expect(result).toBeUndefined();
      //   expect(next).toBeCalledTimes(0); //??????????????
    });
  });
});
