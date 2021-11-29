package passport

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"github.com/gorilla/sessions"
	"io"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/proto"
	"go.uber.org/zap"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

type MutationType string

const (
	AppendHeader      = "X-Passport"
	MutationHeader    = "X-Modified-Passport"
	MutationKey       = "PassportContextKey"
	sessionCookieName = "connect.sid"
)

var (
	ErrNotAuthenticated = errors.New("not authenticated")
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
	passport  *libraries_passport_v1.Passport
	sessionId string
}

func (p *Passport) Authenticated() error {
	if p.passport.Account != nil {
		return nil
	}

	return ErrNotAuthenticated
}

func (p *Passport) AccountID() string {
	return p.passport.Account.Id
}

func (p *Passport) SessionId() string {
	return p.sessionId
}

// Revoke the currently authenticated user from the passport
func (p *Passport) RevokeAccount() error {
	p.passport = &libraries_passport_v1.Passport{Account: nil}
	return nil
}

func (p *Passport) SetAccount(id string) {
	p.passport.Account = &libraries_passport_v1.Account{Id: id}
}

func (p *Passport) setSessionId(id string) {
	p.sessionId = id
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

	return nil
}

func FreshPassport() *Passport {
	return &Passport{passport: &libraries_passport_v1.Passport{Account: nil}, sessionId: ""}
}

func FreshPassportWithAccount(id string) *Passport {

	pass := &Passport{passport: &libraries_passport_v1.Passport{Account: nil}, sessionId: ""}

	pass.SetAccount(id)

	return pass
}

func AddToRequestFromSessionStore(r *http.Request, store sessions.Store) error {

	session, err := store.Get(r, "session")

	if err != nil {
		return err
	}

	if val, ok := session.Values["passport"]; ok {

		passResult := FromString(val.(string))
		passResult.setSessionId(session.ID)

		if err := AddToRequest(r, passResult); err != nil {
			return err
		}
	}

	return nil
}

// AddToRequest is responsible for appending passport to the body of the request
// mainly used for testing (because usually, our graphql gateway appends the passport to the body)
func AddToRequest(r *http.Request, passport *Passport) error {
	var body Body
	var buf bytes.Buffer

	tee := io.TeeReader(r.Body, &buf)
	err := json.NewDecoder(tee).Decode(&body)

	if err != nil {
		return err
	}

	passportSerialized := passport.SerializeToBaseString()

	// add to body && header
	body.Extensions.Passport = passportSerialized
	r.Header.Add(AppendHeader, passportSerialized)

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
	bd, _ := ioutil.ReadAll(tee)
	err := json.Unmarshal(bd, &body)
	c.Request.Body = ioutil.NopCloser(&buf)

	if err != nil {
		return nil
	}

	// check header first, then body
	if val := c.Request.Header.Get(AppendHeader); val != "" {
		ctx := context.WithValue(c.Request.Context(), MutationType(MutationKey), FromString(val))
		return c.Request.WithContext(ctx)
	}

	if val := body.Extensions.Passport; val != "" {
		ctx := context.WithValue(c.Request.Context(), MutationType(MutationKey), FromString(val))
		return c.Request.WithContext(ctx)
	}

	return nil
}

func FromString(raw string) *Passport {

	// empty passport in string - use fresh one
	if raw == "" {
		return FreshPassport()
	}

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

	return &Passport{passport: &msg, sessionId: ""}

}

func FromContext(ctx context.Context) *Passport {

	raw, ok := ctx.Value(MutationType(MutationKey)).(*Passport)

	if !ok {
		return FreshPassport()
	}

	return raw
}

func FromResponse(resp *http.Response) *Passport {

	// check for header existence first, because
	// we might return an empty string
	headers := resp.Header
	_, ok := headers[MutationHeader]

	if !ok {
		return nil
	}

	return FromString(resp.Header.Get(MutationHeader))
}
