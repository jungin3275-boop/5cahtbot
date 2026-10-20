import { ChatWorkspace } from "@/components/chat-workspace";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const aiEnabled = Boolean(process.env.OPENAI_API_KEY?.trim());
  return <ChatWorkspace aiEnabled={aiEnabled} />;
}
