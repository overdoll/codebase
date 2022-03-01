/**
 * @generated SignedSource<<d76eca534d94397469c661a8d18407e3>>
 * @relayHash 5eeec9b3b7781a24a63f54b340b6fda1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5eeec9b3b7781a24a63f54b340b6fda1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type IssueClubInfractionInput = {
  clubId: string;
  customEndTime?: any | null;
  ruleId: string;
};
export type IssueClubInfractionFormMutation$variables = {
  input: IssueClubInfractionInput;
};
export type IssueClubInfractionFormMutationVariables = IssueClubInfractionFormMutation$variables;
export type IssueClubInfractionFormMutation$data = {
  readonly issueClubInfraction: {
    readonly clubInfractionHistory: {
      readonly id: string;
      readonly club: {
        readonly id: string;
        readonly suspension: {
          readonly expires: any;
        } | null;
      };
      readonly issuedAt: any;
      readonly expiresAt: any;
      readonly rule: {
        readonly title: string;
      };
    } | null;
  } | null;
};
export type IssueClubInfractionFormMutationResponse = IssueClubInfractionFormMutation$data;
export type IssueClubInfractionFormMutation = {
  variables: IssueClubInfractionFormMutationVariables;
  response: IssueClubInfractionFormMutation$data;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issuedAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expiresAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueClubInfractionFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IssueClubInfractionPayload",
        "kind": "LinkedField",
        "name": "issueClubInfraction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubInfractionHistory",
            "kind": "LinkedField",
            "name": "clubInfractionHistory",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "rule",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueClubInfractionFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IssueClubInfractionPayload",
        "kind": "LinkedField",
        "name": "issueClubInfraction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubInfractionHistory",
            "kind": "LinkedField",
            "name": "clubInfractionHistory",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "rule",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v2/*: any*/)
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
    "id": "5eeec9b3b7781a24a63f54b340b6fda1",
    "metadata": {},
    "name": "IssueClubInfractionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "3cc9ff0cba1b9157a4b657d6c0238810";

export default node;
