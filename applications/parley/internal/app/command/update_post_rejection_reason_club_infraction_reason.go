package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/principal"
)

type UpdatePostRejectionReasonClubInfractionReason struct {
	Principal              *principal.Principal
	RejectionReasonId      string
	ClubInfractionReasonId string
}

type UpdatePostRejectionReasonClubInfractionReasonHandler struct {
	pr post_audit_log.Repository
	cr club_infraction.Repository
}

func NewUpdatePostRejectionReasonClubInfractionReasonHandler(pr post_audit_log.Repository, cr club_infraction.Repository) UpdatePostRejectionReasonClubInfractionReasonHandler {
	return UpdatePostRejectionReasonClubInfractionReasonHandler{pr: pr, cr: cr}
}

func (h UpdatePostRejectionReasonClubInfractionReasonHandler) Handle(ctx context.Context, cmd UpdatePostRejectionReasonClubInfractionReason) (*post_audit_log.PostRejectionReason, error) {

	var clubInfractionReasonId string

	if cmd.ClubInfractionReasonId != "" {

		clubInfractionReason, err := h.cr.GetClubInfractionReasonById(ctx, cmd.Principal, cmd.ClubInfractionReasonId)

		if err != nil {
			return nil, err
		}

		clubInfractionReasonId = clubInfractionReason.ID()
	}

	postRejectionReason, err := h.pr.UpdatePostRejectionReasonClubInfractionReason(ctx, cmd.RejectionReasonId, func(postRejectionReason *post_audit_log.PostRejectionReason) error {
		return postRejectionReason.UpdateClubInfractionReason(cmd.Principal, clubInfractionReasonId)
	})

	if err != nil {
		return nil, err
	}

	return postRejectionReason, nil
}
