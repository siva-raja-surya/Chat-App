import expect from "expect";
import { generateLocationMessage, generateMessage } from "./message";

// import { generateMessage, generateLocationMessage } from "./message/";

describe("Generate Message ", () => {
  it("Should generate correct message object", () => {
    let from = "surya",
      text = "hi buddy",
      message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });

  describe("Generate Location Message", () => {
    it("should generate correct location", () => {
      let from = "Claire",
        lat = 15,
        lng = 56,
        url = `http://www.google.com/maps?q=${lat}, ${lng}`;
      message = generateLocationMessage(from, lat, lng);

      expect(typeof message.createdAt).toBe("number");
      expect(message).toMatchObject({ from, url });
    });
  });
});
