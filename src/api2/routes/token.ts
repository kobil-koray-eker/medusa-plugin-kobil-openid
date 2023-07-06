import axios from "axios";
import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export default (router) => {
  router.post("/token", async (req: Request, res: Response) => {
    const { redirectUrl: REDIRECT_URI, code: AUTHORIZATION_CODE } = req.body;

    const body = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: AUTHORIZATION_CODE,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    };

    try {
      const response = await axios.post(
        // "https://idp.monaco-arabox-test-i5loq.midentity.dev/auth/realms/korayeker777/protocol/openid-connect/token",
        "https://idp.neom-poc.shift.kobil.com/auth/realms/kurtis/protocol/openid-connect/token",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const decoded = jwt_decode<any>(response.data.access_token);
      console.log(decoded.email);
      return res.json(response.data);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
};
