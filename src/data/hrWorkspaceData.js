import { currentUser } from './currentUser'

// Re-export the unified HR persona for backward compatibility
export const workspaceUser = currentUser

export const employeeDirectory = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Senior Product Designer',
    team: 'Design Team',
    location: 'Remote / NYC',
    joined: 'Joined Oct 2023',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiz6zO5h16X0wuw8kbhlVvlfHXp7DLyWyqFYPFQW6_-LT7ZDs8eAhsNZ7tl3MJYNaB6mLAKa7YQyzZUOcKzJWvrKVdtT7_laOLMEtw3gE8es-oLof5L4df6EWcpAVOykd02bP7VmXPpKI0QUjkUqoHEIn-JMPdFMi0TfuFQDly9VMZGydAMm_I4ucbea0W65nnFll2fFQV9fMHjfuJb0nIPJ29pqqgzOUbFbCxVZB1jVUk0AE0Y8Ng08BhA5pROz4G_B_HkHqYGJmg',
  },
]

export const employeeDetailPage = {
  navItems: [
    { label: 'Dashboard', icon: 'dashboard', href: '/', end: true },
    { label: 'Employees', icon: 'group', href: '/employees' },
    { label: 'AI Assistant', icon: 'smart_toy', href: '/chat' },
    { label: 'Checklist', icon: 'fact_check', href: '/checklist' },
  ],
  searchPlaceholder: 'Search talent or insights...',
  breadcrumbs: ['Employees', 'Alex Rivera'],
  profile: {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    title: 'Senior Product Designer',
    joined: 'Joined Oct 2023',
    team: 'Design Team',
    location: 'Remote / NYC',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiz6zO5h16X0wuw8kbhlVvlfHXp7DLyWyqFYPFQW6_-LT7ZDs8eAhsNZ7tl3MJYNaB6mLAKa7YQyzZUOcKzJWvrKVdtT7_laOLMEtw3gE8es-oLof5L4df6EWcpAVOykd02bP7VmXPpKI0QUjkUqoHEIn-JMPdFMi0TfuFQDly9VMZGydAMm_I4ucbea0W65nnFll2fFQV9fMHjfuJb0nIPJ29pqqgzOUbFbCxVZB1jVUk0AE0Y8Ng08BhA5pROz4G_B_HkHqYGJmg',
  },
  healthScore: {
    value: 85,
    label: 'Optimal',
    summary: 'Alex shows high engagement and consistent performance metrics this quarter.',
    insight: 'AI INSIGHT: RETENTION PROBABILITY HIGH',
  },
  onboardingChecklist: {
    completion: '92% Complete',
    action: 'View Detailed Checklist',
    items: [
      { title: 'Technical Setup', meta: 'Completed 2 days ago', complete: true, progress: 100 },
      { title: 'Security Compliance', meta: 'Completed 4 days ago', complete: true, progress: 100 },
      { title: 'Final Probation Review', meta: 'Due in 5 days', complete: false, progress: 10 },
    ],
  },
  activities: [
    {
      title: 'Completed Security Training',
      description: 'Successfully passed the Cyber-Defense module with 100% score.',
      time: 'Today, 10:42 AM',
      active: true,
    },
    {
      title: 'Uploaded ID Documents',
      description: 'Passport and Residence Permit verified by AI validator.',
      time: 'Yesterday, 03:15 PM',
    },
    {
      title: 'Joined Slack Channel',
      description: 'Added to #product-announcements and #design-critique.',
      time: 'Oct 22, 09:00 AM',
    },
    {
      title: 'Welcome Package Delivered',
      description: 'Equipment and welcome kit confirmed received at residential address.',
      time: 'Oct 21, 11:30 AM',
    },
  ],
  quickStats: [
    { label: 'Days in Org', value: '14' },
    { label: 'Mood Index', value: 'High', accent: 'text-secondary' },
    { label: 'Tasks Done', value: '28' },
  ],
  manager: {
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgoRTHxXOVnZ1FKElmfyvjlzwS3Q46bad_y3NVkg_b88BWVy7JcrK40IGVd5tjy68AoYWE7-1xNBWZCa881iZZQGDpAg99AolXwizeM8lVhFQtclSfUKQQJLqJR2g7cEHZ-cXCKM4sZ-bVN89B8WyiGzT22LzNFCuie8MLLh640YvfHHmoJ5GgmSTav4rHA8AtYuuSg-jAIMW9BTFer9DyrDEm6BTlwW8vcdeJda_ueKUR7TumNQOz_ApBTrNNa39ijRypTf-ZkBuJ',
  },
  expertise: ['User Research', 'Prototyping', 'Design Systems', 'Mentorship', 'Strategy'],
}

export const employeeDetailPages = {
  'alex-rivera': employeeDetailPage,
}

export const onboardingChecklistPage = {
  navItems: [
    { label: 'Dashboard', icon: 'dashboard', href: '/', end: true },
    { label: 'Employees', icon: 'group', href: '/employees' },
    { label: 'AI Assistant', icon: 'smart_toy', href: '/chat' },
    { label: 'Checklist', icon: 'fact_check', href: '/checklist' },
  ],
  searchPlaceholder: 'Search tasks...',
  title: 'Onboarding Checklist',
  description:
    'Welcome to the team! Complete these steps to finalize your integration into Stitch.',
  overallCompletion: 75,
  insight:
    "You're moving 15% faster than the average hire! Complete the Security Training today to stay ahead of your first-week milestones.",
  milestones: [
    {
      title: 'Documents',
      description: 'Completed 2 days ago',
      icon: 'check_circle',
      tone: 'success',
    },
    {
      title: 'Training',
      description: '2 modules remaining',
      icon: 'pending',
      tone: 'primary',
    },
  ],
  cultureCard: {
    title: 'Join our culture session',
    time: 'Tomorrow, 10:00 AM',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9kkgsByfCaaBsCmc8DwB5mpp6joox82bspEDmB_3rP6i6lyqRZgAH6tC3G9Z5zkfWZ4gFyu1WfnitxOBhOQq0OF_YDO8qNf3c5MgL2_vgpikOJ306-OBhn0U1spimzG56Wr-VVZJ7RVjt9hH7TfmQ-_fDQtLXw9Fyapow21gDGMflwXgcIdW66R9eqRclmNsn5bsHXZI_i1SnnKSCUF01G_mbXMRtF7NELebcfpAlNPFzaAlyrCDpMcPVFi3uK0iHE4O-Hb4uELz-',
  },
  sections: [
    {
      title: 'Document Submission',
      items: [
        {
          title: 'Employee Handbook Signature',
          description: 'Review and sign digital copy',
          icon: 'description',
          status: 'Completed',
          tone: 'success',
        },
        {
          title: 'Identity Verification',
          description: 'Upload Passport or State ID',
          icon: 'badge',
          status: 'Completed',
          tone: 'success',
        },
      ],
    },
    {
      title: 'Training Modules',
      items: [
        {
          title: 'Cybersecurity Essentials',
          description: '45 min • Mandatory for all staff',
          icon: 'security',
          status: 'In Progress',
          tone: 'primary',
        },
        {
          title: 'Cognitive Bias & Inclusion',
          description: '30 min • Cultural integration',
          icon: 'psychology',
          status: 'Pending',
          tone: 'neutral',
        },
      ],
    },
    {
      title: 'Team Introductions',
      items: [
        {
          title: 'Slack Introduction',
          description: 'Post a bio in #new-joiners channel',
          icon: 'chat_bubble',
          status: 'Completed',
          tone: 'success',
        },
        {
          title: 'Coffee with Buddy',
          description: 'Meet with Mark for orientation',
          icon: 'coffee',
          status: 'Pending',
          tone: 'neutral',
        },
      ],
    },
  ],
}
