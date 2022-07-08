/**
 * @generated SignedSource<<badccce1a01cacb9aa0edcce2ef23a6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadReviewStepFragment$data = {
  readonly club: {
    readonly canCreateSupporterOnlyPosts: boolean;
  };
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
  readonly " $fragmentType": "UploadReviewStepFragment";
};
export type UploadReviewStepFragment$key = {
  readonly " $data"?: UploadReviewStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadReviewStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadReviewStepFragment",
  "selections": [
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
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "canCreateSupporterOnlyPosts",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReviewFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "01120b654be8ba28bfd1d4f4613d710c";

export default node;
