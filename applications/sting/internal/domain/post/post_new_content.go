package post

import "overdoll/libraries/resource"

type NewResource struct {
	oldResourceId string
	newResource   *resource.Resource
}

func (n *NewResource) OldResourceId() string {
	return n.oldResourceId
}

func (n *NewResource) NewResource() *resource.Resource {
	return n.newResource
}

func UnmarshalNewResourceFromDatabase(oldResourceId string, newResource *resource.Resource) *NewResource {
	return &NewResource{
		oldResourceId: oldResourceId,
		newResource:   newResource,
	}
}
