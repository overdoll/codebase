/**
 * @generated SignedSource<<3ae0df548fce73c02e412719e074fc43>>
 * @relayHash d0d27391b4688c5f5d7958a2a1b27d1c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d0d27391b4688c5f5d7958a2a1b27d1c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminViewRuleQuery$variables = {
  reference: string;
};
export type AdminViewRuleQueryVariables = AdminViewRuleQuery$variables;
export type AdminViewRuleQuery$data = {
  readonly rule: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleTitleFragment" | "ChangeRuleDescriptionFragment" | "ChangeRuleInfractionFragment" | "ChangeRuleDeprecatedFragment">;
  } | null;
};
export type AdminViewRuleQueryResponse = AdminViewRuleQuery$data;
export type AdminViewRuleQuery = {
  variables: AdminViewRuleQueryVariables;
  response: AdminViewRuleQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "text",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Language",
    "kind": "LinkedField",
    "name": "language",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "locale",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "AdminViewRuleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Rule",
        "kind": "LinkedField",
        "name": "rule",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeRuleTitleFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeRuleDescriptionFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeRuleInfractionFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeRuleDeprecatedFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminViewRuleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Rule",
        "kind": "LinkedField",
        "name": "rule",
        "plural": false,
        "selections": [
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
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "titleTranslations",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "descriptionTranslations",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "infraction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deprecated",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "d0d27391b4688c5f5d7958a2a1b27d1c",
    "metadata": {},
    "name": "AdminViewRuleQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "0c141aa8c324394488d3d5dffb5cb3b1";

export default node;
