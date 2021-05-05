package passport

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"

	"github.com/golang/protobuf/proto"
	"overdoll/libraries/helpers"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

type Body struct {
	Passport string `json:"passport"`
}

type Passport struct {
	passport *libraries_passport_v1.Passport
}

func (p *Passport) IsAuthenticated() bool {
	return p.passport.User != nil
}

func (p *Passport) UserID() string {
	return p.passport.User.Id
}

// Revoke the currently authenticated user from the passport
func (p *Passport) RevokeUser() error {

}

func (p *Passport) SetUser() {

}

func NewPassport(ctx context.Context) (*Passport, error) {
	gc := helpers.GinContextFromContext(ctx)

}

func FreshPassport() *Passport {
	return &Passport{passport: &libraries_passport_v1.Passport{User: nil}}
}

func FromContext(ctx context.Context) *Passport {
	gc := helpers.GinContextFromContext(ctx)

	var body Body

	decoder := json.NewDecoder(gc.Request.Body)
	err := decoder.Decode(&body)

	if err != nil {
		errors.New("could not decode response body")
		return nil
	}

	if body.Passport != "" {
		sDec, err := base64.StdEncoding.DecodeString(body.Passport)
		if err != nil {
			errors.New("could not decode passport")
			return nil
		}

		var msg *libraries_passport_v1.Passport

		err = proto.Unmarshal(sDec, msg)

		if err != nil {
			errors.New("could not unmarshal proto from passport")
			return FreshPassport()
		}

		return &Passport{passport: msg}
	}

	// If there's no passport in the body, we will use a fresh passport so that implementors have something to work with
	return FreshPassport()
}
