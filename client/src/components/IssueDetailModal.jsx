"use client"

import { useState } from "react"
import FixPreviewModal from "./FixPreviewModal.jsx"
import "../styles/IssueDetailModal.css"

export default function IssueDetailModal({ issue, onClose, onGenerateFix }) {
  const [fix, setFix] = useState(null)
  const [showFixPreview, setShowFixPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateFix = async () => {
    try {
      setIsGenerating(true)
      const generatedFix = await onGenerateFix(issue.id)
      if (generatedFix) {
        setFix(generatedFix)
        setShowFixPreview(true)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content issue-detail" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{issue.title}</h2>
            <button className="btn-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="issue-detail-content">
            <div className="issue-meta">
              <div className="meta-badge">
                <span className="label">Category:</span>
                <span className={`category-tag ${issue.category.toLowerCase()}`}>{issue.category}</span>
              </div>
              <div className="meta-badge">
                <span className="label">Severity:</span>
                <span className={`severity-tag severity-${issue.severity.toLowerCase()}`}>{issue.severity}</span>
              </div>
              {issue.rule && (
                <div className="meta-badge">
                  <span className="label">Rule:</span>
                  <span className="rule-tag">{issue.rule}</span>
                </div>
              )}
            </div>

            <div className="issue-section">
              <h3>Description</h3>
              <p>{issue.message}</p>
            </div>

            {issue.code && (
              <div className="issue-section">
                <h3>Code Context</h3>
                <div className="code-block">
                  <code>{issue.code}</code>
                </div>
              </div>
            )}

            {issue.filename && (
              <div className="issue-section">
                <h3>File</h3>
                <p className="filename">{issue.filename}</p>
              </div>
            )}

            <div className="issue-section">
              <h3>Why This Matters</h3>
              <p className="rationale">{this.getRationalText(issue.category, issue.severity)}</p>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleGenerateFix} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Fix"}
            </button>
          </div>
        </div>
      </div>

      {showFixPreview && fix && (
        <FixPreviewModal fix={fix} onClose={() => setShowFixPreview(false)} onApply={() => setShowFixPreview(false)} />
      )}
    </>
  )
}

// Helper to get rationale text
IssueDetailModal.prototype.getRationalText = (category, severity) => {
  const texts = {
    ACCESSIBILITY:
      "Accessibility issues make your site harder to use for people with disabilities. Fixing these improves user experience for everyone.",
    SEO: "SEO issues can hurt your search engine rankings and discoverability. Proper SEO improves visibility to potential users.",
    SECURITY: "Security issues can expose your users to attacks. Fixing these protects user data and trust.",
    PERFORMANCE:
      "Performance issues slow down your site and hurt user experience. Fast sites have better engagement and SEO.",
    STRUCTURAL: "Structural issues can cause rendering problems and make code harder to maintain.",
    I18N: "Internationalization issues prevent your site from reaching global audiences.",
  }
  return texts[category] || "This issue affects code quality and maintainability."
}
