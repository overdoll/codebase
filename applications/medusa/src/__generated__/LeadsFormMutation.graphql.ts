/**
 * @generated SignedSource<<a0c208e626f252e9b3a97e98daf4ba94>>
 * @relayHash 923b2eb3e5ca929695b707cecde91eb0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 923b2eb3e5ca929695b707cecde91eb0

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NewCreatorLeadValidation = "ALREADY_SUBMITTED" | "%future added value";
export type NewCreatorLeadInput = {
  details: string;
  email: string;
  portfolio: string;
  username: string;
};
export type LeadsFormMutation$variables = {
  input: NewCreatorLeadInput;
};
export type LeadsFormMutation$data = {
  readonly newCreatorLead: {
    readonly validation: NewCreatorLeadValidation | null;
  } | null;
};
export type LeadsFormMutation = {
  response: LeadsFormMutation$data;
  variables: LeadsFormMutation$variables;
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
    "concreteType": "NewCreatorLeadPayload",
    "kind": "LinkedField",
    "name": "newCreatorLead",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
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
    "name": "LeadsFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LeadsFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "923b2eb3e5ca929695b707cecde91eb0",
    "metadata": {},
    "name": "LeadsFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "649281b8ec7933c9fa19bb2cdb79f631";

export default node;
