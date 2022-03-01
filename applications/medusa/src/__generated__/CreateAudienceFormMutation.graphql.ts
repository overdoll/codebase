/**
 * @generated SignedSource<<8cf8e605fd2bc5fea16d8e830da8b599>>
 * @relayHash b1a07db6cb1a34b5dd524511d4859e50
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b1a07db6cb1a34b5dd524511d4859e50

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAudienceValidation = "SLUG_TAKEN" | "%future added value";
export type CreateAudienceInput = {
  slug: string;
  standard: boolean;
  title: string;
};
export type CreateAudienceFormMutation$variables = {
  input: CreateAudienceInput;
  connections: ReadonlyArray<string>;
};
export type CreateAudienceFormMutationVariables = CreateAudienceFormMutation$variables;
export type CreateAudienceFormMutation$data = {
  readonly createAudience: {
    readonly audience: {
      readonly id: string;
      readonly title: string;
      readonly slug: string;
    } | null;
    readonly validation: CreateAudienceValidation | null;
  } | null;
};
export type CreateAudienceFormMutationResponse = CreateAudienceFormMutation$data;
export type CreateAudienceFormMutation = {
  variables: CreateAudienceFormMutationVariables;
  response: CreateAudienceFormMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAudienceFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateAudiencePayload",
        "kind": "LinkedField",
        "name": "createAudience",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateAudienceFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateAudiencePayload",
        "kind": "LinkedField",
        "name": "createAudience",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "audience",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createAudienceEdge"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b1a07db6cb1a34b5dd524511d4859e50",
    "metadata": {},
    "name": "CreateAudienceFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "99977ae725305c5f3a50f518b5fc0591";

export default node;
