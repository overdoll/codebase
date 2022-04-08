/**
 * @generated SignedSource<<60df6ad434e457d463e8e7c4fde9d35e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PublicPostPageFragment$data = {
  readonly state: PostState;
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubSuspendedStaffAlertFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostFragment">;
  readonly " $fragmentType": "PublicPostPageFragment";
};
export type PublicPostPageFragment = PublicPostPageFragment$data;
export type PublicPostPageFragment$key = {
  readonly " $data"?: PublicPostPageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicPostPageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicPostPageFragment",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullDetailedPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ac1543ce9a3b67121516abb75b3cafc0";

export default node;
