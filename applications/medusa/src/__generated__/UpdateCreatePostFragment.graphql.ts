/**
 * @generated SignedSource<<6ca00cc2960cc792192f73d17325d4b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
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
  readonly characterRequests: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly content: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly state: PostState;
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
],
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
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
      "kind": "ScalarField",
      "name": "state",
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
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CharacterRequest",
      "kind": "LinkedField",
      "name": "characterRequests",
      "plural": true,
      "selections": (v2/*: any*/),
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

(node as any).hash = "ad267b8de6c1fd1bf3268e5653c6dc17";

export default node;
