package post

import (
	"github.com/stretchr/testify/require"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestPostContent_non_published_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:               uuid.New().String(),
		resourceId:       resourceId,
		resourceIdHidden: resourceIdHidden,
		isSupporterOnly:  true,
	}

	post := &Post{
		state: Draft,
	}

	require.True(t, contentItem.CanViewSupporterOnly(nil, post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(nil, post))
}

func TestPostContent_published_non_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:               uuid.New().String(),
		resourceId:       resourceId,
		resourceIdHidden: resourceIdHidden,
		isSupporterOnly:  false,
	}

	post := &Post{
		state: Published,
	}

	require.True(t, contentItem.CanViewSupporterOnly(nil, post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(nil, post))
}

func TestPostContent_published_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()
	clubId := uuid.New().String()

	contentItem := &Content{
		id:               uuid.New().String(),
		resourceId:       resourceId,
		resourceIdHidden: resourceIdHidden,
		isSupporterOnly:  true,
	}

	post := &Post{
		state:  Published,
		clubId: clubId,
	}

	requester := testing_tools.NewDefaultPrincipal("")
	p, _ := principal.NewClubExtension(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{clubId},
		ClubMembershipIds: nil,
		OwnerClubIds:      []string{clubId},
	})
	requester.ExtendWithClubExtension(p)

	require.True(t, contentItem.CanViewSupporterOnly(requester, post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(requester, post))
}

func TestPostContent_published_supporter_only_as_staff(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:               uuid.New().String(),
		resourceId:       resourceId,
		resourceIdHidden: resourceIdHidden,
		isSupporterOnly:  true,
	}

	requester := testing_tools.NewStaffPrincipal("")

	post := &Post{
		state: Published,
	}

	require.True(t, contentItem.CanViewSupporterOnly(requester, post), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.ResourceIdRequest(requester, post))
}

func TestPostContent_published_supporter_only_as_nobody(t *testing.T) {
	t.Parallel()

	resourceId := uuid.New().String()
	resourceIdHidden := uuid.New().String()

	contentItem := &Content{
		id:               uuid.New().String(),
		resourceId:       resourceId,
		resourceIdHidden: resourceIdHidden,
		isSupporterOnly:  true,
	}

	post := &Post{
		state: Published,
	}

	require.False(t, contentItem.CanViewSupporterOnly(nil, post), "cannot view supporter only content on draft")
	require.Equal(t, resourceIdHidden, contentItem.ResourceIdRequest(nil, post), "show hidden resource id")
}
