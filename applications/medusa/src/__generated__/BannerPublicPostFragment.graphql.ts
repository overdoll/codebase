/**
 * @generated SignedSource<<11f5c81c31d322de4d502b24cf75debb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BannerPublicPostFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubSuspendedStaffAlertFragment">;
  };
  readonly state: PostState;
  readonly " $fragmentType": "BannerPublicPostFragment";
};
export type BannerPublicPostFragment$key = {
  readonly " $data"?: BannerPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubSuspendedStaffAlertFragment"
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

(node as any).hash = "4e0e53c94ce17690003ec9409ac3ebe0";

export default node;
