/**
 * @generated SignedSource<<52d07f9f119bd84e8e1ac703b987a123>>
 * @relayHash 3d8e1358405b0cd8693cdbbedc63e021
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3d8e1358405b0cd8693cdbbedc63e021

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAudienceIsStandardInput = {
  id: string;
  standard: boolean;
};
export type ChangeAudienceStandardFormMutation$variables = {
  input: UpdateAudienceIsStandardInput;
};
export type ChangeAudienceStandardFormMutation$data = {
  readonly updateAudienceIsStandard: {
    readonly audience: {
      readonly id: string;
      readonly standard: boolean;
    } | null;
  } | null;
};
export type ChangeAudienceStandardFormMutation = {
  response: ChangeAudienceStandardFormMutation$data;
  variables: ChangeAudienceStandardFormMutation$variables;
};

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
    "concreteType": "UpdateAudienceIsStandardPayload",
    "kind": "LinkedField",
    "name": "updateAudienceIsStandard",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Audience",
        "kind": "LinkedField",
        "name": "audience",
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
            "kind": "ScalarField",
            "name": "standard",
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
    "name": "ChangeAudienceStandardFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeAudienceStandardFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "3d8e1358405b0cd8693cdbbedc63e021",
    "metadata": {},
    "name": "ChangeAudienceStandardFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "94ad0211cc95ef6247e3263c35c6f205";

export default node;
