/**
 * @generated SignedSource<<736a0312fed5c376354b6799900518d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareClubPostsFragment$data = {
  readonly id: string;
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
      "name": "id",
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

(node as any).hash = "2c2dc8e777583bff8d716357b6d6217e";

export default node;
