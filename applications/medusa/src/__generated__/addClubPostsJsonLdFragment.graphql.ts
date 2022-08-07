/**
 * @generated SignedSource<<7ab4cb001fee4f9460ce9c0a722579d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addClubPostsJsonLdFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "addClubPostsJsonLdFragment";
};
export type addClubPostsJsonLdFragment$key = {
  readonly " $data"?: addClubPostsJsonLdFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"addClubPostsJsonLdFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "addClubPostsJsonLdFragment",
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

(node as any).hash = "6765e2cb45567809983d3dc6dc2c8690";

export default node;
