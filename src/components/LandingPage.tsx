import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Octokit } from 'octokit'
import { sortOptions, typeOptions } from '../constants'

import { Repository, User, SelectOption } from '../interfaces'
import '../App.scss'

interface LandingPageProps {
  user: User
}

const initialType = {
  value: 'all',
  label: 'All',
}

const initialSort = {
  value: 'created',
  label: 'Created',
}

export default function LandingPage({ user }: LandingPageProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [type, setType] = useState<SelectOption | null>(initialType)
  const [sort, setSort] = useState<SelectOption | null>(initialSort)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchRepositories = async () => {
      if (type === null || sort === null) return

      const octokit = new Octokit()
      let request

      try {
        if (user.username) {
          request = await octokit.request(`GET /users/${user.username}/repos`, {
            org: user.organization,
            sort: sort.value,
            type: type.value,
            page: page,
            per_page: 10,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
          })
        } else {
          request = await octokit.request(
            `GET /orgs/${user.organization}/repos`,
            {
              org: user.organization,
              sort: sort.value,
              type: type.value,
              page: page,
              per_page: 10,
              headers: {
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }
          )
        }

        setRepositories(request.data)
      } catch (error) {
        console.error('Error fetching repositories', error)
      }
    }

    fetchRepositories()
  }, [user, type, sort, page])

  return (
    <div className="landing">
      <h1>Repository List</h1>
      <div className="welcome-container">
        <span className="welcome">
          Welcome {user.username || user.organization}
        </span>
        <hr />
      </div>

      <div className="repository-list">
        <div className="list-operations">
          <label>
            Type:
            <Select
              defaultValue={initialType}
              options={typeOptions}
              onChange={(e) => setType(e)}
              value={type}
            />
          </label>
          <label>
            Sort:
            <Select
              defaultValue={initialSort}
              options={sortOptions}
              onChange={(e) => setSort(e)}
              value={sort}
            />
          </label>
          <div className="page-buttons">
            {/* Limited for demo purposes only */}
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous Page
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page > 3}>
              Next Page
            </button>
          </div>
        </div>
        {repositories &&
          repositories.map((elm) => {
            return (
              <div key={elm.id} role="repository" className="repository">
                <div className="repo-info">
                  <div className="name">
                    <span className="field-label">Name</span>
                    <span className="field-value">{elm.name}</span>
                  </div>
                  <div className="description">
                    <span className="field-label">Description</span>
                    <span className="field-value">{elm.description}</span>
                  </div>
                  <div className="url">
                    <span className="field-label">URL</span>
                    <a href={elm.html_url}>{elm.html_url}</a>
                  </div>
                </div>
                <div className="repo-owner">
                  <span className="field-label">Owner</span>
                  <span className="field-value">{elm.owner.login}</span>
                  <img src={elm.owner.avatar_url} alt="Owner Avatar" />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
