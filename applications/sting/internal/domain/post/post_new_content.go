package post

import "overdoll/libraries/resource"

type NewContent struct {
	postId string

	oldResourceId string
	newResource   *resource.Resource
}

func (n *NewContent) PostId() string {
	return n.postId
}

func (n *NewContent) OldResourceId() string {
	return n.oldResourceId
}

func (n *NewContent) NewResource() *resource.Resource {
	return n.newResource
}

func UnmarshalNewContentFromDatabase(postId, oldResourceId string, newResource *resource.Resource) *NewContent {
	return &NewContent{
		postId:        postId,
		oldResourceId: oldResourceId,
		newResource:   newResource,
	}
}
