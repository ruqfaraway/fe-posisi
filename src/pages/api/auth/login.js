// import { pick } from 'lodash'
import { withSessionRoute } from "@/utils/sessionWrapper";
import { createClientComponent } from "@/utils/supabase/components";

export default withSessionRoute(async ({ req, res }) => {
  console.log(req, res, '<== req, res')
  console.log('kepanggil')
  const { email, password } = req?.body;
  const supabase = createClientComponent();
  if (req.method === "POST") {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(response, "response");
      // apiService.request({
      // 	method: 'POST',
      // 	url: `/auth/login`,
      // 	data: {
      // 		username,
      // 		password
      // 	}
      // })
      const pickAuth = response?.data?.data;
      req.session.auth = pickAuth;
      req.session.lastActivity = Date.now();
      await req.session.save();
      res.status(200).send("Logged In!");
    } catch (error) {
      if (error?.response?.status === 404) {
        res.status(404).send({
          message: "Username atau Password Salah!",
          errors: ["Username atau Password Salah!"],
        });
      } else {
        res
          .status(error?.response?.status ?? 500)
          .send(error?.response?.data, error?.response?.data ?? error);
      }
    }
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
});
