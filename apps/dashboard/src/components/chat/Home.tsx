"use client"

// ** Imports: React & Hooks **
import { useState } from "react"

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

// ** Contact List **
export const contactList = [
  {
    name: "Manoj Rayi",
    message: "Your Last Message Here",
    image: "https://cdn.21st.dev/assets/mirror/60/60a78914033c8e6b417d2f6ce5cf81dcc37c9247e03432bbf81c63e1f5ecfbc3.jpg",
    time: "10:14 AM",
    online: true,
  },
  {
    name: "Anjali Kumar",
    message: "Hello, how are you?",
    image: "https://cdn.21st.dev/assets/mirror/e7/e7a0b30cb92ca533b2f8dbf57649e4b60129a9e84f3fc36d45b09e2dfcaec61d.jpg",
    time: "09:45 AM",
    online: true,
  },
  {
    name: "Ravi Teja",
    message: "Looking forward to the meeting.",
    image: "https://cdn.21st.dev/assets/mirror/4c/4cff4f892ece6dca0865313df96f11ac30e11b6dcbf3b9a86bad86a3049aa6e1.jpg",
    time: "Yesterday",
    online: false,
  },
  {
    name: "Sneha Reddy",
    message: "Can you send the report?",
    image: "https://cdn.21st.dev/assets/mirror/55/55d0cf713811843ffbd3412ee403668a82597bb83aabbc684a87f66c1fc962e4.jpg",
    time: "Yesterday",
    online: true,
  },
  {
    name: "Arjun Das",
    message: "Thank you for your help!",
    image: "https://cdn.21st.dev/assets/mirror/32/32afb68c9233445d08f7c4af3e781f648c6eeeb7dadeb5bdd341a003684d1c93.jpg",
    time: "Wednesday",
    online: false,
  },
  {
    name: "Priya Sharma",
    message: "Let's catch up soon.",
    image: "https://cdn.21st.dev/assets/mirror/7f/7f2f1b6a4c09f5092437fe960232360d1e2dcf7a198c8580f3c5478c7b2d9386.jpg",
    time: "Tuesday",
    online: true,
  },
  {
    name: "Vikram Singh",
    message: "I will call you later.",
    image: "https://cdn.21st.dev/assets/mirror/f2/f25b1b7a6a351c0f748d81bf4fcaf8c5a2f8ed036563c2693d4c1ca3718d9d5d.jpg",
    time: "Monday",
    online: false,
  },
  {
    name: "Kavya Rao",
    message: "Did you receive my email?",
    image: "https://cdn.21st.dev/assets/mirror/41/417105f5784df0a25c3486becfe5c967d448e3c98b3c0231ef4ea0c59d27cb4b.jpg",
    time: "Sunday",
    online: true,
  },
  {
    name: "Rahul Verma",
    message: "Meeting rescheduled to tomorrow.",
    image: "https://cdn.21st.dev/assets/mirror/62/6252a3b6790cbb48919cb8ea756a4e1ce829f3271a141731226871b3c3df9d6d.jpg",
    time: "Oct 20",
    online: false,
  },
  {
    name: "Deepika Nair",
    message: "Happy birthday! Have a great day!",
    image: "https://cdn.21st.dev/assets/mirror/54/54ebea0e1cad66565de28318ff2f512398bf5732f6f3f3fecea8ad4338b78778.jpg",
    time: "Oct 19",
    online: true,
  },
]

// ** Sidebar Menu Items **
const menuItems = [
  { title: "Messages", url: "#", icon: MessageCircle },
  { title: "Phone", url: "#", icon: Phone },
  { title: "Status", url: "#", icon: CircleFadingPlus },
]

export interface ChatMessageItem {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

function HomeInner() {
  const { open, toggleSidebar } = useSidebar()
  const [currentChat, setCurrentChat] = useState(contactList[0])
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Record<string, ChatMessageItem[]>>({
    "Manoj Rayi": [
      { id: "1", sender: "them", text: "Hey! How is everything going with the new project?", time: "10:14 AM" },
      { id: "2", sender: "me", text: "Everything is going great! Just polishing the chat interface with resizable panels.", time: "10:16 AM" },
      { id: "3", sender: "them", text: "Awesome, let me know if you need any feedback.", time: "10:18 AM" },
    ],
  })

  const currentMessages = messages[currentChat.name] || [
    { id: "init", sender: "them", text: currentChat.message, time: "Just now" },
  ]

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg: ChatMessageItem = {
      id: String(Date.now()),
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => ({
      ...prev,
      [currentChat.name]: [...(prev[currentChat.name] || []), newMsg],
    }))
    setInputText("")
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#121212] text-neutral-100 antialiased font-sans select-none">
      {/* Sidebar */}
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent className="flex flex-col items-center py-3 px-2 gap-1.5">
          <SidebarGroup className="w-full">
            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={toggleSidebar} title={open ? "Collapse Sidebar" : "Expand Sidebar"}>
                    <Menu className="size-5 shrink-0" />
                    <span>Collapse</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild title={item.title}>
                      <a href={item.url}>
                        <item.icon className="size-5 shrink-0" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

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
                  <SidebarMenuButton title="Manoj Rayi" className="relative">
                    {open ? (
                      <>
                        <User2 className="size-5 shrink-0" />
                        <span className="truncate">Manoj Rayi</span>
                        <ChevronUp className="ml-auto size-4 shrink-0" />
                      </>
                    ) : (
                      <div className="size-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                        M
                      </div>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-48 bg-[#1e1e1e] border-neutral-800 text-neutral-200"
                >
                  <DropdownMenuItem>
                    <a href="https://github.com/rayimanoj8/">Account</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Back Up</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="bg-[#191919]">
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
          {/* Left Panel - Chat List */}
          <ResizablePanel defaultSize={30} minSize={22} maxSize={45}>
            <div className="flex flex-col h-full w-full border-r border-neutral-800 bg-[#161616]">
              {/* Header */}
              <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
                <h2 className="text-lg font-bold text-white tracking-tight">Chats</h2>
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-800 size-9 rounded-lg">
                        <SquarePen className="size-4.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44 bg-[#1e1e1e] border-neutral-800 text-neutral-200">
                      <DropdownMenuItem>
                        <User className="size-4" /> New Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="size-4" /> New Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-800 size-9 rounded-lg">
                        <ListFilter className="size-4.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#1e1e1e] border-neutral-800 text-neutral-200">
                      <DropdownMenuLabel>Filter Chats By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <MessageSquareDot className="size-4" /> Unread
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="size-4" /> Favorites
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CircleUserRound className="size-4" /> Contacts
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CircleOff className="size-4" /> Non Contacts
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Users className="size-4" /> Groups
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
                    className="pl-9 h-9.5 w-full bg-[#202020] border-neutral-800/80 text-neutral-100 placeholder:text-neutral-500 rounded-lg focus-visible:ring-1 focus-visible:ring-neutral-700 text-sm"
                  />
                </div>
              </div>

              {/* Contact List */}
              <ScrollArea className="flex-1 w-full overflow-y-auto">
                <div className="flex flex-col">
                  {contactList.map((contact, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentChat(contact)}
                      className={`w-full px-3.5 py-3 hover:bg-neutral-800/50 cursor-pointer text-left transition-colors border-b border-neutral-800/30 flex items-center gap-3.5 ${
                        currentChat.name === contact.name ? 'bg-[#252525] border-l-2 border-l-white' : ''
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
                          <h4 className="text-sm font-medium text-neutral-100 truncate">{contact.name}</h4>
                          <span className="text-[11px] text-neutral-400 shrink-0 font-normal">{contact.time}</span>
                        </div>
                        <p className="text-xs text-neutral-400 truncate">{contact.message}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Chat Window */}
          <ResizablePanel defaultSize={70} minSize={55} maxSize={78}>
            <div className="flex flex-col h-full w-full bg-[#191919]">
              {/* Chat Header */}
              <div className="h-16 px-6 border-b border-neutral-800 bg-[#161616] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-10 rounded-full">
                      <AvatarImage src={currentChat?.image} alt={currentChat?.name} />
                      <AvatarFallback>{currentChat?.name ? currentChat.name.slice(0, 2).toUpperCase() : 'PR'}</AvatarFallback>
                    </Avatar>
                    {currentChat?.online && (
                      <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-[#161616]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-tight">{currentChat?.name}</h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                      <span className={`size-1.5 rounded-full ${currentChat?.online ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                      {currentChat?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Button variant="ghost" size="icon" className="hover:text-white hover:bg-neutral-800 size-9 rounded-lg">
                    <Video className="size-4.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-white hover:bg-neutral-800 size-9 rounded-lg">
                    <Phone className="size-4.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-white hover:bg-neutral-800 size-9 rounded-lg">
                    <Search className="size-4.5" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 w-full overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-3.5 max-w-4xl mx-auto">
                  {currentMessages.map((msg) => {
                    const isMe = msg.sender === 'me'
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[68%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            isMe
                              ? 'bg-neutral-800 text-white rounded-tr-xs border border-neutral-700/60'
                              : 'bg-[#222222] text-neutral-100 rounded-tl-xs border border-neutral-800'
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
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="h-18 px-5 py-3 border-t border-neutral-800 bg-[#161616] flex items-center gap-2.5 shrink-0">
                <button type="button" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer">
                  <Smile className="size-5" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button type="button" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer">
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

                <div className="flex-1 flex items-center bg-[#202020] border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-600 rounded-2xl px-4 py-2 transition-colors">
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 outline-none text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-full transition-all cursor-pointer ${
                    inputText.trim()
                      ? "bg-white text-black hover:bg-neutral-200 shadow-md"
                      : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/60"
                  }`}
                >
                  <Send className="size-4.5" />
                </button>
                <button type="button" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer">
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

// ** Home Component **
export const Home = () => {
  return (
    <SidebarProvider>
      <HomeInner />
    </SidebarProvider>
  )
}

export default Home
