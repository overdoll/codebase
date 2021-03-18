/**
 * @flow
 * @relayHash fffe1105c49a303dc3747589e47e7acd
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type PostInput = {|
  images: $ReadOnlyArray<string>,
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
export type StepperMutationVariables = {|
  data?: ?PostInput
|};
export type StepperMutationResponse = {|
  +post: {|
    +review: boolean
  |}
|};
export type StepperMutation = {|
  variables: StepperMutationVariables,
  response: StepperMutationResponse,
|};


/*
mutation StepperMutation(
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
    "name": "StepperMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StepperMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "fffe1105c49a303dc3747589e47e7acd",
    "metadata": {},
    "name": "StepperMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '40149b98eb010b1fc6455912aeec997e';
module.exports = node;
