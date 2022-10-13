/**
 * @generated SignedSource<<04dc527eef0bf2416021751e58d5bad7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareClubPostsFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PrepareClubPostsFragment";
};
export type PrepareClubPostsFragment$key = {
  readonly " $data"?: PrepareClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrepareClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrepareClubPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "59b97869e80ee9c18464ed949f60f977";

export default node;
