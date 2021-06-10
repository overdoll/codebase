package adapters

import (
	"context"

	sting "overdoll/applications/sting/proto"
)

type StingGrpc struct {
	client sting.StingClient
}

func NewStingGrpc(client sting.StingClient) StingGrpc {
	return StingGrpc{client: client}
}

func (s StingGrpc) GetPendingPost(ctx context.Context, id string) (string, string, error) {
	md, err := s.client.GetPendingPost(ctx, &sting.PendingPostRequest{Id: id})

	if err != nil {
		return "", "", err
	}

	return md.ModeratorId, md.ContributorId, nil
}

func (s StingGrpc) PublishPendingPost(ctx context.Context, id string) error {
	if _, err := s.client.PublishPendingPost(ctx, &sting.PendingPostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) RejectPendingPost(ctx context.Context, id string) error {
	if _, err := s.client.RejectPendingPost(ctx, &sting.PendingPostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) DiscardPendingPost(ctx context.Context, id string) error {
	if _, err := s.client.DiscardPendingPost(ctx, &sting.PendingPostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) UndoPendingPost(ctx context.Context, id string) error {
	if _, err := s.client.UndoPendingPost(ctx, &sting.PendingPostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}
