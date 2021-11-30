package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/principal"
)

type SaveAccountSession struct {
	Principal *principal.Principal

	Passport *passport.Passport

	SessionId   string
	SessionData string
}

type SaveAccountSessionHandler struct {
	sr session.Repository
	lr location.Repository
}

func NewSaveAccountSessionHandler(sr session.Repository, lr location.Repository) SaveAccountSessionHandler {
	return SaveAccountSessionHandler{sr: sr, lr: lr}
}

func (h SaveAccountSessionHandler) Handle(ctx context.Context, cmd SaveAccountSession) (*session.Session, error) {
	return h.sr.SaveAccountSession(ctx, cmd.Principal, cmd.Passport, cmd.SessionId, func(sess *session.Session) error {
		// merge any new serialized data changes
		if err := sess.MergeWithSerializedData(cmd.SessionData); err != nil {
			return err
		}

		if !sess.HasLocation() {
			loc, err := h.lr.GetLocationFromIp(ctx, sess.IP())

			if err != nil {
				return err
			}

			if err := sess.UpdateLocation(loc); err != nil {
				return err
			}
		}

		return nil
	})
}
