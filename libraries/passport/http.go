package passport

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
)

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

	// check header first
	if val := c.Request.Header.Get(AppendHeader); val != "" {
		ctx := context.WithValue(c.Request.Context(), MutationType(MutationKey), FromString(val))
		return c.Request.WithContext(ctx)
	}

	// then check body
	if val := body.Extensions.Passport; val != "" {
		ctx := context.WithValue(c.Request.Context(), MutationType(MutationKey), FromString(val))
		return c.Request.WithContext(ctx)
	}

	// no passport, issue a fresh one
	ctx := context.WithValue(c.Request.Context(), MutationType(MutationKey), FreshPassport())
	return c.Request.WithContext(ctx)
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
