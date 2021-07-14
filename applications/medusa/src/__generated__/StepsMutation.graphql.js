/**
 * @flow
 * @relayHash 3d0383f9dd76ad9089c7b4ff747ceb96
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type PostInput = {|
  content: $ReadOnlyArray<string>,
  categories: $ReadOnlyArray<string>,
  characters: $ReadOnlyArray<string>,
  mediaRequests?: ?$ReadOnlyArray<string>,
  characterRequests?: ?$ReadOnlyArray<CharacterRequest>,
  artistId?: ?string,
  artistUsername?: ?string,
|};
export type CharacterRequest = {|
  name: string,
  media: string,
|};
export type StepsMutationVariables = {|
  data?: ?PostInput
|};
export type StepsMutationResponse = {|
  +post: {|
    +review: boolean,
    +validation: ?{|
      +code: string
    |},
  |}
|};
export type StepsMutation = {|
  variables: StepsMutationVariables,
  response: StepsMutationResponse,
|};


/*
mutation StepsMutation(
  $data: PostInput
) {
  post(data: $data) {
    review
    validation {
      code
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "concreteType": "PostResponse",
    "kind": "LinkedField",
    "name": "post",
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
        "concreteType": "Validation",
        "kind": "LinkedField",
        "name": "validation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
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
    "id": "3d0383f9dd76ad9089c7b4ff747ceb96",
    "metadata": {},
    "name": "StepsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '90f0123660986a0b7f572986f769e9c5';
module.exports = node;
