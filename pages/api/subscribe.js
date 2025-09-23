import dbConnect from "@/lib/dbConnect";
import Subscriber from "@/models/Subscriber";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const { email, name } = req.body || {};
  if (!email) return res.status(400).json({ error: "Email é obrigatório" });

  try {
    await dbConnect();
    await Subscriber.create({ email, name });
    return res.status(201).json({ message: "Inscrito com sucesso" });
  } catch (e) {
    // duplicado ou erro genérico
    return res
      .status(500)
      .json({ error: "Falha ao inscrever (talvez já inscrito)" });
  }
}
