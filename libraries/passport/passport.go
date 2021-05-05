package passport

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"

	"github.com/golang/protobuf/proto"
	"overdoll/libraries/helpers"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

const (
	MutationKey = "PassportContextMutation"
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
	return nil
}

func (p *Passport) SetUser(id string) {
	p.passport.User = &libraries_passport_v1.User{Id: id}
}

func (p *Passport) SerializeToBaseString() string {
	return base64.StdEncoding.EncodeToString([]byte(p.passport.String()))
}

// MutatePassport will add the passport to the context, which will eventually be intercepted by an extension
// and will be added to the response. After that, the serving gateway will propagate the updated passport into the session store
func (p *Passport) MutatePassport(ctx context.Context, updateFn func(*Passport) error) error {

	err := updateFn(p)

	if err != nil {
		return err
	}

	gc := helpers.GinContextFromContext(ctx)

	gc.Request = gc.Request.WithContext(
		context.WithValue(gc.Request.Context(), MutationKey, p.SerializeToBaseString()),
	)

	return nil
}

func NewPassport(ctx context.Context) *Passport {
	gc := helpers.GinContextFromContext(ctx)

	pass := FreshPassport()

	gc.Request = gc.Request.WithContext(
		context.WithValue(gc.Request.Context(), MutationKey, pass.SerializeToBaseString()),
	)

	return pass
}

func GetModifiedPassport(ctx context.Context) string {
	gc := helpers.GinContextFromContext(ctx)

	raw, _ := gc.Request.Context().Value(MutationKey).(string)

	return raw
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
		fmt.Printf("could not decode response body")
		return nil
	}

	if body.Passport != "" {
		sDec, err := base64.StdEncoding.DecodeString(body.Passport)
		if err != nil {
			fmt.Printf("could not decode passport")
			return nil
		}

		var msg *libraries_passport_v1.Passport

		err = proto.Unmarshal(sDec, msg)

		if err != nil {
			fmt.Printf("could not unmarshal proto from passport")
			return FreshPassport()
		}

		return &Passport{passport: msg}
	}

	// If there's no passport in the body, we will use a fresh passport so that implementors have something to work with
	return FreshPassport()
}
