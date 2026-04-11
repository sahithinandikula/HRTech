export const navItems = [
  { label: 'Dashboard', icon: 'dashboard', active: true },
  { label: 'Employees', icon: 'group' },
  { label: 'AI Assistant', icon: 'smart_toy' },
  { label: 'Checklist', icon: 'fact_check' },
  { label: 'Settings', icon: 'settings' },
]

export const alertBanner = {
  title: '3 Employees At Risk This Week',
  description: 'Low engagement detected in early onboarding phase',
  action: 'Review Now',
}

export const stats = [
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
    title: 'At Risk Employees',
    value: '03',
    detail: 'Immediate attention required',
    icon: 'warning',
    tone: 'danger',
  },
]

export const insights = [
  {
    title: 'Activity Drop',
    description: '2 employees have low activity in first week',
    accent: 'error',
    emoji: '📉',
  },
  {
    title: 'Common Query',
    description: 'Most asked question: Leave policy',
    accent: 'primary',
    emoji: '💬',
  },
  {
    title: 'Efficiency',
    description: '70% onboarding tasks completed on time',
    accent: 'secondary',
    emoji: '📊',
  },
]

export const pipelineRows = [
  {
    name: 'Alex Chen',
    role: 'Senior Designer',
    progress: 85,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOV3Kqn0zt_TGGSc8ZsOnRTHAWLbn6T2aAKoFUS8IHBai7urgMybaj9dRshO9U7n_rwoPmyTKD3QitJAS1GoKvkxnPOxFMX4Rd3I_uFrnNr37AStYvmPemXa8XEK_M1U2SAURCS4BJdsJYz65aTmuvP1tqL9ugo12GK284UtM-1o0Ic6Wo7sd1c-ZJ8tcgRUVuhwB7XtE_9D-icKhFUqcr9YLvLzcEiBTZomui8JUKtEvLgW_fXH9ktV6wFWeBzrBVCaeQjnroERRO',
    statusLabel: 'Healthy',
    statusTone: 'healthy',
    score: '92%',
    scoreIcon: 'bolt',
  },
  {
    name: 'Maya Rodriguez',
    role: 'Full Stack Engineer',
    progress: 42,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJEifwHihGpN62aTQ6Fg-cYVikzzzZWfS1-mro9AlolGBm0GfHH7Dtany6ESNKIwJxyF2EHl4uFzXg6qQA-Dl-N5VJ-rtGlCc-kzaI1WgmPa8bpjPcnl9MXDmJ--n5PwUL6FTVQEaHtt8_sc8LC0wEJXnvuHM5dnlQLccbPy7SJ2SZRZMsR5B96g814KV9vTilrQZDGXrKcdzD1uQUQZ8ERf8CZlVefD7lnBvo4DRoeIx3oDYER_oQsyAu_AATViquCIb62YUPcwg4',
    statusLabel: 'At Risk',
    statusTone: 'risk',
    score: '64%',
    scoreIcon: 'warning',
    note: 'No activity in last 3 days ⚠️',
  },
  {
    name: 'Jordan Smith',
    role: 'Product Manager',
    progress: 12,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADulLgLJ7cNA0Bk36iVRuBGmE7NKjLoIpOTtL3-el2RWT9KecboB2VOh46e1isJ6ZFwM65NY8OW6IgbDQ0UE04fjOZqfgmRH1veVgunYTikbkthVizovkgNxOk1SiV9W0ZJO131TiJSHfCS612Rmxzb5CmPWAf2tEty9i7v_hLYKJuISrT9o35ReFM3WvVw1sBvjXVSEw_ObDKpuNrhJmL-I1CAqAHQvSL2LocMtzldKkeznPi8IzYUkzB-39lCJe9-HdBqcMtbpw2',
    statusLabel: 'Warning',
    statusTone: 'warning',
    score: '85%',
    scoreIcon: 'hourglass_empty',
  },
]

export const predictiveInsight = {
  title: 'Predictive Insight',
  description:
    "Based on Jordan Smith's current onboarding velocity, there is a 40% risk of missing the Day 14 equipment setup deadline. Recommend immediate check-in for IT provisioning.",
  action: 'Action insight',
}

export const milestones = [
  { title: 'Alex Chen: Final Review', when: 'Tomorrow', tone: 'secondary' },
  { title: 'Maya Rodriguez: Intro Call', when: 'In 2 days', tone: 'primary' },
]

export const currentUser = {
  name: 'Sarah Mitchell',
  role: 'HR Lead',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBadDh0w14Bg5pHLpOhU95qZXON5j_xMiBcP_nZYDMK5eDIF8rg2wnX8wsUfCRUNjqmRnYNuxzDZ0xd0pWNUzNMUJlRyxd4hm_OgnQVtcaw_BpkFEXH9R5cZsaFu-HszjkU66fDdVzvt-ByT3s4lgdnldjZYlrNO6Jpovdk6kJ-I90QrIFABhha2iEg4kQ4bRS0DJXJtev8cM7GubmUEoCSUXUJfdDKnxOBu_BdoeauPqj6t1wzuJjCoAjaDa_vSyQIV3Zme8u9izAY',
}
