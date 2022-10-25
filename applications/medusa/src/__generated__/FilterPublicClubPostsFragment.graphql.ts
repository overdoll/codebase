/**
 * @generated SignedSource<<6b3b3cb08c2702d022bc1768efd2066a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FilterPublicClubPostsFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "FilterPublicClubPostsFragment";
};
export type FilterPublicClubPostsFragment$key = {
  readonly " $data"?: FilterPublicClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FilterPublicClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FilterPublicClubPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "bca3fa51e1cf3af229efd1167c6a00f4";

export default node;
