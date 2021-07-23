/**
 * @flow
 * @relayHash d573595806053acadc6c0df665a14818
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreatePostInput = {|
  content: $ReadOnlyArray<string>,
  categoryIds: $ReadOnlyArray<string>,
  characterIds: $ReadOnlyArray<string>,
  mediaRequests?: ?$ReadOnlyArray<string>,
  characterRequests?: ?$ReadOnlyArray<CharacterRequest>,
  existingArtist?: ?string,
  customArtistUsername?: ?string,
  posterIsArtist?: ?boolean,
|};
export type CharacterRequest = {|
  name: string,
  customMediaName?: ?string,
  existingMediaId?: ?string,
|};
export type StepsMutationVariables = {|
  input: CreatePostInput
|};
export type StepsMutationResponse = {|
  +createPost: ?{|
    +review: ?boolean,
    +post: ?{|
      +id: string
    |},
  |}
|};
export type StepsMutation = {|
  variables: StepsMutationVariables,
  response: StepsMutationResponse,
|};


/*
mutation StepsMutation(
  $input: CreatePostInput!
) {
  createPost(input: $input) {
    review
    post {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreatePostPayload",
    "kind": "LinkedField",
    "name": "createPost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "review",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StepsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StepsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d573595806053acadc6c0df665a14818",
    "metadata": {},
    "name": "StepsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'b504251e033bb28997ee185c10272004';
module.exports = node;
