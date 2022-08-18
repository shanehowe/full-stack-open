const emptyBlog = []

const oneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const manyBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        title: "My other blog",
        author: "Shane Howe",
        url: "myotherblog.com",
        likes: 4,
        id: "62fc2df7396b58c564b7672a"
    },
    {
        title: "Georginas blog",
        author: "Georgina Wharton",
        url: "whartonsblogs.com",
        likes: 9,
        id: "62fc2efe396b58c564b7672d"
    },
    {
        title: "Georginas second blog",
        author: "Georgina Wharton",
        url: "whartonsblogs.com",
        likes: 3,
        id: "62fc2efe396b58c564b7672d"
    }
]

module.exports = {
    emptyBlog,
    oneBlog,
    manyBlogs
}