/**
 * @generated SignedSource<<41af7e44fd1f8d34d4658c7facf68f6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PublicPostPageFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubSuspendedStaffAlertFragment">;
  };
  readonly id: string;
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostFragment">;
  readonly " $fragmentType": "PublicPostPageFragment";
};
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
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "e238d4e27e35601ab73d7695d1953394";

export default node;
