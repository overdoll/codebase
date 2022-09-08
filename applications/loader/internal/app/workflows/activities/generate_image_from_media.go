package activities

import (
	"context"
	"os"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
)

type GenerateImageFromMediaInput struct {
	Media    *proto.Media
	NewMedia *proto.Media
	Pixelate *int
	Source   string
}

func (h *Activities) GenerateImageFromMedia(ctx context.Context, input GenerateImageFromMediaInput) (*ProcessMediaPayload, error) {

	filters, err := media_processing.NewImageFilters(input.Pixelate)

	if err != nil {
		return nil, err
	}

	newMedia, err := processMediaAndFilter(h, ctx, input.Media, input.NewMedia, filters)

	if err != nil {
		return nil, err
	}

	if err := h.callback.SendCallback(ctx, input.Source, newMedia.Source()); err != nil {
		return &ProcessMediaPayload{AlreadySent: false, Media: newMedia.Source()}, nil
	}

	return &ProcessMediaPayload{AlreadySent: true, Media: newMedia.Source()}, nil
}

func processMediaAndFilter(h *Activities, ctx context.Context, target *proto.Media, mediaToApply *proto.Media, filters *media_processing.ImageFilters) (*media.Media, error) {

	file, err := h.mr.DownloadImageMedia(ctx, media.FromProto(target))

	if err != nil {
		return nil, err
	}

	defer file.Close()
	defer os.Remove(file.Name())

	newMedia := media.FromProto(mediaToApply)

	move, err := media_processing.ApplyFilters(newMedia, file, filters)

	if err != nil {
		return nil, err
	}

	// upload the new resource
	if err := h.mr.UploadMedia(ctx, move.Move(), newMedia); err != nil {
		return nil, err
	}

	// send back the new media
	return newMedia, nil
}
