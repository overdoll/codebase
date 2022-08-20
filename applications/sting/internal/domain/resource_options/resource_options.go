package resource_options

import "overdoll/libraries/resource"

type ResourceOptions struct {
	private    bool
	id         string
	resourceId string
	token      string
	width      int
	height     int

	newId string
}

func (r *ResourceOptions) Private() bool {
	return r.private
}

func (r *ResourceOptions) Id() string {
	return r.id
}

func (r *ResourceOptions) ResourceId() string {
	return r.resourceId
}

func (r *ResourceOptions) Token() string {
	return r.token
}

func (r *ResourceOptions) Width() int {
	return r.width
}

func (r *ResourceOptions) Height() int {
	return r.height
}

func (r *ResourceOptions) NewId() string {
	return r.newId
}

func NewResourceOptionsForClubBanner(res *resource.Resource, newId string) *ResourceOptions {

	width := 480

	if res.IsVideo() {
		width = 720
	}

	return &ResourceOptions{
		private:    false,
		id:         res.ItemId(),
		resourceId: res.ID(),
		token:      "CLUB_BANNER",
		width:      width,
		height:     0,
		newId:      newId,
	}
}

func NewResourceOptionsForCategoryBanner(res *resource.Resource, newId string) *ResourceOptions {

	width := 480

	if res.IsVideo() {
		width = 720
	}

	return &ResourceOptions{
		private:    false,
		id:         res.ItemId(),
		resourceId: res.ID(),
		token:      "CATEGORY_BANNER",
		width:      width,
		height:     0,
		newId:      newId,
	}
}

func NewResourceOptionsForCharacterBanner(res *resource.Resource, newId string) *ResourceOptions {

	width := 480

	if res.IsVideo() {
		width = 720
	}

	return &ResourceOptions{
		private:    false,
		id:         res.ItemId(),
		resourceId: res.ID(),
		token:      "CHARACTER_BANNER",
		width:      width,
		height:     0,
		newId:      newId,
	}
}

func NewResourceOptionsForSeriesBanner(res *resource.Resource, newId string) *ResourceOptions {

	width := 480

	if res.IsVideo() {
		width = 720
	}

	return &ResourceOptions{
		private:    false,
		id:         res.ItemId(),
		resourceId: res.ID(),
		token:      "SERIES_BANNER",
		width:      width,
		height:     0,
		newId:      newId,
	}
}
