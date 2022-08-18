package post

type LikedPost struct {
	like *Like
	post *Post
}

func (l *LikedPost) Like() *Like {
	return l.like
}

func (l *LikedPost) Post() *Post {
	return l.post
}

func UnmarshalLikedPostFromDatabase(like *Like, post *Post) *LikedPost {
	return &LikedPost{like: like, post: post}
}
