package post

import (
	"github.com/stretchr/testify/require"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestPostContent_non_published_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:                   uuid.New().String(),
		resourceId:           resourceId,
		resourceIdHidden:     resourceIdHidden,
		isSupporterOnly:      true,
		canViewSupporterOnly: false,
		requester:            nil,
	}

	post := &Post{
		state: Draft,
	}

	require.True(t, contentItem.CanViewSupporterOnly(post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(post))
}

func TestPostContent_published_non_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:                   uuid.New().String(),
		resourceId:           resourceId,
		resourceIdHidden:     resourceIdHidden,
		isSupporterOnly:      false,
		canViewSupporterOnly: false,
		requester:            nil,
	}

	post := &Post{
		state: Published,
	}

	require.True(t, contentItem.CanViewSupporterOnly(post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(post))
}

func TestPostContent_published_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:                   uuid.New().String(),
		resourceId:           resourceId,
		resourceIdHidden:     resourceIdHidden,
		isSupporterOnly:      true,
		canViewSupporterOnly: true,
		requester:            nil,
	}

	post := &Post{
		state: Published,
	}

	require.True(t, contentItem.CanViewSupporterOnly(post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(post))
}

func TestPostContent_published_supporter_only_as_staff(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:                   uuid.New().String(),
		resourceId:           resourceId,
		resourceIdHidden:     resourceIdHidden,
		isSupporterOnly:      true,
		canViewSupporterOnly: false,
		requester:            testing_tools.NewStaffPrincipal(""),
	}

	post := &Post{
		state: Published,
	}

	require.True(t, contentItem.CanViewSupporterOnly(post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(post))
}

func TestPostContent_published_supporter_only_as_nobody(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:                   uuid.New().String(),
		resourceId:           resourceId,
		resourceIdHidden:     resourceIdHidden,
		isSupporterOnly:      true,
		canViewSupporterOnly: false,
		requester:            testing_tools.NewDefaultPrincipal(""),
	}

	post := &Post{
		state: Published,
	}

	require.False(t, contentItem.CanViewSupporterOnly(post), "cannot view supporter only content on draft")
	require.Equal(t, resourceIdHidden, contentItem.ResourceIdRequest(post), "show hidden resource id")
}
