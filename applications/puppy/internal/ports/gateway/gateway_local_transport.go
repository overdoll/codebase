package gateway

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)

type gatewayLocalTransport struct{}

func (h *gatewayLocalTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	//fmt.Println(req.Body.Read())

	fmt.Println("run")

	t := &http.Response{
		Body: ioutil.NopCloser(bytes.NewBufferString(`{ "data": { "account": { "id": 12 } } }`)),
	}

	buff := bytes.NewBuffer(nil)
	if err := t.Write(buff); err != nil {
		return nil, err
	}

	return t, nil
}
