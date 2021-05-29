package passport

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/proto"
	"go.uber.org/zap"
	"overdoll/libraries/helpers"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

type MutationType string

const (
	MutationHeader = "X-Modified-Passport"
	MutationKey    = "PassportContextKey"
)

// Body - parses graphql requests
type Body struct {
	Query      string                 `json:"query,omitempty"`
	Variables  map[string]interface{} `json:"variables,omitempty"`
	Extensions struct {
		Passport string `json:"passport"`
	}
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
	msg, err := proto.Marshal(p.passport)

	if err != nil {
		return ""
	}

	return base64.StdEncoding.EncodeToString(msg)
}

// MutatePassport will add the passport to the context
func (p *Passport) MutatePassport(ctx context.Context, updateFn func(*Passport) error) error {

	err := updateFn(p)

	if err != nil {
		return err
	}

	gc := helpers.GinContextFromContext(ctx)

	if gc != nil {
		gc.Writer.Header().Set(MutationHeader, p.SerializeToBaseString())
	}

	return nil
}

func FreshPassport() *Passport {
	return &Passport{passport: &libraries_passport_v1.Passport{User: nil}}
}

func FreshPassportWithUser(id string) *Passport {

	pass := &Passport{passport: &libraries_passport_v1.Passport{User: nil}}

	pass.SetUser(id)

	return pass
}

// AddToBody is responsible for appending passport to the body of the request
// mainly used for testing (because usually, our graphql gateway appends the passport to the body)
func AddToBody(r *http.Request, passport *Passport) error {
	var body Body
	var buf bytes.Buffer

	tee := io.TeeReader(r.Body, &buf)
	err := json.NewDecoder(tee).Decode(&body)

	if err != nil {
		return err
	}

	body.Extensions.Passport = passport.SerializeToBaseString()

	encode, err := json.Marshal(body)

	if err != nil {
		return err
	}

	r.ContentLength = int64(len(encode))

	r.Body = ioutil.NopCloser(strings.NewReader(string(encode)))

	return nil
}

// BodyToContext is responsible for parsing the incoming passport and
// adding it to context so the application can access it
func BodyToContext(c *gin.Context) *http.Request {
	var body Body
	var buf bytes.Buffer

	tee := io.TeeReader(c.Request.Body, &buf)
	err := json.NewDecoder(tee).Decode(&body)
	c.Request.Body = ioutil.NopCloser(&buf)

	if err != nil {
		return nil
	}

	if body.Extensions.Passport != "" {
		ctx := context.WithValue(c.Request.Context(), MutationType(MutationKey), body.Extensions.Passport)
		return c.Request.WithContext(ctx)
	}

	return nil
}

func FromContext(ctx context.Context) *Passport {
	raw, _ := ctx.Value(MutationType(MutationKey)).(string)

	if raw != "" {
		sDec, err := base64.StdEncoding.DecodeString(raw)

		if err != nil {
			zap.S().Errorf("could not decode passport: %s", err)
			return FreshPassport()
		}

		var msg libraries_passport_v1.Passport

		err = proto.Unmarshal(sDec, &msg)

		if err != nil {
			zap.S().Errorf("could not unmarshal passport proto: %s", err)
			return FreshPassport()
		}

		return &Passport{passport: &msg}
	}

	// If there's no passport in the body, we will use a fresh passport so that implementors have something to work with
	return FreshPassport()
}
