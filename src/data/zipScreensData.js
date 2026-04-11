export const dashboardOverviewPage = {
  navItems: [
    { label: 'Dashboard', icon: 'dashboard', href: '/', end: true },
    { label: 'Employees', icon: 'group', href: '/employees' },
    { label: 'AI Assistant', icon: 'smart_toy', href: '/chat' },
    { label: 'Checklist', icon: 'fact_check', href: '/checklist' },
  ],
  user: {
    name: 'Sarah Mitchell',
    role: 'HR Lead',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBadDh0w14Bg5pHLpOhU95qZXON5j_xMiBcP_nZYDMK5eDIF8rg2wnX8wsUfCRUNjqmRnYNuxzDZ0xd0pWNUzNMUJlRyxd4hm_OgnQVtcaw_BpkFEXH9R5cZsaFu-HszjkU66fDdVzvt-ByT3s4lgdnldjZYlrNO6Jpovdk6kJ-I90QrIFABhha2iEg4kQ4bRS0DJXJtev8cM7GubmUEoCSUXUJfdDKnxOBu_BdoeauPqj6t1wzuJjCoAjaDa_vSyQIV3Zme8u9izAY',
  },
  searchPlaceholder: 'Search employees or insights...',
  topbarLabel: 'Onboarding Alpha',
  greetingTitle: 'Good morning, Sarah',
  greetingDescription:
    'You have 26 pending onboards this week. AI suggests prioritizing Alex Chen.',
  stats: [
    {
      title: 'Total Employees',
      value: '124',
      detail: '+4% from last month',
      icon: 'groups',
      tone: 'primary',
    },
    {
      title: 'Active',
      value: '98',
      detail: 'All compliance records verified',
      icon: 'check_circle',
      tone: 'success',
    },
    {
      title: 'Pending Onboarding',
      value: '26',
      detail: '6 require urgent action',
      icon: 'pending_actions',
      tone: 'warning',
    },
  ],
  pipelineRows: [
    {
      name: 'Alex Chen',
      role: 'Senior Designer',
      progress: 85,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOV3Kqn0zt_TGGSc8ZsOnRTHAWLbn6T2aAKoFUS8IHBai7urgMybaj9dRshO9U7n_rwoPmyTKD3QitJAS1GoKvkxnPOxFMX4Rd3I_uFrnNr37AStYvmPemXa8XEK_M1U2SAURCS4BJdsJYz65aTmuvP1tqL9ugo12GK284UtM-1o0Ic6Wo7sd1c-ZJ8tcgRUVuhwB7XtE_9D-icKhFUqcr9YLvLzcEiBTZomui8JUKtEvLgW_fXH9ktV6wFWeBzrBVCaeQjnroERRO',
      score: '92%',
      scoreIcon: 'bolt',
      scoreTone: 'success',
    },
    {
      name: 'Maya Rodriguez',
      role: 'Full Stack Engineer',
      progress: 42,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDJEifwHihGpN62aTQ6Fg-cYVikzzzZWfS1-mro9AlolGBm0GfHH7Dtany6ESNKIwJxyF2EHl4uFzXg6qQA-Dl-N5VJ-rtGlCc-kzaI1WgmPa8bpjPcnl9MXDmJ--n5PwUL6FTVQEaHtt8_sc8LC0wEJXnvuHM5dnlQLccbPy7SJ2SZRZMsR5B96g814KV9vTilrQZDGXrKcdzD1uQUQZ8ERf8CZlVefD7lnBvo4DRoeIx3oDYER_oQsyAu_AATViquCIb62YUPcwg4',
      score: '64%',
      scoreIcon: 'warning',
      scoreTone: 'warning',
    },
    {
      name: 'Jordan Smith',
      role: 'Product Manager',
      progress: 12,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADulLgLJ7cNA0Bk36iVRuBGmE7NKjLoIpOTtL3-el2RWT9KecboB2VOh46e1isJ6ZFwM65NY8OW6IgbDQ0UE04fjOZqfgmRH1veVgunYTikbkthVizovkgNxOk1SiV9W0ZJO131TiJSHfCS612Rmxzb5CmPWAf2tEty9i7v_hLYKJuISrT9o35ReFM3WvVw1sBvjXVSEw_ObDKpuNrhJmL-I1CAqAHQvSL2LocMtzldKkeznPi8IzYUkzB-39lCJe9-HdBqcMtbpw2',
      score: '85%',
      scoreIcon: 'hourglass_empty',
      scoreTone: 'neutral',
    },
  ],
  predictiveInsight:
    "Based on Jordan Smith's current onboarding velocity, there is a 40% risk of missing the Day 14 equipment setup deadline. Recommend immediate check-in for IT provisioning.",
  milestones: [
    { title: 'Alex Chen: Final Review', when: 'Tomorrow', tone: 'secondary' },
    { title: 'Maya Rodriguez: Intro Call', when: 'In 2 days', tone: 'primary' },
  ],
}

export const aiAssistantPage = {
  navItems: [
    { label: 'Dashboard', icon: 'dashboard', href: '/', end: true },
    { label: 'Employees', icon: 'group', href: '/employees' },
    { label: 'AI Assistant', icon: 'smart_toy', href: '/chat' },
    { label: 'Checklist', icon: 'fact_check', href: '/checklist' },
  ],
  user: {
    name: 'Alex Rivera',
    role: 'HR Lead',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASCHRVO1-6HAdzz8xW5y4gMwkDsUNAG7z_yIaZtvpe79B8DLNZ3Pc8zZ5cGPfw4s9N20k5AMUX-aqDmAOvjgi-NXVGItoZg4bksvg6IzT1mvL9DhhPR0TLPnfjaEUubnVBoDx4AmNk5YO0xRxq4fWUuQ2cmYfeEzYXcQ_rMZ2enXtiTTCHGiFwdkYv49Wrv2ZXBdv01wdWSiUqvVGuGbApudmxTBFTauey5OJt2oCmfk28R1wsmFH-niG9S9q-i7Ars3Q7PYp8W02e',
  },
  searchPlaceholder: 'Search conversations or help docs...',
  topbarBadge: 'Pro Plan',
  conversations: [
    {
      title: 'Benefits Enrollment',
      preview: 'I can help you choose the right health plan...',
      icon: 'auto_awesome',
      active: true,
      meta: 'LIVE',
    },
    {
      title: 'General Onboarding Q&A',
      preview: 'Your laptop setup guide is ready for review.',
      icon: 'rocket_launch',
      meta: '2h ago',
    },
    {
      title: 'IT Setup Support',
      preview: 'VPN credentials have been sent to your mail.',
      icon: 'settings_ethernet',
      meta: 'Yesterday',
    },
    {
      title: 'ID Verification',
      preview: 'Passport document successfully verified.',
      icon: 'badge',
      meta: 'Aug 12',
    },
  ],
  messages: [
    {
      role: 'assistant',
      time: '09:41 AM',
      text: "Hello Alex! I see you're looking into the Benefits Enrollment for Q3. I've analyzed your location and job grade.\n\nYou're eligible for the Platinum Plus health plan and the wellness reimbursement program. Would you like me to compare the deductible options for you?",
    },
    {
      role: 'user',
      time: '09:43 AM',
      text: 'Yes, please. Also, can you tell me if dental is included in the Platinum Plus plan?',
    },
    {
      role: 'assistant',
      time: '09:44 AM',
      text: 'Yes, full dental coverage (including orthodontics) is included in the Platinum Plus tier at $0 additional monthly premium.\n\nHere is a quick summary of the deductible comparison:',
      summary: [
        { label: 'Platinum Plus', value: '$250 Deductible' },
        { label: 'Standard Core', value: '$1,200 Deductible' },
      ],
    },
  ],
  contextDocs: ['Employee_Handbook_2024.pdf', 'Medical_Benefits_Summary.pdf'],
  quickActions: ['Download Plan Summary', 'Book Benefits Call'],
  insightImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ9w9TKcY4TP5MaL3vDTW-xyJBPRv2fpzWESRymj1nlkT1fw15sjN6lg8OEd1pVnXbDtUghXb1RZ4Gh0LIfNBJ7hsO6QxDzQ0_kUp0Fl6Z_GIrnQbMSPMJVAezYrzYNLTdi5uKzclcPvfRGHZJrb3_htywUrZx4czEQsN9EMMBjqO4ct7DRx_Eh_KN5grNRtspjOVrSzYV5FJvbQKA4hU-pmFvNgO5s5-8-X_IUkFfSZko4x4ceRp-ZHiD3WSO40540hIKT57dAnDP',
}
