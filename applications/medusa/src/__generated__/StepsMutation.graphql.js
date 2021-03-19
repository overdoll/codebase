/**
 * @flow
 * @relayHash 4007a9c7974da01641f179dd102d6927
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
  artistUsername: string,
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
    +review: boolean
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
    "id": "4007a9c7974da01641f179dd102d6927",
    "metadata": {},
    "name": "StepsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '465df96394a2d287dcce9d1421d006a4';
module.exports = node;
