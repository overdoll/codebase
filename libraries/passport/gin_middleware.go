package passport

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
)

type bodyLogWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (w bodyLogWriter) Write(b []byte) (int, error) {
	w.body.Write(b)
	return w.ResponseWriter.Write(b)
}

func GinPassportRequestMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// first, add passport to context

		pass := fromRequest(c.Request)
		fmt.Println(pass)
		c.Request = c.Request.WithContext(context.WithValue(c.Request.Context(), MutationType(MutationKey), pass))

		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer}

		c.Writer = blw

		c.Next()

		var obj map[string]interface{}

		if err := json.Unmarshal(blw.body.Bytes(), &obj); err != nil {
			panic(err)
		}

		obj["extensions"] = ""

		// add passport to object
		obj["passport"] = FromContext(c.Request.Context()).SerializeToBaseString()

		bts, err := json.Marshal(obj)

		if err != nil {
			panic(err)
		}

		blw.body = bytes.NewBuffer(bts)

		c.Next()
	}
}
