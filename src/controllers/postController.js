import PostModel from "../models/post.js"


export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags =  posts.map(obj=>obj.tags).flat().slice(0,5)

        res.send(tags)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to find"
        });
    }
}

export const AllPost = async (req, res) => {
    try {
        res.send(await PostModel.find().populate('user').exec())
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to find"
        });
    }
}
export const OnePost = async (req, res) => {
    try {   
        const postId = req.params.id
        const data = await PostModel.findById(postId)
        
        if (data) {
            PostModel.findOneAndUpdate(
                {
                _id:postId,
                
                },
                {
                    $inc:{viewsCount:1},
                },
                {
                    returnDocument:"after"
                },
                (err, doc) => {
                    if (err) {
                        console.log(error)
                        return res.status(500).send({
                            status: 500,
                            message: "Unable to return article"
                        });
                    } 
                    if(!doc){
                        return res.status(404).json({
                            message:"Article not found"
                        })
                    }
                    res.send(doc)
                },
            ).populate('user')
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: "Failed to find"
        });
    }
}

export const createPost = async(req, res) => {
    try {
        const { title, text, tags, imageURL } = req.body
        
        const newpost = new PostModel({
            title: title,
            text: text,
            tags: tags.split(','),
            imageURL: `http://localhost:5555${imageURL}`,
            user: req.userId 
        })
       await newpost.save();
        res.send({
            message: "Post Created",
            data: newpost
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to create"
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const { title, text, tags, imageURL } = req.body


        await PostModel.findByIdAndUpdate(
            {
                _id:postId,
            }, {
                title: title,
                text: text,
                tags: tags.split(','),
                imageURL: `http://localhost:5555${imageURL}`,
                user: req.userId 
            }
        )
        res.json({
            success:true
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to update"
        });
    }
};

export const removePost = async (req, res) => {
    try {   
        const postId = req.params.id

        PostModel.findByIdAndRemove(
            {
                _id:postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(error)
                    return res.status(500).send({
                        status: 500,
                        message: "Unable to remove article"
                    });
                }
                if(!doc){
                    return res.status(404).json({
                        message:"Article not found"
                    })
                }
                res.send({
                    seccess: true
                })
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to delete"
        });
    }
}