package mutations

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/user"
	"overdoll/libraries/ksuid"
)

type MutationResolver struct {
	App app.Application
}

func (r *MutationResolver) Post(ctx context.Context, data *types.PostInput) (*types.PostResponse, error) {

	usr := common.FromContext(ctx)

	requests := make(map[string]string)

	for _, item := range data.CharacterRequests {
		requests[item.Name] = item.Media
	}

	// TODO: we can perform some validation here - and we should instead of using an event (split into multiple commands)
	err := r.App.Commands.Bus.CommandBus().Send(ctx, &sting.SchedulePost{Post: &sting.NewPendingPost{
		Id:                ksuid.New().String(),
		ArtistId:          *data.ArtistID,
		ArtistUsername:    data.ArtistUsername,
		ContributorId:     usr.ID(),
		Content:           data.Content,
		CategoryIds:       data.Categories,
		CharacterIds:      data.Characters,
		MediaRequests:     data.MediaRequests,
		CategoryRequests:  nil,
		CharacterRequests: requests,
	}})

	return nil, err
}
