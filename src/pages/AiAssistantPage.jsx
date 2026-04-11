import AiContextPanel from '../components/AiContextPanel'
import AssistantChatPane from '../components/AssistantChatPane'
import ChatConversationsPane from '../components/ChatConversationsPane'
import WorkspaceLayout from '../components/WorkspaceLayout'
import { aiAssistantPage } from '../data/zipScreensData'

function AiAssistantPage() {
  const page = aiAssistantPage

  return (
    <WorkspaceLayout
      navItems={page.navItems}
      placeholder={page.searchPlaceholder}
      topbarBadge={page.topbarBadge}
      user={page.user}
    >
      <div className="-mx-4 overflow-hidden rounded-[32px] bg-surface-container-low shadow-card sm:-mx-6 lg:-mx-8">
        <div className="flex min-h-[780px] flex-col xl:flex-row">
          <ChatConversationsPane items={page.conversations} />
          <AssistantChatPane messages={page.messages} />
          <AiContextPanel docs={page.contextDocs} image={page.insightImage} quickActions={page.quickActions} />
        </div>
      </div>
    </WorkspaceLayout>
  )
}

export default AiAssistantPage
