/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RecoveryCodesListMutationVariables = {||};
export type RecoveryCodesListMutationResponse = {|
  +generateAccountMultiFactorRecoveryCodes: ?{|
    +accountMultiFactorRecoveryCodes: $ReadOnlyArray<{|
      +__id: string,
      +code: string,
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
    "alias": null,
    "args": null,
    "concreteType": "GenerateAccountMultiFactorRecoveryCodesPayload",
    "kind": "LinkedField",
    "name": "generateAccountMultiFactorRecoveryCodes",
    "plural": false,
    "selections": [
      {
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
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodesListMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RecoveryCodesListMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b7326e750441d0b9f4799be4f284216a",
    "id": null,
    "metadata": {},
    "name": "RecoveryCodesListMutation",
    "operationKind": "mutation",
    "text": "mutation RecoveryCodesListMutation {\n  generateAccountMultiFactorRecoveryCodes {\n    accountMultiFactorRecoveryCodes {\n      code\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '0e330a44bcb5fdfe15dba82fd15957f2';
module.exports = node;
