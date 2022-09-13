package activities

import (
	"context"
	"go.temporal.io/sdk/activity"
	"go.uber.org/zap"
	"os"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"strings"
)

type ProcessMediaFromUploadInput struct {
	Media  *proto.Media
	Source string
}

func (h *Activities) ProcessMediaFromUpload(ctx context.Context, input ProcessMediaFromUploadInput) (*ProcessMediaPayload, error) {

	var heartbeat int64

	numbersAlreadySent := make(map[int64]bool)

	finished := false

	newMedia := media.FromProto(input.Media)

	// when progress is made on the resource socket, we record a heartbeat
	cleanup, err := media_processing.ListenProgressSocket(input.Media.Id, func(progress int64) {

		if finished {
			return
		}

		// record heartbeat so we know this activity is still functional
		heartbeat++
		info := activity.GetInfo(ctx)

		// TODO: this heartbeat isn't recorded for some reason? so we make a manual API call (possibly because its called from another goroutine?)
		activity.RecordHeartbeat(ctx, heartbeat)
		if err := h.event.SendProcessMediaHeartbeat(ctx, info.TaskToken, progress); err != nil {

			if strings.Contains(err.Error(), "workflow execution already completed") {
				return
			}

			if strings.Contains(err.Error(), "invalid activityID or activity already timed out or invoking workflow is completed") {
				return
			}

			zap.S().Errorw("failed to send heartbeat", zap.Error(err))
		}

		_, alreadySentNumber := numbersAlreadySent[progress]

		if !alreadySentNumber {
			numbersAlreadySent[progress] = true

			if err := h.pr.UpdateMediaProgress(ctx, newMedia, float64(progress)); err != nil {
				zap.S().Errorw("failed to send process media progress", zap.Error(err))
			}
		}
	})

	defer cleanup()
	defer func() {
		finished = true
	}()

	if err != nil {
		return nil, err
	}

	if err := processMedia(h, ctx, newMedia); err != nil {
		return nil, err
	}

	if !newMedia.IsFailed() {
		if err := h.sr.StoreMedia(ctx, newMedia); err != nil {
			return nil, err
		}
	}

	if err := h.callback.SendCallback(ctx, input.Source, input.Media); err != nil {
		return &ProcessMediaPayload{AlreadySent: false, Media: input.Media}, nil
	}

	return &ProcessMediaPayload{AlreadySent: true, Media: input.Media}, nil
}

func processMedia(h *Activities, ctx context.Context, target *media.Media) error {

	// first, we need to download the resource
	file, err := h.ur.DownloadUpload(ctx, target.ID())

	if err != nil {
		return err
	}

	// make sure we always get rid of the file after we're done
	defer file.Close()
	defer os.Remove(file.Name())

	// process resource, get result of targets that need to be uploaded
	processResponse, err := media_processing.ProcessMedia(target, file)

	if err != nil {
		return errors.Wrap(err, "failed to process media")
	}

	if processResponse.Failed() {
		target.RawProto().State.Processed = false
		target.RawProto().State.Failed = true
		return nil
	}

	// upload the new resource
	if err := h.mr.UploadMedia(ctx, processResponse.Move(), target); err != nil {
		return err
	}

	// update progress
	if err = h.pr.UpdateMediaProgress(ctx, target, float64(-2)); err != nil {
		return err
	}

	return nil
}
