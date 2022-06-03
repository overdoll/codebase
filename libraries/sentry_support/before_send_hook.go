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

func BeforeSendHook(event *sentry.Event, hint *sentry.EventHint) *sentry.Event {

	if hint.RecoveredException != nil {
		copyException := event.Exception
		event.Exception = []sentry.Exception{}

		for _, exception := range copyException {
			oldFrames := exception.Stacktrace.Frames
			exception.Stacktrace.Frames = []sentry.Frame{}
			for _, frame := range oldFrames {
				// skip frames with sentry support
				if !strings.HasPrefix(frame.Module, "overdoll/libraries/sentry_support") {
					exception.Stacktrace.Frames = append(exception.Stacktrace.Frames, frame)
				}
			}
		}

		event.Exception = copyException
	}

	if hint.OriginalException != nil {
		// if original exception is an errors.withStack, we do a custom parsing of the event and replace the exception
		if reflect.TypeOf(hint.OriginalException).String() == "*errors.withStack" {
			err := hint.OriginalException
			event.Exception = []sentry.Exception{}

			alreadySent := make(map[string]bool)

			for i := 0; i < maxErrorDepth && err != nil; i++ {

				errType := reflect.TypeOf(err).String()

				// need to go 1 level deeper for the real error with errors.withMessage
				if errType == "*errors.withStack" {
					unwrapped := unwrapError(unwrapError(err))
					errType = reflect.TypeOf(unwrapped).String()
				}

				// make sure we dont report the same error type twice
				if _, ok := alreadySent[errType]; !ok && errType != "*errors.withMessage" {
					event.Exception = append(event.Exception, sentry.Exception{
						Type:       errType,
						Value:      err.Error(),
						Stacktrace: sentry.ExtractStacktrace(err),
					})
				}

				alreadySent[errType] = true
				err = unwrapError(err)
			}
		}
	}

	return event
}
