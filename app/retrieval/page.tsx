import { ChatWindow } from "@/components/ChatWindow";

export default function AgentsPage() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4">AI Irish Tax Bot 🔗</h1>

      <ul>
        <li className="hidden text-l md:block">
          <span className="ml-2">
            I know about Irish Tax Law and can answer questions about it. I have
            these documents in my memory.{" "}
            <a
              href="https://www.revenue.ie/en/tax-professionals/legislation/notes-for-guidance/taxes-consolidation-act-tca.aspx"
              target="_blank"
            >
              Revenue.ie Tax Profressions Legislation Notes for Guidance
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat/retrieval"
      emptyStateComponent={InfoCard}
      showIngestForm={true}
      placeholder={"Hi I`m your friendly AI Tax Bot. Ask me about Irish Tax"}
      emoji="🐶"
      titleText="AI Irish Tax Bot"
    ></ChatWindow>
  );
}
