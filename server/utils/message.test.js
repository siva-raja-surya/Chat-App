let expect = require("expect");

var { generateMessage } = require("./message");

describe("Generate Message ", () => {
  it("Should generate correct message object", () => {
    let from = "surya",
      text = "hi buddy",
      message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from,text});
  });
});
