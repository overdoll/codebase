/**
 * @flow
 * @relayHash 6e2d77d54dc16c355e924d0626715556
 */

/* eslint-disable */

'use strict'

import type { ConcreteRequest } from 'relay-runtime'

export type SearchInput = {|
  search: string
|};
export type ArtistsQueryVariables = {|
  data: SearchInput
|};
export type ArtistsQueryResponse = {|
  +artists: $ReadOnlyArray<{|
    +id: string,
    +avatar: string,
    +username: string,
  |}>
|};
export type ArtistsQuery = {|
  variables: ArtistsQueryVariables,
  response: ArtistsQueryResponse,
|};

/*
query ArtistsQuery(
  $data: SearchInput!
) {
  artists(data: $data) {
    id
    avatar
    username
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        'defaultValue': null,
        'kind': 'LocalArgument',
        'name': 'data'
      }
    ],
    v1 = [
      {
        'alias': null,
        'args': [
          {
            'kind': 'Variable',
            'name': 'data',
            'variableName': 'data'
          }
        ],
        'concreteType': 'Artist',
        'kind': 'LinkedField',
        'name': 'artists',
        'plural': true,
        'selections': [
          {
            'alias': null,
            'args': null,
            'kind': 'ScalarField',
            'name': 'id',
            'storageKey': null
          },
          {
            'alias': null,
            'args': null,
            'kind': 'ScalarField',
            'name': 'avatar',
            'storageKey': null
          },
          {
            'alias': null,
            'args': null,
            'kind': 'ScalarField',
            'name': 'username',
            'storageKey': null
          }
        ],
        'storageKey': null
      }
    ]
  return {
    'fragment': {
      'argumentDefinitions': (v0/*: any*/),
      'kind': 'Fragment',
      'metadata': null,
      'name': 'ArtistsQuery',
      'selections': (v1/*: any*/),
      'type': 'Query',
      'abstractKey': null
    },
    'kind': 'Request',
    'operation': {
      'argumentDefinitions': (v0/*: any*/),
      'kind': 'Operation',
      'name': 'ArtistsQuery',
      'selections': (v1/*: any*/)
    },
    'params': {
      'id': '6e2d77d54dc16c355e924d0626715556',
      'metadata': {},
      'name': 'ArtistsQuery',
      'operationKind': 'query',
      'text': null
    }
  }
})();
// prettier-ignore
(node: any).hash = '0022c323a2afef1879835d89b8436f9a'
module.exports = node
