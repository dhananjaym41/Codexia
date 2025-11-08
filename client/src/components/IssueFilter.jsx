"use client"

import "../styles/IssueFilter.css"

export default function IssueFilter({ issues, onFilterChange }) {
  return (
    <div className="issue-filter">
      <div className="filter-group">
        <label>Filter by Severity:</label>
        <div className="filter-buttons">
          <button className="filter-btn active" onClick={() => onFilterChange({ severity: null })}>
            All
          </button>
          {["CRITICAL", "HIGH", "MEDIUM", "LOW"].map((severity) => (
            <button
              key={severity}
              className={`filter-btn severity-${severity.toLowerCase()}`}
              onClick={() => onFilterChange({ severity })}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Filter by Category:</label>
        <select onChange={(e) => onFilterChange({ category: e.target.value || null })}>
          <option value="">All Categories</option>
          {["ACCESSIBILITY", "SEO", "SECURITY", "PERFORMANCE", "STRUCTURAL", "I18N"].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort by:</label>
        <select onChange={(e) => onFilterChange({ sortBy: e.target.value })}>
          <option value="severity">Severity (High to Low)</option>
          <option value="category">Category</option>
          <option value="file">File Name</option>
        </select>
      </div>
    </div>
  )
}
