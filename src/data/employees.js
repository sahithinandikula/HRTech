const baseEmployees = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Senior Product Designer',
    team: 'Design Team',
    location: 'Remote / NYC',
    joined: 'Joined Oct 2023',
    progress: 85,
    lastActive: 'Today, 10:42 AM',
    questionsAsked: 3,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiz6zO5h16X0wuw8kbhlVvlfHXp7DLyWyqFYPFQW6_-LT7ZDs8eAhsNZ7tl3MJYNaB6mLAKa7YQyzZUOcKzJWvrKVdtT7_laOLMEtw3gE8es-oLof5L4df6EWcpAVOykd02bP7VmXPpKI0QUjkUqoHEIn-JMPdFMi0TfuFQDly9VMZGydAMm_I4ucbea0W65nnFll2fFQV9fMHjfuJb0nIPJ29pqqgzOUbFbCxVZB1jVUk0AE0Y8Ng08BhA5pROz4G_B_HkHqYGJmg',
  },
  {
    id: 'maya-rodriguez',
    name: 'Maya Rodriguez',
    role: 'Full Stack Engineer',
    team: 'Engineering',
    location: 'Hybrid / Austin',
    joined: 'Joined Jan 2024',
    progress: 42,
    lastActive: '3 days ago',
    questionsAsked: 0,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJEifwHihGpN62aTQ6Fg-cYVikzzzZWfS1-mro9AlolGBm0GfHH7Dtany6ESNKIwJxyF2EHl4uFzXg6qQA-Dl-N5VJ-rtGlCc-kzaI1WgmPa8bpjPcnl9MXDmJ--n5PwUL6FTVQEaHtt8_sc8LC0wEJXnvuHM5dnlQLccbPy7SJ2SZRZMsR5B96g814KV9vTilrQZDGXrKcdzD1uQUQZ8ERf8CZlVefD7lnBvo4DRoeIx3oDYER_oQsyAu_AATViquCIb62YUPcwg4',
  },
  {
    id: 'jordan-smith',
    name: 'Jordan Smith',
    role: 'Product Manager',
    team: 'Product',
    location: 'Remote / Chicago',
    joined: 'Joined Feb 2024',
    progress: 12,
    lastActive: 'Yesterday, 5:15 PM',
    questionsAsked: 1,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADulLgLJ7cNA0Bk36iVRuBGmE7NKjLoIpOTtL3-el2RWT9KecboB2VOh46e1isJ6ZFwM65NY8OW6IgbDQ0UE04fjOZqfgmRH1veVgunYTikbkthVizovkgNxOk1SiV9W0ZJO131TiJSHfCS612Rmxzb5CmPWAf2tEty9i7v_hLYKJuISrT9o35ReFM3WvVw1sBvjXVSEw_ObDKpuNrhJmL-I1CAqAHQvSL2LocMtzldKkeznPi8IzYUkzB-39lCJe9-HdBqcMtbpw2',
  },
]

export function calculateHealthScore(employee) {
  let score = 100

  if (employee.questionsAsked === 0) {
    score -= 40
  }

  if (employee.progress < 50) {
    score -= 30
  }

  return score
}

export function getHealthStatus(score) {
  if (score > 70) {
    return { label: 'Green', tone: 'green' }
  }

  if (score >= 40) {
    return { label: 'Yellow', tone: 'yellow' }
  }

  return { label: 'Red', tone: 'red' }
}

export const employees = baseEmployees.map((employee) => {
  const healthScore = calculateHealthScore(employee)
  const healthStatus = getHealthStatus(healthScore)

  return {
    ...employee,
    healthScore,
    healthStatus,
    isAtRisk: healthStatus.tone === 'red',
  }
})

export const employeesById = Object.fromEntries(employees.map((employee) => [employee.id, employee]))
