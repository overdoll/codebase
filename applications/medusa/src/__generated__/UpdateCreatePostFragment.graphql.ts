/**
 * @generated SignedSource<<e52fd45916a5ce0b586a5ab8449cc7b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCreatePostFragment$data = {
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
    readonly id: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"UploadCategoryStepFragment" | "UploadCharacterStepFragment" | "UploadContentStepFragment" | "UploadFlowHeaderFragment" | "UploadFlowStickyFooterFragment" | "UploadReviewStepFragment">;
  readonly " $fragmentType": "UpdateCreatePostFragment";
};
export type UpdateCreatePostFragment$key = {
  readonly " $data"?: UpdateCreatePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateCreatePostFragment">;
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
  "name": "UpdateCreatePostFragment",
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
        (v0/*: any*/)
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
      "name": "UploadFlowStickyFooterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadCharacterStepFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "1a3bb37c1965747517e30bcf2edf9ffe";

export default node;
