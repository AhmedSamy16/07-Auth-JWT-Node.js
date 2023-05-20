
export const getAllPosts = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You can get All posts'
    })
}

export const createPost = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You can create posts'
    })
}

export const getPostBtId = (req, res) => {
    res.status(200).json({
        status: "success",
        message: 'You can get post by id'
    })
}

export const updatePost = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "You can update post"
    })
}

export const deletePost = (req, res) => {
    res.status(204).json({
        status: 'success'
    })
}