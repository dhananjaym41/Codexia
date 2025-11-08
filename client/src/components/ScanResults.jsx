import IssueCard from "./IssueCard.jsx"
import "../styles/ScanResults.css"

export default function ScanResults({ results }) {
  const { summary, issues } = results

  const severityColors = {
    CRITICAL: "#dc2626",
    HIGH: "#f97316",
    MEDIUM: "#f59e0b",
    LOW: "#3b82f6",
  }

  return (
    <div className="scan-results">
      <div className="results-summary">
        <h2>Scan Results</h2>
        <div className="summary-stats">
          <div className="stat-box critical">
            <span className="label">Critical</span>
            <span className="value">{summary?.critical || 0}</span>
          </div>
          <div className="stat-box high">
            <span className="label">High</span>
            <span className="value">{summary?.high || 0}</span>
          </div>
          <div className="stat-box medium">
            <span className="label">Medium</span>
            <span className="value">{summary?.medium || 0}</span>
          </div>
          <div className="stat-box low">
            <span className="label">Low</span>
            <span className="value">{summary?.low || 0}</span>
          </div>
        </div>
        <div className="total-issues">
          Total Issues: <strong>{summary?.totalIssues || 0}</strong>
        </div>
      </div>

      <div className="issues-list">
        {issues && issues.length > 0 ? (
          issues.map((issue, idx) => <IssueCard key={idx} issue={issue} />)
        ) : (
          <div className="empty-state">
            <p>No issues found! Your code looks good.</p>
          </div>
        )}
      </div>
    </div>
  )
}
