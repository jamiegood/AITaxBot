import { ChatWindow } from "@/components/ChatWindow";
import Link from "next/link";
export default function Home() {
  return (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4">
        Testing Examfly Chat OpenAI QnA over Documents. RAG
      </h1>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            <Link href="/retrieval">Try the AI Tax ChatBot</Link>
          </span>
        </li>
      </ul>
    </div>

    // <ChatWindow
    //   endpoint="api/chat"
    //   emoji="🏴‍☠️"
    //   titleText="Patchy the Chatty Pirate"
    //   placeholder="I'm an LLM pretending to be a pirate! Ask me about the pirate life!"
    //   emptyStateComponent={InfoCard}
    // ></ChatWindow>
  );
}
