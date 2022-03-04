package post

type NewContent struct {
	postId string

	oldResourceId string
	newResourceId string
}

func (n *NewContent) PostId() string {
	return n.postId
}

func (n *NewContent) OldResourceId() string {
	return n.oldResourceId
}

func (n *NewContent) NewResourceId() string {
	return n.newResourceId
}

func UnmarshalNewContentFromDatabase(postId, oldResourceId, newResourceId string) *NewContent {
	return &NewContent{
		postId:        postId,
		oldResourceId: oldResourceId,
		newResourceId: newResourceId,
	}
}
