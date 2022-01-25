package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/principal"
)

type CreatePostRejectionReason struct {
	Principal              *principal.Principal
	Reason                 string
	ClubInfractionReasonId *string
}

type CreatePostRejectionReasonHandler struct {
	pr post_audit_log.Repository
	cr club_infraction.Repository
}

func NewCreatePostRejectionReasonHandler(pr post_audit_log.Repository, cr club_infraction.Repository) CreatePostRejectionReasonHandler {
	return CreatePostRejectionReasonHandler{pr: pr, cr: cr}
}

func (h CreatePostRejectionReasonHandler) Handle(ctx context.Context, cmd CreatePostRejectionReason) (*post_audit_log.PostRejectionReason, error) {

	var clubInfractionReasonId string
	var err error

	if cmd.ClubInfractionReasonId != nil {

		clubInfractionReason, err := h.cr.GetClubInfractionReasonById(ctx, cmd.Principal, *cmd.ClubInfractionReasonId)

		if err != nil {
			return nil, err
		}

		clubInfractionReasonId = clubInfractionReason.ID()
	}

	clubInfractionReason, err := post_audit_log.NewPostRejectionReason(
		cmd.Principal,
		cmd.Reason,
		clubInfractionReasonId,
	)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreatePostRejectionReason(ctx, clubInfractionReason); err != nil {
		return nil, err
	}

	return clubInfractionReason, nil
}
