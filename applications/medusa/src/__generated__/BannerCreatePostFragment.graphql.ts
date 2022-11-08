/**
 * @generated SignedSource<<8299c82388d3f19dc8d389ca318d25a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BannerCreatePostFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly state: PostState;
  readonly " $fragmentType": "BannerCreatePostFragment";
};
export type BannerCreatePostFragment$key = {
  readonly " $data"?: BannerCreatePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerCreatePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerCreatePostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
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
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3e55311e4e4fa7a041b09c200d0f3ca7";

export default node;
