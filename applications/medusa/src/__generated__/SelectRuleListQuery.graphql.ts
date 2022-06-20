/**
 * @generated SignedSource<<8b7963db8d675f579ebf90a1dc3fce5e>>
 * @relayHash 9913427fa16a28e7e5e0ad19fd43f744
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9913427fa16a28e7e5e0ad19fd43f744

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectRuleListQuery$variables = {};
export type SelectRuleListQueryVariables = SelectRuleListQuery$variables;
export type SelectRuleListQuery$data = {
  readonly rules: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly " $fragmentSpreads": FragmentRefs<"RuleTileOverlayFragment">;
      };
    }>;
  };
};
export type SelectRuleListQueryResponse = SelectRuleListQuery$data;
export type SelectRuleListQuery = {
  variables: SelectRuleListQueryVariables;
  response: SelectRuleListQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectRuleListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RuleConnection",
        "kind": "LinkedField",
        "name": "rules",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RuleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "RuleTileOverlayFragment"
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SelectRuleListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RuleConnection",
        "kind": "LinkedField",
        "name": "rules",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RuleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
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
    ]
  },
  "params": {
    "id": "9913427fa16a28e7e5e0ad19fd43f744",
    "metadata": {},
    "name": "SelectRuleListQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f7d034cca7a712ecd3ddf68191908b66";

export default node;
