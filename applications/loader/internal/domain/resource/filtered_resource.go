package resource

type FilteredResource struct {
	oldResource *Resource
	newResource *Resource
}

func NewFilteredResource(oldResource, newResource *Resource) (*FilteredResource, error) {
	return &FilteredResource{
		oldResource: oldResource,
		newResource: newResource,
	}, nil
}

func (f *FilteredResource) OldResource() *Resource {
	return f.oldResource
}

func (f *FilteredResource) NewResource() *Resource {
	return f.newResource
}
