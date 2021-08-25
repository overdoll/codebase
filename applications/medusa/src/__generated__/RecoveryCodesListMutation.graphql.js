/**
 * @flow
 * @relayHash b7326e750441d0b9f4799be4f284216a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RecoveryCodesListMutationVariables = {|
  connections: $ReadOnlyArray<string>
|};
export type RecoveryCodesListMutationResponse = {|
  +generateAccountMultiFactorRecoveryCodes: ?{|
    +accountMultiFactorRecoveryCodes: $ReadOnlyArray<{|
      +code: string
    |}>
  |}
|};
export type RecoveryCodesListMutation = {|
  variables: RecoveryCodesListMutationVariables,
  response: RecoveryCodesListMutationResponse,
|};


/*
mutation RecoveryCodesListMutation {
  generateAccountMultiFactorRecoveryCodes {
    accountMultiFactorRecoveryCodes {
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
    "name": "connections"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountMultiFactorRecoveryCode",
  "kind": "LinkedField",
  "name": "accountMultiFactorRecoveryCodes",
  "plural": true,
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodesListMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GenerateAccountMultiFactorRecoveryCodesPayload",
        "kind": "LinkedField",
        "name": "generateAccountMultiFactorRecoveryCodes",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "RecoveryCodesListMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GenerateAccountMultiFactorRecoveryCodesPayload",
        "kind": "LinkedField",
        "name": "generateAccountMultiFactorRecoveryCodes",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "accountMultiFactorRecoveryCodes",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "RecoveryCodesEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b7326e750441d0b9f4799be4f284216a",
    "metadata": {},
    "name": "RecoveryCodesListMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '2ef0865ffdadfaf57cd92ec0114e2fca';
module.exports = node;
