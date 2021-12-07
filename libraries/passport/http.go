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

const bodyKey = "passport"

type bodyLogWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
	ctx  context.Context
}

// everytime writer is called to write body, we intercept
// and add passport to the body as well
func (w bodyLogWriter) Write(b []byte) (int, error) {
	w.body.Write(b)

	var body map[string]interface{}
	if err := json.Unmarshal(b, &body); err != nil {
		panic(err)
	}

	rawPass := FromContext(w.ctx)

	// only add passport to response body if it was modified
	if rawPass != nil && rawPass.hasActions() {

		pass, err := serializeToString(rawPass)

		if err != nil {
			return 0, err
		}

		// add passport to object
		body[bodyKey] = pass
	}

	bts, err := json.Marshal(body)

	if err != nil {
		return 0, err
	}

	return w.ResponseWriter.Write(bts)
}

// AddToRequest is responsible for appending passport to the body of the request
// mainly used for testing (because usually, our graphql gateway appends the passport to the body)
func AddToRequest(r *http.Request, passport *Passport) error {
	var body map[string]interface{}
	var buf bytes.Buffer

	tee := io.TeeReader(r.Body, &buf)
	if err := json.NewDecoder(tee).Decode(&body); err != nil {
		return err
	}

	passportSerialized, err := serializeToString(passport)
	if err != nil {
		return err
	}

	body[bodyKey] = passportSerialized

	encode, err := json.Marshal(body)

	if err != nil {
		return err
	}

	r.ContentLength = int64(len(encode))

	r.Body = ioutil.NopCloser(strings.NewReader(string(encode)))

	return nil
}

// read passport from body
func fromRequest(req *http.Request) *Passport {
	var body map[string]interface{}

	var buf bytes.Buffer
	tee := io.TeeReader(req.Body, &buf)
	bd, _ := ioutil.ReadAll(tee)

	if err := json.Unmarshal(bd, &body); err != nil {
		panic(err)
	}

	req.Body = ioutil.NopCloser(&buf)

	if val, ok := body[bodyKey]; ok {

		pass, err := unserializeFromString(val.(string))

		if err != nil {
			panic(err)
		}

		return pass
	}

	return nil
}

// read passport from an HTTP response
func FromResponse(resp *http.Response) (*Passport, error) {

	var body map[string]interface{}

	var buf bytes.Buffer
	tee := io.TeeReader(resp.Body, &buf)
	bd, _ := ioutil.ReadAll(tee)

	if err := json.Unmarshal(bd, &body); err != nil {
		return nil, err
	}

	resp.Body = ioutil.NopCloser(&buf)

	if val, ok := body[bodyKey]; ok {

		pass, err := unserializeFromString(val.(string))
		if err != nil {
			return nil, err
		}

		return pass, nil
	}

	return nil, nil
}
