package service

import (
	"context"
)

type StingServiceMock struct {
}

func (t StingServiceMock) GetPost(ctx context.Context, s string) (string, error) {
	return "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", nil
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

func (s StellaServiceMock) SuspendClub(ctx context.Context, clubId string, endTime int64) error {
	return nil
}

func (s StellaServiceMock) GetClubById(ctx context.Context, clubId string) error {
	return nil
}
