/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type QueueSettingsMutationVariables = {||};
export type QueueSettingsMutationResponse = {|
  +toggleModeratorSettingsInQueue: ?{|
    +moderatorSettingsInQueue: ?boolean
  |}
|};
export type QueueSettingsMutation = {|
  variables: QueueSettingsMutationVariables,
  response: QueueSettingsMutationResponse,
|};


/*
mutation QueueSettingsMutation {
  toggleModeratorSettingsInQueue {
    moderatorSettingsInQueue
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ToggleModeratorSettingsInQueuePayload",
    "kind": "LinkedField",
    "name": "toggleModeratorSettingsInQueue",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "moderatorSettingsInQueue",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueueSettingsMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "92dee5e2dd13c5704b0ca6b4f279f37c",
    "id": null,
    "metadata": {},
    "name": "QueueSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation QueueSettingsMutation {\n  toggleModeratorSettingsInQueue {\n    moderatorSettingsInQueue\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '327d438990480ea97b7861d5e53b6c79';
module.exports = node;
