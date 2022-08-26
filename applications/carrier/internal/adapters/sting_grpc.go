package adapters

import (
	"context"
	"overdoll/applications/carrier/internal/domain/club"
	"overdoll/applications/carrier/internal/domain/post"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/errors"
)

type StingGrpc struct {
	client sting.StingClient
}

func NewStingGrpc(client sting.StingClient) StingGrpc {
	return StingGrpc{client: client}
}

func (s StingGrpc) GetClub(ctx context.Context, clubId string) (*club.Club, error) {

	md, err := s.client.GetClubById(ctx, &sting.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, errors.Wrap(err, "error retrieving club")
	}

	return club.UnmarshalClubFromDatabase(md.Club.Slug, md.Club.Name, md.Club.OwnerAccountId), nil
}

func (s StingGrpc) GetPost(ctx context.Context, postId string) (*post.Post, error) {

	md, err := s.client.GetPost(ctx, &sting.PostRequest{Id: postId})

	if err != nil {
		return nil, errors.Wrap(err, "error retrieving post")
	}

	return post.UnmarshalPostFromDatabase(md.ClubId, md.AccountId), nil
}
