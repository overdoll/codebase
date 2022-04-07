/**
 * @generated SignedSource<<afa2ac39fa81e9c1317199baa403ba35>>
 * @relayHash e7e315cd53afae5da2347629f69a2167
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e7e315cd53afae5da2347629f69a2167

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffViewRuleQuery$variables = {
  reference: string;
};
export type StaffViewRuleQueryVariables = StaffViewRuleQuery$variables;
export type StaffViewRuleQuery$data = {
  readonly rule: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleTitleFragment" | "ChangeRuleDescriptionFragment" | "ChangeRuleInfractionFragment" | "ChangeRuleDeprecatedFragment">;
  } | null;
};
export type StaffViewRuleQueryResponse = StaffViewRuleQuery$data;
export type StaffViewRuleQuery = {
  variables: StaffViewRuleQueryVariables;
  response: StaffViewRuleQuery$data;
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
    "name": "StaffViewRuleQuery",
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
    "name": "StaffViewRuleQuery",
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
    "id": "e7e315cd53afae5da2347629f69a2167",
    "metadata": {},
    "name": "StaffViewRuleQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "defcbbbd0f5c714dd2945125752a0d67";

export default node;
