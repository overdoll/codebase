/**
 * @generated SignedSource<<54a65e6bc1ead3ad463b290781b8ba66>>
 * @relayHash b390809c507c7f61529b72821bd595ac
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b390809c507c7f61529b72821bd595ac

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ReportPostInput = {
  postId: string;
  ruleId: string;
};
export type PostReportButtonMutation$variables = {
  input: ReportPostInput;
};
export type PostReportButtonMutationVariables = PostReportButtonMutation$variables;
export type PostReportButtonMutation$data = {
  readonly reportPost: {
    readonly postReport: {
      readonly id: string;
      readonly account: {
        readonly username: string;
      };
      readonly rule: {
        readonly title: string;
      };
    } | null;
  } | null;
};
export type PostReportButtonMutationResponse = PostReportButtonMutation$data;
export type PostReportButtonMutation = {
  variables: PostReportButtonMutationVariables;
  response: PostReportButtonMutation$data;
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
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v4 = {
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
    "name": "PostReportButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReportPostPayload",
        "kind": "LinkedField",
        "name": "reportPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostReport",
            "kind": "LinkedField",
            "name": "postReport",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "account",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "rule",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
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
    "name": "PostReportButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ReportPostPayload",
        "kind": "LinkedField",
        "name": "reportPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostReport",
            "kind": "LinkedField",
            "name": "postReport",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "account",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Rule",
                "kind": "LinkedField",
                "name": "rule",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
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
    "id": "b390809c507c7f61529b72821bd595ac",
    "metadata": {},
    "name": "PostReportButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "7224dd843d213d726b086437466e6aed";

export default node;
