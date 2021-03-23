package uploads

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/bmizerany/pat"
)

type Handle struct {
	s3 *s3.S3
	http.Handler
}

// Serve a file
func Handler(s3 *s3.S3) http.Handler {

	mux := pat.New()

	handler := Handle{s3: s3}

	handler.Handler = mux

	mux.Get(":user/:file", http.HandlerFunc(handler.GetFile))

	return handler
}

func (h *Handle) GetFile(w http.ResponseWriter, r *http.Request) {
	user := r.URL.Query().Get(":user")
	file := r.URL.Query().Get(":file")

	key := user + "/" + file

	u := r.Context().Value("user")

	// if the current user does not match the requested ID
	if u != user {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	output, err := h.s3.GetObject(&s3.GetObjectInput{Bucket: aws.String("overdoll-processing"), Key: aws.String(key)})

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	buff, buffErr := ioutil.ReadAll(output.Body)

	if buffErr != nil {
		fmt.Println(buffErr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	reader := bytes.NewReader(buff)

	http.ServeContent(w, r, key, time.Now(), reader)
	return
}
