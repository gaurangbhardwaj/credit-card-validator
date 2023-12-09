const app = require("../index.js");
const request = require("supertest");
const { expect } = require("chai");
const { stringConstants } = require("../app/common/constants.js");

describe("Routes", function () {
  it("responds to /", async () => {
    const res = await request(app).get("/");
    expect(res.text).equals(stringConstants.SERVICE_STATUS_HTML);
  });
});
