"use client"

import "../styles/ProjectCard.css"

export default function ProjectCard({ project, onSelect, onDelete }) {
  const fileCount = project.files?.length || 0
  const issueCount = project.issues?.length || 0

  return (
    <div className="project-card">
      <div className="card-header">
        <h3>{project.name}</h3>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          ✕
        </button>
      </div>
      <p className="card-description">{project.description || "No description"}</p>
      <div className="card-stats">
        <div className="stat">
          <span className="label">Files</span>
          <span className="value">{fileCount}</span>
        </div>
        <div className="stat">
          <span className="label">Issues</span>
          <span className="value">{issueCount}</span>
        </div>
      </div>
      <button className="btn btn-secondary btn-full" onClick={onSelect}>
        Open Project
      </button>
    </div>
  )
}
