package sentry_support

import (
	"github.com/getsentry/sentry-go"
	"net/url"
	"os"
	"reflect"
	"strings"
)

const maxErrorDepth = 10

func unwrapError(exception error) error {
	err := exception
	switch previous := err.(type) {
	case interface{ Cause() error }:
		err = previous.Cause()
	case interface{ Unwrap() error }:
		err = previous.Unwrap()
	default:
		err = nil
	}

	return err
}

// recursively unwrap error until we are no longer an "errors.withStack" and "errors.withMessage"
// we also take the stack trace with us along the way, when encountering *errors.withStack
func unwrap(err error, trace error) (error, error) {
	typeOf := reflect.TypeOf(err).String()
	if typeOf != "*errors.withMessage" && typeOf != "*errors.withStack" && typeOf != "*fmt.wrapError" {
		return err, trace
	}

	if typeOf == "*errors.withStack" {
		return unwrap(unwrapError(err), err)
	}

	return unwrap(unwrapError(err), trace)
}

func reverse(a []sentry.Exception) {
	for i := len(a)/2 - 1; i >= 0; i-- {
		opp := len(a) - 1 - i
		a[i], a[opp] = a[opp], a[i]
	}
}

func filterStacktraceFrames(frames []sentry.Frame) []sentry.Frame {

	var newFrames []sentry.Frame

	for _, frame := range frames {
		// ignore graphql operation recovery since this messes with the trace log
		if frame.Function == "(*OperationContext).Recover" {
			continue
		}

		// skip frames with sentry support + zap_support (so logger is excluded from frames
		if !strings.HasPrefix(frame.Module, "overdoll/libraries/sentry_support") &&
			!strings.HasPrefix(frame.Module, "overdoll/libraries/zap_support") {
			newFrames = append(newFrames, frame)
		}
	}

	var lastFrames []sentry.Frame

	// check for last frame of our parsed trace log and ensure it's not 'generated.go'
	for c, frame := range newFrames {
		if c == len(newFrames)-1 && strings.HasSuffix(frame.Filename, "generated.go") {
			continue
		}
		lastFrames = append(lastFrames, frame)
	}

	return lastFrames
}

func beforeSendHook(event *sentry.Event, hint *sentry.EventHint) *sentry.Event {

	// don't send event or attempt to even send it if sentry DSN is empty
	if os.Getenv("SENTRY_DSN") == "" {
		return nil
	}

	// strip out all sensitive data that could potentially be used
	if event.Request != nil {

		u, _ := url.Parse(event.Request.URL)
		// remove host from url
		u.Host = ""
		u.Scheme = "http"

		event.Request.URL = u.String()

		// delete all cookies
		event.Request.Cookies = ""

		// delete all data
		event.Request.Data = ""

		// delete all headers
		event.Request.Headers = make(map[string]string)
	}

	// strip out user's IP address
	event.User.IPAddress = ""

	if hint.RecoveredException != nil {

		// exception length is 0 - we need to reconstruct the error to look better
		if len(event.Exception) == 0 {
			event.Exception = []sentry.Exception{{
				// runtime.plainError is usually the error thrown during panics so, we just use this as the baseline
				Type:       "runtime.plainError",
				Value:      event.Message,
				Stacktrace: event.Threads[0].Stacktrace,
			}}

			// clear message & threads
			event.Message = ""
			event.Threads = []sentry.Thread{}
		}

		for _, exception := range event.Exception {

			if exception.Stacktrace != nil && exception.Stacktrace.Frames != nil {
				exception.Stacktrace.Frames = filterStacktraceFrames(exception.Stacktrace.Frames)
			}

		}
	}

	if hint.OriginalException != nil {
		err := hint.OriginalException
		event.Exception = []sentry.Exception{}

		for i := 0; i < maxErrorDepth && err != nil; i++ {

			originalMessage := err.Error()

			var trace error
			err, trace = unwrap(err, nil)

			// extract stack trace - if it's there, filter frames. otherwise, don't
			stackTrace := sentry.ExtractStacktrace(trace)

			if stackTrace != nil {
				stackTrace.Frames = filterStacktraceFrames(stackTrace.Frames)
			}

			event.Exception = append(event.Exception, sentry.Exception{
				Type:       reflect.TypeOf(err).String(),
				Value:      originalMessage,
				Stacktrace: stackTrace,
			})

			err = unwrapError(err)
		}

		reverse(event.Exception)
	}

	return event
}
