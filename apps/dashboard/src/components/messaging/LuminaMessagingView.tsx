"use client"

// ** Imports: React & Hooks **
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"

// ** UI Components **
import {
  SidebarInset,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarProvider,
} from "@/components/blocks/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

// ** Dropdown Menu Components **
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ** Icons **
import {
  ArrowLeft,
  Brush,
  Camera,
  ChartBarIncreasing,
  CheckCheck,
  ChevronUp,
  CircleFadingPlus,
  CircleOff,
  CircleUserRound,
  File,
  Image,
  ListFilter,
  Menu,
  MessageCircle,
  MessageSquareDashed,
  MessageSquareDot,
  Mic,
  Paperclip,
  Phone,
  Search,
  Send,
  Settings,
  Smile,
  SquarePen,
  Star,
  User,
  User2,
  UserRound,
  Users,
  Video,
} from "lucide-react"

import type { DashboardUser } from "../../DashboardPage"
import {
  fetchMyConversationsApi,
  fetchChannelMessagesApi,
  sendMessageApi,
  createConversationApi,
  markChannelReadApi,
  sendTypingIndicatorApi,
  type ChatConversationItem,
  type ChatMessageItem,
} from "../../api/chatApi"

// ** Contact List **
export const defaultContactList = [
  {
    id: "contact-1",
    name: "Manoj Rayi",
    message: "Your Last Message Here",
    image: "https://cdn.21st.dev/assets/mirror/60/60a78914033c8e6b417d2f6ce5cf81dcc37c9247e03432bbf81c63e1f5ecfbc3.jpg",
    time: "10:14 AM",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-2",
    name: "Anjali Kumar",
    message: "Hello, how are you?",
    image: "https://cdn.21st.dev/assets/mirror/e7/e7a0b30cb92ca533b2f8dbf57649e4b60129a9e84f3fc36d45b09e2dfcaec61d.jpg",
    time: "09:45 AM",
    unread: true,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-3",
    name: "Ravi Teja",
    message: "Looking forward to the meeting.",
    image: "https://cdn.21st.dev/assets/mirror/4c/4cff4f892ece6dca0865313df96f11ac30e11b6dcbf3b9a86bad86a3049aa6e1.jpg",
    time: "Yesterday",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-4",
    name: "Sneha Reddy",
    message: "Can you send the report?",
    image: "https://cdn.21st.dev/assets/mirror/55/55d0cf713811843ffbd3412ee403668a82597bb83aabbc684a87f66c1fc962e4.jpg",
    time: "Yesterday",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-5",
    name: "Arjun Das",
    message: "Thank you for your help!",
    image: "https://cdn.21st.dev/assets/mirror/32/32afb68c9233445d08f7c4af3e781f648c6eeeb7dadeb5bdd341a003684d1c93.jpg",
    time: "Wednesday",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-6",
    name: "Priya Sharma",
    message: "Let's catch up soon.",
    image: "https://cdn.21st.dev/assets/mirror/7f/7f2f1b6a4c09f5092437fe960232360d1e2dcf7a198c8580f3c5478c7b2d9386.jpg",
    time: "Tuesday",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-7",
    name: "Vikram Singh",
    message: "I will call you later.",
    image: "https://cdn.21st.dev/assets/mirror/f2/f25b1b7a6a351c0f748d81bf4fcaf8c5a2f8ed036563c2693d4c1ca3718d9d5d.jpg",
    time: "Monday",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-8",
    name: "Kavya Rao",
    message: "Did you receive my email?",
    image: "https://cdn.21st.dev/assets/mirror/41/417105f5784df0a25c3486becfe5c967d448e3c98b3c0231ef4ea0c59d27cb4b.jpg",
    time: "Sunday",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-9",
    name: "Rahul Verma",
    message: "Meeting rescheduled to tomorrow.",
    image: "https://cdn.21st.dev/assets/mirror/62/6252a3b6790cbb48919cb8ea756a4e1ce829f3271a141731226871b3c3df9d6d.jpg",
    time: "Oct 20",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-10",
    name: "Deepika Nair",
    message: "Happy birthday! Have a great day!",
    image: "https://cdn.21st.dev/assets/mirror/54/54ebea0e1cad66565de28318ff2f512398bf5732f6f3f3fecea8ad4338b78778.jpg",
    time: "Oct 19",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-11",
    name: "Rohit Malhotra",
    message: "What's the update?",
    image: "https://cdn.21st.dev/assets/mirror/21/21d6722e3baa38cb075afdc599a60c8861440a6dea431e7a8ff43f86d05190b9.jpg",
    time: "Oct 18",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-12",
    name: "Neha Gupta",
    message: "Hope you're doing well!",
    image: "https://cdn.21st.dev/assets/mirror/20/20bb8458e0bb0345aae5ab6a975650d1210fdfc5721729b456f7342fc59b3113.jpg",
    time: "Oct 17",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-13",
    name: "Amit Yadav",
    message: "Let's finalize the project.",
    image: "https://cdn.21st.dev/assets/mirror/56/56eb13218bfcbdfa4f6f950990d4666d616ad1f9e17777c976ccc79c781b68c6.jpg",
    time: "Oct 16",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-14",
    name: "Simran Kaur",
    message: "Good morning!",
    image: "https://cdn.21st.dev/assets/mirror/4c/4c5eaf184e978fcf67bed792f0fa88543b664347c98727aa25da4c16e32eb367.jpg",
    time: "Oct 15",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-15",
    name: "Varun Chopra",
    message: "I'll send the documents soon.",
    image: "https://cdn.21st.dev/assets/mirror/e8/e86e44eaa9cb076c9d359973ce68af0e0cd85bb5dac2e72b259582941a57621b.jpg",
    time: "Oct 14",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-16",
    name: "Meera Joshi",
    message: "How was your weekend?",
    image: "https://cdn.21st.dev/assets/mirror/cc/cc6b757fbf1174ae601b39aa711d6dfcda1b236001a2f3a67c4293d73c9fd714.jpg",
    time: "Oct 13",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-17",
    name: "Karthik Reddy",
    message: "Please confirm the time.",
    image: "https://cdn.21st.dev/assets/mirror/e8/e86e44eaa9cb076c9d359973ce68af0e0cd85bb5dac2e72b259582941a57621b.jpg",
    time: "Oct 12",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-18",
    name: "Pooja Sharma",
    message: "See you at the event!",
    image: "https://cdn.21st.dev/assets/mirror/1c/1c09f1ab9440e4f0922ad6c7494fb9efa1ae446ac5d39c4fb5843ed3fbc5c952.jpg",
    time: "Oct 11",
    unread: false,
    online: true,
    isGroup: false,
  },
  {
    id: "contact-19",
    name: "Sandeep Kumar",
    message: "Just checking in.",
    image: "https://cdn.21st.dev/assets/mirror/c4/c493b0a6d9a42ed0a102bcd31360d00491e23ac5cb4f7cbf8ae9c61f577ccccc.jpg",
    time: "Oct 10",
    unread: false,
    online: false,
    isGroup: false,
  },
  {
    id: "contact-20",
    name: "Lavanya Patel",
    message: "Don't forget the meeting.",
    image: "https://cdn.21st.dev/assets/mirror/56/56cfb2a08032e82843ccac91504bbf42ababde4aea91bbacd9b683912cd8b21a.jpg",
    time: "Oct 09",
    unread: false,
    online: true,
    isGroup: false,
  },
]

export interface ChatContactItem {
  id: string
  name: string
  message: string
  image: string
  time?: string
  unread?: boolean
  online?: boolean
  isGroup?: boolean
}

export interface ThreadMessage {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

export interface LuminaMessagingViewProps {
  currentUser?: DashboardUser | null
  onBackToDashboard?: () => void
  onOpenProfile?: () => void
  onLogout?: () => void
  initialChatId?: string | null
}

function LuminaMessagingViewInner({
  currentUser,
  onBackToDashboard,
  onOpenProfile,
  onLogout,
}: LuminaMessagingViewProps) {
  const { open, toggleSidebar } = useSidebar()

  // State
  const [contacts, setContacts] = useState<ChatContactItem[]>(defaultContactList)
  const [currentChat, setCurrentChat] = useState<ChatContactItem>(defaultContactList[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [inputText, setInputText] = useState("")
  const [threadMessages, setThreadMessages] = useState<Record<string, ThreadMessage[]>>({
    "contact-1": [
      { id: "1", sender: "them", text: "Hey! How is everything going with the new project?", time: "10:14 AM" },
      { id: "2", sender: "me", text: "Everything is going great! Just polishing the chat interface with resizable panels.", time: "10:16 AM" },
      { id: "3", sender: "them", text: "Awesome, let me know if you need any feedback.", time: "10:18 AM" },
    ],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<any>(null)

  // Load conversations from backend
  const loadConversations = useCallback(async () => {
    try {
      const res = await fetchMyConversationsApi()
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped: ChatContactItem[] = res.data.map((item: ChatConversationItem) => {
          const isGroup = Boolean(item.isGroup)
          const other = item.otherUser
          const name = item.name || other?.name || other?.username || (isGroup ? 'Study Group' : 'Direct Chat')
          const image = item.image || other?.image || defaultContactList[0].image
          const message = item.lastMessage?.text || 'No messages yet'
          return {
            id: item.channelId || item.id,
            name,
            message,
            image,
            time: 'Recent',
            unread: (item.unreadCount || 0) > 0,
            online: Boolean(other?.online),
            isGroup,
          }
        })

        setContacts((prev) => {
          const existingIds = new Set(mapped.map((m) => m.id))
          const nonOverlapping = prev.filter((p) => !existingIds.has(p.id))
          return [...mapped, ...nonOverlapping]
        })
      }
    } catch {
      // Keep sample contacts on network failure
    }
  }, [])

  // Load messages for current chat from backend if channel exists
  const loadMessages = useCallback(async (chatId: string) => {
    if (!chatId) return
    try {
      const res = await fetchChannelMessagesApi(chatId)
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped: ThreadMessage[] = res.data.map((m: ChatMessageItem) => ({
          id: m.id,
          sender: m.user_id === currentUser?.id || m.user_id === 'me' ? 'me' : 'them',
          text: m.text,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }))
        setThreadMessages((prev) => ({
          ...prev,
          [chatId]: mapped,
        }))
        markChannelReadApi(chatId).catch(() => {})
      }
    } catch {
      // retain local thread
    }
  }, [currentUser?.id])

  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  useEffect(() => {
    if (currentChat?.id) {
      loadMessages(currentChat.id)
    }
  }, [currentChat?.id, loadMessages])

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [threadMessages, currentChat?.id])

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (activeFilter === "unread" && !c.unread) return false
      if (activeFilter === "groups" && !c.isGroup) return false
      if (activeFilter === "favorites" && c.id !== "contact-1") return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        return c.name.toLowerCase().includes(q) || c.message.toLowerCase().includes(q)
      }
      return true
    })
  }, [contacts, activeFilter, searchQuery])

  // Current chat's messages
  const activeMessages = useMemo(() => {
    if (!currentChat) return []
    return (
      threadMessages[currentChat.id] ||
      threadMessages[currentChat.name] || [
        {
          id: "init",
          sender: "them",
          text: currentChat.message,
          time: currentChat.time || "Just now",
        },
      ]
    )
  }, [currentChat, threadMessages])

  // Send message
  const handleSendMessage = async () => {
    const text = inputText.trim()
    if (!text || !currentChat) return

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const newMsg: ThreadMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text,
      time: timeStr,
    }

    setThreadMessages((prev) => ({
      ...prev,
      [currentChat.id]: [...(prev[currentChat.id] || []), newMsg],
      [currentChat.name]: [...(prev[currentChat.name] || []), newMsg],
    }))

    setContacts((prev) =>
      prev.map((c) =>
        c.id === currentChat.id ? { ...c, message: text, time: "Just now" } : c
      )
    )

    setInputText("")

    try {
      await sendMessageApi(currentChat.id, text)
    } catch {
      // Handled optimistically
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    if (currentChat?.id) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingIndicatorApi(currentChat.id).catch(() => {})
      }, 500)
    }
  }

  const handleCreateContact = async (isGroup = false) => {
    const defaultName = isGroup ? "New Study Group" : "New Contact"
    const name = window.prompt(`Enter ${isGroup ? 'Group' : 'Contact'} Name:`, defaultName)
    if (!name?.trim()) return

    const newId = `custom-${Date.now()}`
    const newContact: ChatContactItem = {
      id: newId,
      name: name.trim(),
      message: isGroup ? "Group created" : "Started conversation",
      image: defaultContactList[Math.floor(Math.random() * defaultContactList.length)].image,
      time: "Just now",
      online: true,
      isGroup,
    }

    setContacts((prev) => [newContact, ...prev])
    setCurrentChat(newContact)

    try {
      await createConversationApi({
        otherUserId: newId,
        otherName: name.trim(),
      })
    } catch {
      // Local fallback
    }
  }

  // Sidebar Menu Items
  const menuItems = [
    { title: "Messages", icon: MessageCircle, active: true },
    { title: "Phone", icon: Phone, active: false },
    { title: "Status", icon: CircleFadingPlus, active: false },
  ]

  const userName = currentUser?.name || "Manoj Rayi"

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#121212] text-neutral-100 antialiased font-sans select-none">
      {/* 1. Collapsible Sidebar */}
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent className="flex flex-col items-center py-3 px-2 gap-1.5">
          <SidebarGroup className="w-full">
            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Sidebar Toggle Button */}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={toggleSidebar} title={open ? "Collapse Sidebar" : "Expand Sidebar"}>
                    <Menu className="size-5 shrink-0" />
                    <span>Collapse</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Back to Dashboard Feed */}
                {onBackToDashboard && (
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={onBackToDashboard} title="Back to Feed">
                      <ArrowLeft className="size-5 shrink-0" />
                      <span>Back to Feed</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {/* Main Navigation Items */}
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active} title={item.title}>
                      <item.icon className="size-5 shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-2 border-t border-neutral-800 bg-[#161616]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton title="Settings">
                <Settings className="size-5 shrink-0" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton title={userName} className="relative">
                    {open ? (
                      <>
                        <User2 className="size-5 shrink-0" />
                        <span className="truncate">{userName}</span>
                        <ChevronUp className="ml-auto size-4 shrink-0" />
                      </>
                    ) : (
                      <div className="size-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                        {userName[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-48 bg-[#1e1e1e] border-neutral-800 text-neutral-200"
                >
                  <DropdownMenuItem onClick={onOpenProfile}>
                    <User className="size-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Back Up</span>
                  </DropdownMenuItem>
                  {onLogout && (
                    <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:text-red-300">
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* 2. Main Content Inset */}
      <SidebarInset className="bg-[#191919]">
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
          {/* ===================================================================
              Left Panel: Chats List
             =================================================================== */}
          <ResizablePanel defaultSize={30} minSize={22} maxSize={45}>
            <div className="flex flex-col h-full w-full border-r border-neutral-800 bg-[#161616]">
              {/* Header */}
              <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
                <h2 className="text-lg font-bold text-white tracking-tight">Chats</h2>
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-white hover:bg-neutral-800 size-9 rounded-lg"
                        title="New Chat"
                      >
                        <SquarePen className="size-4.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44 bg-[#1e1e1e] border-neutral-800 text-neutral-200">
                      <DropdownMenuItem onClick={() => handleCreateContact(false)}>
                        <User className="size-4" /> New Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCreateContact(true)}>
                        <Users className="size-4" /> New Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-white hover:bg-neutral-800 size-9 rounded-lg"
                        title="Filter Chats"
                      >
                        <ListFilter className="size-4.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#1e1e1e] border-neutral-800 text-neutral-200">
                      <DropdownMenuLabel>Filter Chats By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setActiveFilter('all')}>
                          <MessageCircle className="size-4" /> All Chats
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter('unread')}>
                          <MessageSquareDot className="size-4" /> Unread
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter('favorites')}>
                          <Star className="size-4" /> Favorites
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter('contacts')}>
                          <CircleUserRound className="size-4" /> Contacts
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter('non-contacts')}>
                          <CircleOff className="size-4" /> Non Contacts
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setActiveFilter('groups')}>
                          <Users className="size-4" /> Groups
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter('drafts')}>
                          <MessageSquareDashed className="size-4" /> Drafts
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Search Bar */}
              <div className="px-3.5 py-3 border-b border-neutral-800/60 shrink-0">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                  <Input
                    placeholder="Search or start new chat"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9.5 w-full bg-[#202020] border-neutral-800/80 text-neutral-100 placeholder:text-neutral-500 rounded-lg focus-visible:ring-1 focus-visible:ring-neutral-700 text-sm"
                  />
                </div>
              </div>

              {/* Quick Filter Tabs */}
              <div className="px-3.5 py-2 flex items-center gap-1.5 border-b border-neutral-800/40 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('unread')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeFilter === 'unread'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  Unread
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('groups')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeFilter === 'groups'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  Groups
                </button>
              </div>

              {/* Contact List */}
              <ScrollArea className="flex-1 w-full overflow-y-auto">
                <div className="flex flex-col">
                  {filteredContacts.map((contact, index) => {
                    const isSelected = currentChat?.id === contact.id
                    return (
                      <button
                        key={contact.id || index}
                        onClick={() => setCurrentChat(contact)}
                        className={`w-full px-3.5 py-3 hover:bg-neutral-800/50 cursor-pointer text-left transition-colors border-b border-neutral-800/30 flex items-center gap-3.5 ${
                          isSelected ? "bg-[#252525] border-l-2 border-l-white" : ""
                        }`}
                      >
                        <div className="relative shrink-0">
                          <Avatar className="size-11 rounded-full">
                            <AvatarImage src={contact.image} alt={contact.name} />
                            <AvatarFallback>{contact.name[0]}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-[#161616]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium text-neutral-100 truncate">
                              {contact.name}
                            </h4>
                            {contact.time && (
                              <span className="text-[11px] text-neutral-400 shrink-0 font-normal">
                                {contact.time}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-neutral-400 truncate">
                              {contact.message}
                            </p>
                            {contact.unread && (
                              <span className="size-2 rounded-full bg-blue-500 shrink-0" />
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          {/* Resizable Divider Handle */}
          <ResizableHandle />

          {/* ===================================================================
              Right Panel: Chat Thread Window
             =================================================================== */}
          <ResizablePanel defaultSize={70} minSize={55} maxSize={78}>
            <div className="flex flex-col h-full w-full bg-[#191919]">
              {/* Chat Header */}
              <div className="h-16 px-6 border-b border-neutral-800 bg-[#161616] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-10 rounded-full">
                      <AvatarImage src={currentChat?.image} alt={currentChat?.name} />
                      <AvatarFallback>
                        {currentChat?.name ? currentChat.name.slice(0, 2).toUpperCase() : "PR"}
                      </AvatarFallback>
                    </Avatar>
                    {currentChat?.online && (
                      <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-[#161616]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-tight">
                      {currentChat?.name}
                    </h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                      <span className={`size-1.5 rounded-full ${currentChat?.online ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                      {currentChat?.isGroup ? "Study Group" : currentChat?.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-white hover:bg-neutral-800 size-9 rounded-lg"
                    title="Video Call"
                  >
                    <Video className="size-4.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-white hover:bg-neutral-800 size-9 rounded-lg"
                    title="Voice Call"
                  >
                    <Phone className="size-4.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-white hover:bg-neutral-800 size-9 rounded-lg"
                    title="Search Messages"
                  >
                    <Search className="size-4.5" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages Flow */}
              <ScrollArea className="flex-1 w-full overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-3.5 max-w-4xl mx-auto">
                  {activeMessages.map((msg) => {
                    const isMe = msg.sender === "me"
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[68%] ${
                          isMe ? "ml-auto items-end" : "mr-auto items-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            isMe
                              ? "bg-neutral-800 text-white rounded-tr-xs border border-neutral-700/60"
                              : "bg-[#222222] text-neutral-100 rounded-tl-xs border border-neutral-800"
                          }`}
                        >
                          <p className="whitespace-pre-wrap select-text">{msg.text}</p>
                          <div className={`flex items-center gap-1 text-[10px] text-neutral-400 mt-1 select-none ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <span>{msg.time}</span>
                            {isMe && <CheckCheck className="size-3.5 text-blue-400" />}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Bottom Message Input Bar */}
              <div className="h-18 px-5 py-3 border-t border-neutral-800 bg-[#161616] flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                  title="Emoji"
                >
                  <Smile className="size-5" />
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button
                      type="button"
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                      title="Attach"
                    >
                      <Paperclip className="size-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-52 bg-[#1e1e1e] border-neutral-800 text-neutral-200">
                    <DropdownMenuItem>
                      <Image className="size-4" /> Photos & Videos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Camera className="size-4" /> Camera
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <File className="size-4" /> Document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserRound className="size-4" /> Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ChartBarIncreasing className="size-4" /> Poll
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Brush className="size-4" /> Drawing
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Input Pill */}
                <div className="flex-1 flex items-center bg-[#202020] border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-600 rounded-2xl px-4 py-2 transition-colors">
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 outline-none text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-full transition-all cursor-pointer ${
                    inputText.trim()
                      ? "bg-white text-black hover:bg-neutral-200 shadow-md"
                      : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/60"
                  }`}
                  title="Send"
                >
                  <Send className="size-4.5" />
                </button>

                {/* Voice Note Button */}
                <button
                  type="button"
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                  title="Voice message"
                >
                  <Mic className="size-5" />
                </button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
    </div>
  )
}

export const LuminaMessagingView: React.FC<LuminaMessagingViewProps> = (props) => {
  return (
    <SidebarProvider>
      <LuminaMessagingViewInner {...props} />
    </SidebarProvider>
  )
}

export default LuminaMessagingView
