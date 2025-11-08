import "../styles/IssueCard.css"

export default function IssueCard({ issue }) {
  const categoryEmojis = {
    ACCESSIBILITY: "♿",
    SEO: "🔍",
    SECURITY: "🔒",
    PERFORMANCE: "⚡",
    STRUCTURAL: "🏗️",
    I18N: "🌍",
    DESIGN_SYSTEM: "🎨",
  }

  const severityClass = {
    CRITICAL: "severity-critical",
    HIGH: "severity-high",
    MEDIUM: "severity-medium",
    LOW: "severity-low",
  }

  return (
    <div className={`issue-card ${severityClass[issue.severity] || ""}`}>
      <div className="issue-header">
        <span className="issue-category">
          {categoryEmojis[issue.category] || "⚠️"} {issue.category}
        </span>
        <span className={`issue-severity`}>{issue.severity}</span>
      </div>
      <h4 className="issue-title">{issue.title}</h4>
      <p className="issue-message">{issue.message}</p>
      {issue.code && (
        <div className="issue-code">
          <code>{issue.code.substring(0, 200)}...</code>
        </div>
      )}
      {issue.rule && <p className="issue-rule">Rule: {issue.rule}</p>}
    </div>
  )
}
