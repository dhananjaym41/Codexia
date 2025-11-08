"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from "../config.js"
import FileUpload from "../components/FileUpload.jsx"
import FileList from "../components/FileList.jsx"
import ScanResults from "../components/ScanResults.jsx"
import IssueFilter from "../components/IssueFilter.jsx"
import IssueDetailModal from "../components/IssueDetailModal.jsx"
import "../styles/ProjectDetail.css"

export default function ProjectDetail({ projectId, onBack }) {
  const [project, setProject] = useState(null)
  const [files, setFiles] = useState([])
  const [scanResults, setScanResults] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [activeTab, setActiveTab] = useState("files")
  const [loading, setLoading] = useState(true)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [filterConfig, setFilterConfig] = useState({ severity: null, category: null, sortBy: "severity" })
  const [appliedFixes, setAppliedFixes] = useState(new Set())

  useEffect(() => {
    loadProject()
  }, [projectId])

  const loadProject = async () => {
    try {
      setLoading(true)
      const projectRes = await fetch(`${API_BASE_URL}/projects/${projectId}`)
      const projectData = await projectRes.json()
      setProject(projectData)

      const filesRes = await fetch(`${API_BASE_URL}/files/project/${projectId}`)
      const filesData = await filesRes.json()
      setFiles(filesData)
    } catch (error) {
      console.error("Error loading project:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (newFiles) => {
    const formData = new FormData()
    newFiles.forEach((file) => formData.append("files", file))

    try {
      const response = await fetch(`${API_BASE_URL}/files/upload/${projectId}`, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setFiles([...files, ...data.files])
        setActiveTab("files")
      }
    } catch (error) {
      console.error("Error uploading files:", error)
    }
  }

  const handleScan = async () => {
    if (files.length === 0) {
      alert("Please upload files first")
      return
    }

    try {
      setIsScanning(true)

      // Register files for scanning
      await fetch(`${API_BASE_URL}/scan/register/${projectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files }),
      })

      const response = await fetch(`${API_BASE_URL}/scan/project/${projectId}`, {
        method: "POST",
      })

      // Simulate scan delay for demo
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Get results
      const resultsRes = await fetch(`${API_BASE_URL}/scan/results/${projectId}`)
      const results = await resultsRes.json()
      setScanResults(results)
      setActiveTab("results")
    } catch (error) {
      console.error("Error scanning:", error)
    } finally {
      setIsScanning(false)
    }
  }

  const handleDeleteFile = async (fileId) => {
    try {
      await fetch(`${API_BASE_URL}/files/${fileId}`, { method: "DELETE" })
      setFiles(files.filter((f) => f.id !== fileId))
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const handleGenerateFix = async (issueId) => {
    // Simulate fix generation
    const mockFix = {
      id: `fix-${issueId}`,
      title: "Suggested Fix",
      patch: "Apply the recommended changes",
      description: "This fix addresses the identified issue",
      unifiedDiff: "--- original\n+++ fixed\n@@ fix applied @@",
      generatedContent: "<generated content here>",
      aiGenerated: true,
      aiModel: "gpt-3.5-turbo",
      category: "ACCESSIBILITY",
    }

    return mockFix
  }

  const handleApplyFix = async (fixId) => {
    setAppliedFixes(new Set([...appliedFixes, fixId]))
    alert("Fix applied successfully!")
  }

  const getFilteredIssues = () => {
    let filtered = scanResults?.issues || []

    if (filterConfig.severity) {
      filtered = filtered.filter((i) => i.severity === filterConfig.severity)
    }

    if (filterConfig.category) {
      filtered = filtered.filter((i) => i.category === filterConfig.category)
    }

    // Sort
    if (filterConfig.sortBy === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category))
    } else if (filterConfig.sortBy === "file") {
      filtered.sort((a, b) => (a.filename || "").localeCompare(b.filename || ""))
    } else {
      // Sort by severity
      const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
      filtered.sort((a, b) => (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4))
    }

    return filtered
  }

  if (loading) {
    return <div className="loading">Loading project...</div>
  }

  const filteredIssues = getFilteredIssues()

  return (
    <div className="project-detail">
      <header className="project-header">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <div className="project-title">
          <h1>{project?.name}</h1>
          <p>{project?.description}</p>
        </div>
        <button className="btn btn-primary" onClick={handleScan} disabled={isScanning || files.length === 0}>
          {isScanning ? "Scanning..." : "Start Scan"}
        </button>
      </header>

      <div className="tabs">
        <button className={`tab ${activeTab === "files" ? "active" : ""}`} onClick={() => setActiveTab("files")}>
          Files ({files.length})
        </button>
        <button className={`tab ${activeTab === "results" ? "active" : ""}`} onClick={() => setActiveTab("results")}>
          Scan Results
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "files" && (
          <div className="files-tab">
            <FileUpload onUpload={handleUpload} />
            {files.length > 0 && <FileList files={files} onDelete={handleDeleteFile} />}
          </div>
        )}

        {activeTab === "results" && (
          <div className="results-tab">
            {scanResults ? (
              <>
                <ScanResults results={scanResults} />
                <div className="issues-section">
                  <h2>Issues ({filteredIssues.length})</h2>
                  <IssueFilter issues={scanResults.issues} onFilterChange={setFilterConfig} />
                  <div className="issues-grid">
                    {filteredIssues.map((issue, idx) => (
                      <div key={idx} className="issue-list-item" onClick={() => setSelectedIssue(issue)}>
                        <div className="issue-header-row">
                          <h4>{issue.title}</h4>
                          <span className={`severity-badge severity-${issue.severity.toLowerCase()}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="issue-message">{issue.message}</p>
                        <p className="issue-file">{issue.filename}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No scan results yet. Run a scan to see issues and suggestions.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onGenerateFix={handleGenerateFix}
        />
      )}
    </div>
  )
}
