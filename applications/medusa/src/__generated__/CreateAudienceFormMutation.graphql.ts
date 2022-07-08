/**
 * @generated SignedSource<<c594ef8beb2252db0207076cba4b1e62>>
 * @relayHash 65250235a92f1ca77ccdd56c17b7c07b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 65250235a92f1ca77ccdd56c17b7c07b

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAudienceValidation = "SLUG_TAKEN" | "%future added value";
export type CreateAudienceInput = {
  slug: string;
  standard: boolean;
  title: string;
};
export type CreateAudienceFormMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateAudienceInput;
};
export type CreateAudienceFormMutation$data = {
  readonly createAudience: {
    readonly audience: {
      readonly id: string;
      readonly slug: string;
      readonly standard: boolean;
      readonly title: string;
    } | null;
    readonly validation: CreateAudienceValidation | null;
  } | null;
};
export type CreateAudienceFormMutation = {
  response: CreateAudienceFormMutation$data;
  variables: CreateAudienceFormMutation$variables;
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
    "id": "65250235a92f1ca77ccdd56c17b7c07b",
    "metadata": {},
    "name": "CreateAudienceFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "1d10e947b352a72ce01d9aba3f1fd4f6";

export default node;
