package graphql

import (
	"errors"
	"io"
	"strconv"
	"time"
)

var (
	Null = &lit{[]byte(`null`)}
)

type Marshaler interface {
	MarshalGQL(w io.Writer)
}

type WriterFunc func(writer io.Writer)

func (f WriterFunc) MarshalGQL(w io.Writer) {
	f(w)
}

type lit struct{ b []byte }

func (l lit) MarshalGQL(w io.Writer) {
	w.Write(l.b)
}

func MarshalDate(t time.Time) Marshaler {
	if t.IsZero() {
		return Null
	}

	return WriterFunc(func(w io.Writer) {
		io.WriteString(w, strconv.Quote(t.Format("2006-01-02")))
	})
}

func UnmarshalDate(v interface{}) (time.Time, error) {
	if tmpStr, ok := v.(string); ok {
		return time.Parse("2006-01-02", tmpStr)
	}
	return time.Time{}, errors.New("time should be a formatted string (i.e. 2006-01-02)")
}
