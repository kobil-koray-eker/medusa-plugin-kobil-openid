import { Request, Response } from "express";
import { BASE_URL } from "../../util/constants";
import { nonceGenerator } from "../../util/nonceGenerator";

const CLIENT_ID = process.env.CLIENT_ID;

export default (router) => {
  router.post("/auth", (req: Request, res: Response) => {
    const { redirectUrl: REDIRECT_URI } = req.body;
    const NONCE = nonceGenerator(11);

    const url = `${BASE_URL}/protocol/openid-connect/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid&response_type=code&response_mode=query&nonce=${NONCE}`;
    res.json(url);
  });
};
