// Code generated by mockery v2.13.1. DO NOT EDIT.

package mocks

import (
	context "context"

	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"

	mock "github.com/stretchr/testify/mock"

	proto "overdoll/applications/eva/proto"
)

// MockEvaClient is an autogenerated mock type for the EvaClient type
type MockEvaClient struct {
	mock.Mock
}

// CreateSession provides a mock function with given fields: ctx, in, opts
func (_m *MockEvaClient) CreateSession(ctx context.Context, in *proto.CreateSessionRequest, opts ...grpc.CallOption) (*proto.CreateSessionResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.CreateSessionResponse
	if rf, ok := ret.Get(0).(func(context.Context, *proto.CreateSessionRequest, ...grpc.CallOption) *proto.CreateSessionResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.CreateSessionResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.CreateSessionRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetAccount provides a mock function with given fields: ctx, in, opts
func (_m *MockEvaClient) GetAccount(ctx context.Context, in *proto.GetAccountRequest, opts ...grpc.CallOption) (*proto.Account, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.Account
	if rf, ok := ret.Get(0).(func(context.Context, *proto.GetAccountRequest, ...grpc.CallOption) *proto.Account); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.Account)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.GetAccountRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetLocationFromIp provides a mock function with given fields: ctx, in, opts
func (_m *MockEvaClient) GetLocationFromIp(ctx context.Context, in *proto.GetLocationFromIpRequest, opts ...grpc.CallOption) (*proto.Location, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.Location
	if rf, ok := ret.Get(0).(func(context.Context, *proto.GetLocationFromIpRequest, ...grpc.CallOption) *proto.Location); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.Location)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.GetLocationFromIpRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetSession provides a mock function with given fields: ctx, in, opts
func (_m *MockEvaClient) GetSession(ctx context.Context, in *proto.SessionRequest, opts ...grpc.CallOption) (*proto.SessionResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.SessionResponse
	if rf, ok := ret.Get(0).(func(context.Context, *proto.SessionRequest, ...grpc.CallOption) *proto.SessionResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.SessionResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.SessionRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// RevokeSession provides a mock function with given fields: ctx, in, opts
func (_m *MockEvaClient) RevokeSession(ctx context.Context, in *proto.SessionRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *proto.SessionRequest, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.SessionRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

type mockConstructorTestingTNewMockEvaClient interface {
	mock.TestingT
	Cleanup(func())
}

// NewMockEvaClient creates a new instance of MockEvaClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewMockEvaClient(t mockConstructorTestingTNewMockEvaClient) *MockEvaClient {
	mock := &MockEvaClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
