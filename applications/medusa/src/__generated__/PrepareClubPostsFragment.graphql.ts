/**
 * @generated SignedSource<<0f3dfd87bf4adffaed36747921b40abd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareClubPostsFragment$data = {
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "aad10e0a7efdf0a7ba8b6f72f3117c95";

export default node;
