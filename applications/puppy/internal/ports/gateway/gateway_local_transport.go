package gateway

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

var structure struct {
	data struct {
		node struct {
			__typename string
			id         string
		}
	}
}

type gatewayLocalTransport struct{}

func (h *gatewayLocalTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	var d map[string]interface{}

	dec := json.NewDecoder(req.Body)

	if err := dec.Decode(&d); err != nil {
		return nil, err
	}

	// get variable ID, that's all we need
	// variableId := d["variables"].(map[string]interface{})["a"].(string)

	body := `{ "data": { "node": { "__typename": "Account", "id": "12" } } }`

	t := &http.Response{
		Body:          ioutil.NopCloser(bytes.NewBufferString(body)),
		Status:        "200 OK",
		StatusCode:    200,
		Proto:         "HTTP/1.1",
		ProtoMajor:    1,
		ProtoMinor:    1,
		ContentLength: int64(len(body)),
		Request:       req,
		Header:        make(http.Header, 0),
	}

	buff := bytes.NewBuffer(nil)
	if err := t.Write(buff); err != nil {
		return nil, err
	}

	return t, nil
}
