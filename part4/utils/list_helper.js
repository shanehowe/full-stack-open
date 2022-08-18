const { manyBlogs } = require('../tests/blog_helper')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const favorite = blogs.find(blog => blog.likes === mostLikes)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostLikes = (blogs) => {
    const authorLikes = {}

    blogs.forEach(blog => {
        if (authorLikes[blog.author] !== undefined) {
            authorLikes[blog.author] += blog.likes
        } else {
            authorLikes[blog.author] = blog.likes
        }
    })

    const highestLikes = Math.max(...Object.values(authorLikes))
    const authorWithMostLikes = {}

    for (const [key, value] of Object.entries(authorLikes)) {
        if (authorLikes[key] === highestLikes) {
            authorWithMostLikes[key] = value

            return authorWithMostLikes
        }
    }
}

const mostBlogs = (blogs) => {
    const authorBlogs = {}

    blogs.forEach(blog => {
        if (authorBlogs[blog.author] !== undefined) {
            authorBlogs[blog.author] += 1
        } else {
            authorBlogs[blog.author] = 1
        }
    })

    const mostBlogs = Math.max(...Object.values(authorBlogs))
    const authorWithMostBlogs = {}

    for (const [key, value] of Object.entries(authorBlogs)) {
        if (authorBlogs[key] === mostBlogs) {
            authorWithMostBlogs[key] = value

            return authorWithMostBlogs
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}