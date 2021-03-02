package server

import (
	pox "overdoll/applications/pox/proto"
)

type Server struct {}

func CreateServer() *Server {
	return &Server{}
}

func (s *Server) ProcessMessage(msg *pox.PostProcessImageEvent) {}