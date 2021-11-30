package passport

import (
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
)

const bodyKey = "passport"

// addToRequest is responsible for appending passport to the body of the request
// mainly used for testing (because usually, our graphql gateway appends the passport to the body)
func addToRequest(r *http.Request, passport *Passport) error {
	var body map[string]interface{}
	var buf bytes.Buffer

	tee := io.TeeReader(r.Body, &buf)
	if err := json.NewDecoder(tee).Decode(&body); err != nil {
		return err
	}

	passportSerialized := passport.SerializeToBaseString()

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
	err := json.Unmarshal(bd, &body)
	req.Body = ioutil.NopCloser(&buf)

	if err != nil {
		return nil
	}

	if val, ok := body[bodyKey]; ok {
		fromString(val.(string))
	}

	return nil
}

func fromResponse(resp *http.Response) *Passport {

	var body map[string]interface{}

	var buf bytes.Buffer
	tee := io.TeeReader(resp.Body, &buf)
	bd, _ := ioutil.ReadAll(tee)
	err := json.Unmarshal(bd, &body)
	resp.Body = ioutil.NopCloser(&buf)

	if err != nil {
		return nil
	}

	if val, ok := body[bodyKey]; ok {
		fromString(val.(string))
	}

	return nil
}
