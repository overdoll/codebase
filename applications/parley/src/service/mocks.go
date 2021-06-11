package service

import (
	"context"
)

type StingServiceMock struct {
}

func (t StingServiceMock) GetPendingPost(ctx context.Context, s string) (string, string, error) {
	return "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", "1q7MJ5IyRTV0X4J27F3m5wGD5mj", nil
}

func (t StingServiceMock) PublishPendingPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) RejectPendingPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) DiscardPendingPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) UndoPendingPost(ctx context.Context, s string) error {
	return nil
}
