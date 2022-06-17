// Code generated by mockery v2.13.1. DO NOT EDIT.

package mocks

import (
	context "context"

	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"

	mock "github.com/stretchr/testify/mock"

	proto "overdoll/applications/parley/proto"
)

// MockParleyClient is an autogenerated mock type for the ParleyClient type
type MockParleyClient struct {
	mock.Mock
}

// DeleteAccountData provides a mock function with given fields: ctx, in, opts
func (_m *MockParleyClient) DeleteAccountData(ctx context.Context, in *proto.DeleteAccountDataRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *proto.DeleteAccountDataRequest, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.DeleteAccountDataRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PutPostIntoModeratorQueueOrPublish provides a mock function with given fields: ctx, in, opts
func (_m *MockParleyClient) PutPostIntoModeratorQueueOrPublish(ctx context.Context, in *proto.PutPostIntoModeratorQueueOrPublishRequest, opts ...grpc.CallOption) (*proto.PutPostIntoModeratorQueueOrPublishResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.PutPostIntoModeratorQueueOrPublishResponse
	if rf, ok := ret.Get(0).(func(context.Context, *proto.PutPostIntoModeratorQueueOrPublishRequest, ...grpc.CallOption) *proto.PutPostIntoModeratorQueueOrPublishResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.PutPostIntoModeratorQueueOrPublishResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.PutPostIntoModeratorQueueOrPublishRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

type mockConstructorTestingTNewMockParleyClient interface {
	mock.TestingT
	Cleanup(func())
}

// NewMockParleyClient creates a new instance of MockParleyClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewMockParleyClient(t mockConstructorTestingTNewMockParleyClient) *MockParleyClient {
	mock := &MockParleyClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
