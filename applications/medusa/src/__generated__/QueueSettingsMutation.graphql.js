/**
 * @flow
 * @relayHash ad7be3e8f157cc6b26255da0faea5015
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RemoveModeratorFromPostQueueInput = {|
  accountId: string
|};
export type QueueSettingsMutationVariables = {|
  input: RemoveModeratorFromPostQueueInput
|};
export type QueueSettingsMutationResponse = {|
  +removeModeratorFromPostQueue: ?{|
    +account: ?{|
      +moderatorSettings: {|
        +isInModeratorQueue: boolean
      |}
    |}
  |}
|};
export type QueueSettingsMutation = {|
  variables: QueueSettingsMutationVariables,
  response: QueueSettingsMutationResponse,
|};


/*
mutation QueueSettingsMutation(
  $input: RemoveModeratorFromPostQueueInput!
) {
  removeModeratorFromPostQueue(input: $input) {
    account {
      moderatorSettings {
        isInModeratorQueue
      }
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "ModeratorSettings",
  "kind": "LinkedField",
  "name": "moderatorSettings",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInModeratorQueue",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveModeratorFromPostQueuePayload",
        "kind": "LinkedField",
        "name": "removeModeratorFromPostQueue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueueSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveModeratorFromPostQueuePayload",
        "kind": "LinkedField",
        "name": "removeModeratorFromPostQueue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "id": "ad7be3e8f157cc6b26255da0faea5015",
    "metadata": {},
    "name": "QueueSettingsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'df481713a523983f898f98ef7cc3d60f';
module.exports = node;
