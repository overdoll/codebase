/**
 * @generated SignedSource<<abed1be947ba682e7aee4d402e208e53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubPostsRichObjectFragment$data = {
  readonly slug: string;
  readonly name: string;
  readonly " $fragmentType": "PublicClubPostsRichObjectFragment";
};
export type PublicClubPostsRichObjectFragment = PublicClubPostsRichObjectFragment$data;
export type PublicClubPostsRichObjectFragment$key = {
  readonly " $data"?: PublicClubPostsRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubPostsRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubPostsRichObjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6800596b81045b5def048a5a496422e0";

export default node;
