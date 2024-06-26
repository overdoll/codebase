package post

import (
	"github.com/stretchr/testify/require"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestPostContent_non_published_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := &media.Media{}
	resourceIdHidden := &media.Media{}

	contentItem := &Content{
		media:           resourceId,
		mediaHidden:     resourceIdHidden,
		isSupporterOnly: true,
		post: &Post{
			state: Draft,
		},
	}

	require.True(t, contentItem.CanViewSupporterOnly(nil), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.MediaRequest(nil))
}

func TestPostContent_published_non_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := &media.Media{}
	resourceIdHidden := &media.Media{}

	contentItem := &Content{
		media:           resourceId,
		mediaHidden:     resourceIdHidden,
		isSupporterOnly: false,
		post: &Post{
			state: Published,
		},
	}

	require.True(t, contentItem.CanViewSupporterOnly(nil), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.MediaRequest(nil))
}

func TestPostContent_published_supporter_only(t *testing.T) {
	t.Parallel()

	resourceId := &media.Media{}
	resourceIdHidden := &media.Media{}
	clubId := uuid.New().String()

	contentItem := &Content{
		media:           resourceId,
		mediaHidden:     resourceIdHidden,
		isSupporterOnly: true,
		post: &Post{
			state:  Published,
			clubId: clubId,
		},
	}

	requester := testing_tools.NewDefaultPrincipal("")
	p, _ := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{clubId},
		ClubMembershipIds: nil,
		OwnerClubIds:      []string{clubId},
	})
	requester.ExtendWithClubExtension(p)

	require.True(t, contentItem.CanViewSupporterOnly(requester), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.MediaRequest(requester))
}

func TestPostContent_published_supporter_only_as_staff(t *testing.T) {
	t.Parallel()

	resourceId := &media.Media{}
	resourceIdHidden := &media.Media{}

	contentItem := &Content{
		media:           resourceId,
		mediaHidden:     resourceIdHidden,
		isSupporterOnly: true,
		post: &Post{
			state: Published,
		},
	}

	requester := testing_tools.NewStaffPrincipal("")

	require.True(t, contentItem.CanViewSupporterOnly(requester), "can view supporter only content on draft")
	require.Equal(t, resourceId, contentItem.MediaRequest(requester))
}

func TestPostContent_published_supporter_only_as_nobody(t *testing.T) {
	t.Parallel()

	resourceId := &media.Media{}
	resourceIdHidden := &media.Media{}

	contentItem := &Content{
		media:           resourceId,
		mediaHidden:     resourceIdHidden,
		isSupporterOnly: true,
		post: &Post{
			state: Published,
		},
	}

	require.False(t, contentItem.CanViewSupporterOnly(nil), "cannot view supporter only content on draft")
	require.Equal(t, resourceIdHidden, contentItem.MediaRequest(nil), "show hidden resource id")
}
