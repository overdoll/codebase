package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	"go.temporal.io/sdk/workflow"
)

type (
	// propagator implements the custom context propagator
	sentryPropagator struct{}
)

// NewContextSentryPropagator returns a context propagator that propagates a set of
// string key-value pairs across a workflow
func NewContextSentryPropagator() workflow.ContextPropagator {
	return &sentryPropagator{}
}

// Inject injects values from context into headers for propagation
func (s *sentryPropagator) Inject(ctx context.Context, writer workflow.HeaderWriter) error {
	return nil
}

// InjectFromWorkflow injects values from context into headers for propagation
func (s *sentryPropagator) InjectFromWorkflow(ctx workflow.Context, writer workflow.HeaderWriter) error {
	return nil
}

// Extract extracts values from headers and puts them into context
func (s *sentryPropagator) Extract(ctx context.Context, reader workflow.HeaderReader) (context.Context, error) {

	hub := sentry.CurrentHub()

	if hub != nil {
		return sentry.SetHubOnContext(ctx, hub.Clone()), nil
	}

	return ctx, nil
}

// ExtractToWorkflow extracts values from headers and puts them into context
func (s *sentryPropagator) ExtractToWorkflow(ctx workflow.Context, reader workflow.HeaderReader) (workflow.Context, error) {
	return ctx, nil
}
