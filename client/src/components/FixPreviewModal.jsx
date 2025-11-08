"use client"

import { useState } from "react"
import "../styles/FixPreviewModal.css"

export default function FixPreviewModal({ fix, onClose, onApply }) {
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = async () => {
    setIsApplying(true)
    try {
      await onApply(fix.id)
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content fix-preview" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{fix.title}</h2>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="fix-preview-content">
          <div className="fix-section">
            <h3>Issue Description</h3>
            <p className="fix-description">{fix.description}</p>
          </div>

          <div className="fix-section">
            <h3>Suggested Fix</h3>
            <div className="fix-patch">
              <code>{fix.patch}</code>
            </div>
          </div>

          {fix.generatedContent && (
            <div className="fix-section">
              <h3>Generated Content</h3>
              <div className="generated-code">
                <code>{fix.generatedContent}</code>
              </div>
            </div>
          )}

          <div className="fix-section">
            <h3>Unified Diff</h3>
            <div className="diff-viewer">
              <pre>{fix.unifiedDiff}</pre>
            </div>
          </div>

          <div className="fix-metadata">
            <div className="meta-item">
              <span className="label">AI Generated:</span>
              <span className="value">{fix.aiGenerated ? "Yes" : "No"}</span>
            </div>
            {fix.aiModel && (
              <div className="meta-item">
                <span className="label">Model:</span>
                <span className="value">{fix.aiModel}</span>
              </div>
            )}
            <div className="meta-item">
              <span className="label">Category:</span>
              <span className="value">{fix.category}</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApply} disabled={isApplying}>
            {isApplying ? "Applying..." : "Apply Fix"}
          </button>
        </div>
      </div>
    </div>
  )
}
