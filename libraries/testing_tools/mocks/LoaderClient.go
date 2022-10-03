// Code generated by mockery v2.13.1. DO NOT EDIT.

package mocks

import (
	context "context"

	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"

	mock "github.com/stretchr/testify/mock"

	proto "overdoll/applications/loader/proto"
)

// MockLoaderClient is an autogenerated mock type for the LoaderClient type
type MockLoaderClient struct {
	mock.Mock
}

// CancelMediaProcessing provides a mock function with given fields: ctx, in, opts
func (_m *MockLoaderClient) CancelMediaProcessing(ctx context.Context, in *proto.CancelMediaProcessingRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *proto.CancelMediaProcessingRequest, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.CancelMediaProcessingRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ConvertResourcesToMedia provides a mock function with given fields: ctx, in, opts
func (_m *MockLoaderClient) ConvertResourcesToMedia(ctx context.Context, in *proto.ConvertResourceToMediaRequest, opts ...grpc.CallOption) (*proto.ConvertResourceToMediaResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.ConvertResourceToMediaResponse
	if rf, ok := ret.Get(0).(func(context.Context, *proto.ConvertResourceToMediaRequest, ...grpc.CallOption) *proto.ConvertResourceToMediaResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.ConvertResourceToMediaResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.ConvertResourceToMediaRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GenerateImageFromMedia provides a mock function with given fields: ctx, in, opts
func (_m *MockLoaderClient) GenerateImageFromMedia(ctx context.Context, in *proto.GenerateImageFromMediaRequest, opts ...grpc.CallOption) (*proto.GenerateImageFromMediaResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.GenerateImageFromMediaResponse
	if rf, ok := ret.Get(0).(func(context.Context, *proto.GenerateImageFromMediaRequest, ...grpc.CallOption) *proto.GenerateImageFromMediaResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.GenerateImageFromMediaResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.GenerateImageFromMediaRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ProcessMediaFromUploads provides a mock function with given fields: ctx, in, opts
func (_m *MockLoaderClient) ProcessMediaFromUploads(ctx context.Context, in *proto.ProcessMediaFromUploadsRequest, opts ...grpc.CallOption) (*proto.ProcessMediaFromUploadsResponse, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *proto.ProcessMediaFromUploadsResponse
	if rf, ok := ret.Get(0).(func(context.Context, *proto.ProcessMediaFromUploadsRequest, ...grpc.CallOption) *proto.ProcessMediaFromUploadsResponse); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*proto.ProcessMediaFromUploadsResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.ProcessMediaFromUploadsRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ReprocessMedia provides a mock function with given fields: ctx, in, opts
func (_m *MockLoaderClient) ReprocessMedia(ctx context.Context, in *proto.ReprocessMediaRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	_va := make([]interface{}, len(opts))
	for _i := range opts {
		_va[_i] = opts[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, in)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	var r0 *emptypb.Empty
	if rf, ok := ret.Get(0).(func(context.Context, *proto.ReprocessMediaRequest, ...grpc.CallOption) *emptypb.Empty); ok {
		r0 = rf(ctx, in, opts...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*emptypb.Empty)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *proto.ReprocessMediaRequest, ...grpc.CallOption) error); ok {
		r1 = rf(ctx, in, opts...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

type mockConstructorTestingTNewMockLoaderClient interface {
	mock.TestingT
	Cleanup(func())
}

// NewMockLoaderClient creates a new instance of MockLoaderClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewMockLoaderClient(t mockConstructorTestingTNewMockLoaderClient) *MockLoaderClient {
	mock := &MockLoaderClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
