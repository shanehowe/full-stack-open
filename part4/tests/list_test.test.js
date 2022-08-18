const list_helper = require('../utils/list_helper')
const { emptyBlog, oneBlog, manyBlogs } = require('./blog_helper')

test('dummy returns 1', () => {
    let blogs

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('empty blog list returns 0', () => {
        const result = list_helper.totalLikes(emptyBlog)

        expect(result).toBe(0)
    })

    test('blog list with size of 1 will return number of likes present on blog', () => {
        const result = list_helper.totalLikes(oneBlog)

        expect(result).toBe(5)
    })

    test('blog list with multiple blogs returns the sum of all likes in the list', () => {
        const result = list_helper.totalLikes(manyBlogs)

        expect(result).toBe(21)
    })
})

describe('favorite blog', () => {
    test('returns the blog with the most amount of likes', () => {
        const result = list_helper.favoriteBlog(manyBlogs)
        const expected = {title: "Georginas blog", author: "Georgina Wharton", likes: 9}

        expect(result).toEqual(expected)
    })
})

describe('most likes', () => {
    test('returnd author whose blog posts have the largest amount of likes', () => {
        const result = list_helper.mostLikes(manyBlogs)

        expect(result).toEqual({ 'Georgina Wharton': 12 })
    })
})