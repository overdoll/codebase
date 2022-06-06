package sentry_support

import (
	"github.com/getsentry/sentry-go"
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
	// strip out all sensitive data that could potentially be used
	if event.Request != nil {

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
			exception.Stacktrace.Frames = filterStacktraceFrames(exception.Stacktrace.Frames)
		}
	}

	if hint.OriginalException != nil {
		err := hint.OriginalException
		event.Exception = []sentry.Exception{}

		alreadySent := make(map[string]bool)

		for i := 0; i < maxErrorDepth && err != nil; i++ {

			errType := reflect.TypeOf(err).String()

			//// need to go 1 level deep for the real error with errors.withStack (gives us errors.withMessage)
			//if errType == "*errors.withStack" {
			//	err = unwrapError(err)
			//	errType = reflect.TypeOf(err).String()
			//}
			//
			//// need to go 1 level deeper for the real error with errors.withMessage
			//if errType == "*errors.withMessage" {
			//	err = unwrapError(err)
			//	errType = reflect.TypeOf(err).String()
			//}
			//
			//// skip nil errors
			//if err == nil {
			//	continue
			//}

			// make sure we dont report the same error type twice
			if _, _ = alreadySent[errType]; true {

				// extract stack trace - if it's there, filter frames. otherwise, don't
				stackTrace := sentry.ExtractStacktrace(err)

				if stackTrace != nil {
					stackTrace.Frames = filterStacktraceFrames(stackTrace.Frames)
				}

				event.Exception = append(event.Exception, sentry.Exception{
					Type:       errType,
					Value:      err.Error(),
					Stacktrace: stackTrace,
				})
			}

			alreadySent[errType] = true
			err = unwrapError(err)
		}

		reverse(event.Exception)
	}

	return event
}
