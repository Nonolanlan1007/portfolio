import {Octokit} from 'octokit'

export async function getRepository (url) {
    return url
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