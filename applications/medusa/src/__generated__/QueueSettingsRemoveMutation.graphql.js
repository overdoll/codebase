/**
 * @flow
 * @relayHash 71108957416e586f80f5ed3a2bb99e82
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RemoveModeratorFromPostQueueInput = {|
  accountId: string
|};
export type QueueSettingsRemoveMutationVariables = {|
  input: RemoveModeratorFromPostQueueInput
|};
export type QueueSettingsRemoveMutationResponse = {|
  +removeModeratorFromPostQueue: ?{|
    +account: ?{|
      +id: string,
      +moderatorSettings: {|
        +isInModeratorQueue: boolean
      |},
    |}
  |}
|};
export type QueueSettingsRemoveMutation = {|
  variables: QueueSettingsRemoveMutationVariables,
  response: QueueSettingsRemoveMutationResponse,
|};


/*
mutation QueueSettingsRemoveMutation(
  $input: RemoveModeratorFromPostQueueInput!
) {
  removeModeratorFromPostQueue(input: $input) {
    account {
      id
      moderatorSettings {
        isInModeratorQueue
      }
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
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
    "name": "QueueSettingsRemoveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueueSettingsRemoveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "71108957416e586f80f5ed3a2bb99e82",
    "metadata": {},
    "name": "QueueSettingsRemoveMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '5bdf28e5f0ed7a17baa59ac345d1f352';
module.exports = node;
