package passport

import (
	"bytes"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
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

	rawPass := FromContext(w.ctx)

	// only add passport to response body if it was modified
	if rawPass != nil && rawPass.hasActions() {

		pass, err := serializeToString(rawPass)

		if err != nil {
			return 0, err
		}

		value, err := sjson.Set(string(b), bodyKey, pass)

		if err != nil {
			return 0, err
		}

		return w.ResponseWriter.Write([]byte(value))
	}

	return w.ResponseWriter.Write(b)
}

// addToRequest is responsible for appending passport to the body of the request
// mainly used for testing (because usually, our graphql gateway appends the passport to the body)
func addToRequest(r *http.Request, passport *Passport) error {

	// only parse JSON responses
	if r.Header.Get("Content-Type") != "application/json" {
		return nil
	}

	passportSerialized, err := serializeToString(passport)
	if err != nil {
		return err
	}

	var buf bytes.Buffer
	tee := io.TeeReader(r.Body, &buf)
	bd, _ := ioutil.ReadAll(tee)

	value, err := sjson.Set(string(bd), bodyKey, passportSerialized)

	if err != nil {
		return err
	}

	r.ContentLength = int64(len(value))

	r.Body = ioutil.NopCloser(strings.NewReader(value))

	return nil
}

// read passport from body
func fromRequest(r *http.Request) *Passport {

	// only parse JSON responses
	if r.Header.Get("Content-Type") != "application/json" {
		return nil
	}

	var buf bytes.Buffer
	tee := io.TeeReader(r.Body, &buf)
	bd, _ := ioutil.ReadAll(tee)

	r.Body = ioutil.NopCloser(&buf)

	value := gjson.Get(string(bd), bodyKey)

	if value.Exists() {

		pass, err := unserializeFromString(value.String())

		if err != nil {
			panic(err)
		}

		return pass
	}

	return nil
}

// read passport from an HTTP response
func fromResponse(res *http.Response) (*Passport, error) {

	// only parse JSON responses
	if res.Header.Get("Content-Type") != "application/json; charset=utf-8" && res.Header.Get("Content-Type") != "application/json" {
		return nil, nil
	}

	var reader io.ReadCloser
	switch res.Header.Get("Content-Encoding") {
	case "gzip":
		// dont read gzip responses
		return nil, nil
	default:
		reader = res.Body
	}

	var buf bytes.Buffer
	tee := io.TeeReader(reader, &buf)
	bd, _ := ioutil.ReadAll(tee)

	value := gjson.Get(string(bd), bodyKey)

	res.Body = ioutil.NopCloser(&buf)

	if value.Exists() {

		pass, err := unserializeFromString(value.String())
		if err != nil {
			return nil, err
		}

		//newBody, _ := sjson.Delete(string(bd), bodyKey)
		//res.Body = ioutil.NopCloser(bytes.NewBufferString(newBody))

		return pass, nil
	}

	return nil, nil
}
