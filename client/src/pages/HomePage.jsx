"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from "../config.js"
import ProjectCard from "../components/ProjectCard.jsx"
import CreateProjectModal from "../components/CreateProjectModal.jsx"
import "../styles/HomePage.css"

export default function HomePage({ onSelectProject }) {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/projects`)
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (name, description) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      })
      const newProject = await response.json()
      setProjects([...projects, newProject])
      setShowModal(false)
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return
    try {
      await fetch(`${API_BASE_URL}/projects/${id}`, { method: "DELETE" })
      setProjects(projects.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>CodexAI</h1>
          <p>AI-Powered Code Quality Analyzer</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Project
        </button>
      </header>

      {showModal && <CreateProjectModal onClose={() => setShowModal(false)} onSubmit={handleCreateProject} />}

      <main className="home-content">
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <h2>No Projects Yet</h2>
            <p>Create your first project to start analyzing code</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Create Project
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => onSelectProject(project.id)}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
