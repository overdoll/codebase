/**
 * @generated SignedSource<<bf44d02deb7030de92b006e53d69de12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePostFlowFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly isSupporterOnly: boolean;
    readonly viewerCanViewSupporterOnlyContent: boolean;
    readonly resource: {
      readonly processed: boolean;
    };
  }>;
  readonly audience: {
    readonly id: string;
    readonly title: string;
  } | null;
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly categories: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"UploadFlowHeaderFragment" | "UploadFlowFooterFragment" | "UploadReviewStepFragment" | "UploadArrangeStepFragment">;
  readonly " $fragmentType": "UpdatePostFlowFragment";
};
export type UpdatePostFlowFragment = UpdatePostFlowFragment$data;
export type UpdatePostFlowFragment$key = {
  readonly " $data"?: UpdatePostFlowFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostFlowFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostFlowFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowFooterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadReviewStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadArrangeStepFragment"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "viewerCanViewSupporterOnlyContent",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "processed",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "40e56cf56ae88ddd2c7d37a401c05395";

export default node;
