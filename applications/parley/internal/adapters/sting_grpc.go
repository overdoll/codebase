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

func (s StingGrpc) GetPost(ctx context.Context, id string) (string, error) {

	md, err := s.client.GetPost(ctx, &sting.PostRequest{Id: id})

	if err != nil {
		return "", err
	}

	return md.ClubId, nil
}

func (s StingGrpc) PublishPost(ctx context.Context, id string) error {

	if _, err := s.client.PublishPost(ctx, &sting.PostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) RejectPost(ctx context.Context, id string) error {

	if _, err := s.client.RejectPost(ctx, &sting.PostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) RemovePost(ctx context.Context, id string) error {

	if _, err := s.client.RemovePost(ctx, &sting.PostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) DiscardPost(ctx context.Context, id string) error {

	if _, err := s.client.DiscardPost(ctx, &sting.PostRequest{Id: id}); err != nil {
		return err
	}

	return nil
}
