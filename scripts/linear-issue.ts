import 'dotenv/config'

interface LinearIssueResponse {
  data?: LinearIssue
  message?: string
  error?: string
}

interface LinearIssue {
  id: string
  identifier: string
  title: string
  url?: string
  gitBranchName?: string
  state?: {
    name: string
    type?: string
  }
  team?: {
    id: string
    name: string
    key?: string
  }
}

function getIssueId() {
  const issueId = process.argv[2]

  if (!issueId) {
    console.error('Usage: npm run linear:issue <ISSUE_ID> (e.g., FNF-260)')
    process.exit(1)
  }

  return issueId
}

function getApiKey() {
  const token = process.env.LINEAR_API_KEY

  if (!token) {
    console.error('Missing LINEAR_API_KEY environment variable. Set it in your shell or .env file.')
    process.exit(1)
  }

  return token
}

async function fetchIssue(issueId: string, token: string): Promise<LinearIssue> {
  const response = await fetch(`https://api.linear.app/rest/issue/${encodeURIComponent(issueId)}`.trim(), {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Linear request failed (${response.status}): ${body}`)
  }

  const payload = (await response.json()) as LinearIssueResponse

  if (!payload.data) {
    const reason = payload.error || payload.message || 'No data returned'
    throw new Error(`Linear response missing issue data: ${reason}`)
  }

  return payload.data
}

function printIssue(issue: LinearIssue) {
  console.log('Identifier:    ', issue.identifier)
  console.log('Title:         ', issue.title)
  if (issue.team) {
    console.log('Team:          ', `${issue.team.name}${issue.team.key ? ` (${issue.team.key})` : ''}`)
  }
  if (issue.state) {
    console.log('State:         ', `${issue.state.name}${issue.state.type ? ` [${issue.state.type}]` : ''}`)
  }
  if (issue.gitBranchName) {
    console.log('gitBranchName: ', issue.gitBranchName)
  }
  if (issue.url) {
    console.log('URL:           ', issue.url)
  }
}

async function main() {
  const issueId = getIssueId()
  const token = getApiKey()

  try {
    const issue = await fetchIssue(issueId, token)
    printIssue(issue)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Failed to fetch Linear issue:', message)
    process.exit(1)
  }
}

void main()
