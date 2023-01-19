import {Octokit} from 'octokit'

export async function getRepositoryLangs (url) {
    const octokit = login()
    const [owner, repo] = url.split('/').slice(-2)
    return await octokit.request('GET /repos/{owner}/{repo}/languages', {
        owner,
        repo
    })
}

export async function getUser (username) {
    const octokit = login()
    return await octokit.request(`GET /users/${username}`, {
        username: username
    })
}

function login () {
    return new Octokit({
        auth: process.env.GITHUB_TOKEN
    })
}