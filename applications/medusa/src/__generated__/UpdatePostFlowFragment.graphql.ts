/**
 * @generated SignedSource<<e4283d8b559509f26ed93ca2c12fe78e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePostFlowFragment$data = {
  readonly audience: {
    readonly id: string;
    readonly title: string;
  } | null;
  readonly categories: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly id: string;
    };
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMemoPostFragment" | "ProcessContentDisplayFragment" | "UploadCategoryStepFragment" | "UploadContentStepFragment" | "UploadFlowHeaderFragment" | "UploadFlowStickyFooterFragment" | "UploadReviewStepFragment">;
  readonly " $fragmentType": "UpdatePostFlowFragment";
};
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadReviewStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadContentStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadCategoryStepFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessContentDisplayFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewMemoPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowStickyFooterFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "b846174bf93271c336dfc09a9bd1bc94";

export default node;
