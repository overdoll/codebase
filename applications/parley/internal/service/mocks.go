package service

import (
	"context"
)

type StingServiceMock struct {
}

func (t StingServiceMock) GetPost(ctx context.Context, s string) (string, string, error) {
	return "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", "1q7MJ5IyRTV0X4J27F3m5wGD5mj", nil
}

func (t StingServiceMock) PublishPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) RejectPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) DiscardPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) UndoPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) RemovePost(ctx context.Context, s string) error {
	return nil
}

type StellaServiceMock struct {
}

func (s StellaServiceMock) GetClubById(ctx context.Context, clubId string) error {
	return nil
}
